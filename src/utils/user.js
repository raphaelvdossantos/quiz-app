import { createResource, fetchResource, updateResource } from './api';
import { RESOURCES } from './constants';
import { generateUniqueId, pipe } from './functions';

export async function fetchUser(username, password) {
  let params = `?username=${username}`;
  if (password) params += `&password=${password}`;
  const user = await fetchResource(RESOURCES.USER, params);

  return user;
}

const usernameTaken = async (username) => {
  const user = await fetchUser(username);

  return !Boolean(user?.[0]?.username);
};

export const authenticateUser = async (username, password) => {
  const user = await fetchUser(username, password);
  if (!user[0]?.username)
    return { error: [{ message: 'Invalid username or password' }] };

  return user[0];
};

const validUsername = (user) =>
  user.username !== ''
    ? user
    : {
        ...user,
        error: [{ message: 'Username should not be empty' }, ...user.error],
      };

const validPassword = (user) =>
  user.password !== ''
    ? user
    : {
        ...user,
        error: [{ message: 'Password should not be empty' }, ...user.error],
      };

const passwordMatches = (user) =>
  user.password === user.pwdConfirmation
    ? user
    : {
        ...user,
        error: [{ message: 'Passwords do not match' }, ...user.error],
      };

const validateUser = (username, password, pwdConfirmation) => {
  return pipe(
    validUsername,
    validPassword,
    passwordMatches
  )({ username, password, pwdConfirmation, error: [] });
};

export const createUser = async (username, password, pwdConfirmation) => {
  const validUser = validateUser(username, password, pwdConfirmation);
  if (validUser.error.length) return { error: validUser.error };

  const availableUsername = await usernameTaken(username);
  if (!availableUsername)
    return { error: [{ message: 'Username already taken' }] };

  const user = await createResource(RESOURCES.USER, {
    id: generateUniqueId(username),
    isAdmin: false,
    username,
    password,
    answers: [],
  });

  return user;
};

export async function updateUserWithAnswers(user) {
  const updatedUser = await updateResource(RESOURCES.USER, user?.id, user);
  return updatedUser;
}
