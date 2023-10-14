import { createContext, useCallback, useMemo, useState } from 'react';
import Session from '../container/Session';
import { authenticateUser, createUser, fetchUser } from '../utils/user';
import { SESSION_ACTION } from '../utils/constants';

export const SessionContext = createContext({});

const defaultSessionValue = {
  id: null,
  user: { id: null, isAdmin: false, userName: '' },
};

export function SessionProvider({ children }) {
  const [session, setSession] = useState(defaultSessionValue);
  const [sessionAction, setSessionAction] = useState(SESSION_ACTION.NONE);
  const [error, setError] = useState();

  const login = useCallback(async () => {
    setSessionAction(SESSION_ACTION.LOGIN);
  }, []);

  const createAccount = useCallback(async () => {
    setSessionAction(SESSION_ACTION.NEW_USER);
  }, []);

  const handleCreateUser = useCallback(async (event) => {
    event.preventDefault();

    const { username, pwd, confirm_pwd } = event.target.elements;

    const user = await createUser(
      username?.value,
      pwd?.value,
      confirm_pwd?.value
    );
    if (user.error) {
      setError(user.error);
      return;
    }

    setSession({ id: window.crypto.randomUUID(), user });
    setSessionAction(SESSION_ACTION.NONE);
  }, []);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();

    const { username, pwd } = event.target.elements;

    const user = await authenticateUser(username?.value, pwd?.value);
    if (user.error) {
      setError(user.error);
      return;
    }

    setSession({ id: window.crypto.randomUUID(), user });
    setSessionAction(SESSION_ACTION.NONE);
  }, []);

  const logout = useCallback(() => setSession(defaultSessionValue), []);
  const update = useCallback(async () => {
    const user = await fetchUser(session.user.username, session.user.password);
    setSession((prev) => ({ ...prev, user: user[0] }));
  }, [session.user.password, session.user.username]);

  const isAuthenticated = useMemo(() => {
    return Boolean(session.id && session.user.id);
  }, [session.id, session.user.id]);

  const defaultContextValue = useMemo(
    () => ({
      ...session,
      isAuthenticated,
      login,
      createAccount,
      logout,
      update,
    }),
    [session, isAuthenticated, login, createAccount, logout, update]
  );

  return (
    <SessionContext.Provider value={defaultContextValue}>
      {sessionAction !== SESSION_ACTION.NONE && (
        <Session close={() => setSessionAction(SESSION_ACTION.NONE)}>
          {sessionAction === SESSION_ACTION.LOGIN && (
            <Session.Login
              switchToAccountCreation={createAccount}
              onSubmit={handleLogin}
            />
          )}
          {sessionAction === SESSION_ACTION.NEW_USER && (
            <Session.CreateAccount
              switchToLogin={login}
              onSubmit={handleCreateUser}
            />
          )}
        </Session>
      )}
      {children}
    </SessionContext.Provider>
  );
}
