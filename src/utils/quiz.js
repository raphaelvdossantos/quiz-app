import { fetchResource, updateResource } from './api';
import { RESOURCES } from './constants';

export async function fetchQuizzes() {
  const quizzes = await fetchResource(RESOURCES.QUIZ);
  return quizzes;
}

export async function updateQuestion(quiz) {
  const updatedQuiz = await updateResource(RESOURCES.QUIZ, quiz?.id, quiz);
  return updatedQuiz;
}
