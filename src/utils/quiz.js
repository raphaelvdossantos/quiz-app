import { fetchResource } from './api';
import { RESOURCES } from './constants';

export async function fetchQuizzes() {
  const quizzes = await fetchResource(RESOURCES.QUIZ);

  return quizzes;
}
