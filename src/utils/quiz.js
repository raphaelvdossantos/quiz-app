import {
  createResource,
  deleteResource,
  fetchResource,
  updateResource,
} from './api';
import { RESOURCES } from './constants';
import { generateUniqueId } from './functions';

export async function fetchQuizzes() {
  const quizzes = await fetchResource(RESOURCES.QUIZ);
  return quizzes;
}

export async function createQuiz(quiz) {
  quiz.id = generateUniqueId(quiz.title);
  const newQuiz = await createResource(RESOURCES.QUIZ, quiz);
  return newQuiz;
}

export async function updateQuestion(quiz) {
  const updatedQuiz = await updateResource(RESOURCES.QUIZ, quiz?.id, quiz);
  return updatedQuiz;
}

export async function deleteQuiz(quizId) {
  const deletedQuiz = await deleteResource(RESOURCES.QUIZ, quizId);
  return deletedQuiz;
}
