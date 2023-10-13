import { deleteResource, fetchResource, updateResource } from './api';
import { RESOURCES } from './constants';

export async function fetchQuizzes() {
  const quizzes = await fetchResource(RESOURCES.QUIZ);
  return quizzes;
}

export async function updateQuestion(quiz) {
  const updatedQuiz = await updateResource(RESOURCES.QUIZ, quiz?.id, quiz);
  return updatedQuiz;
}

export async function deleteQuiz(quizId) {
  const deletedQuiz = await deleteResource(RESOURCES.QUIZ, quizId);
  return deletedQuiz;
}
