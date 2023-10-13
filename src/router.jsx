import { createBrowserRouter } from 'react-router-dom';
import Home from './container/Home';
import QuizContainer from './container/QuizContainer';
import NewQuiz from './container/NewQuiz';
import ScoreContainer from './container/ScoreContainer';

const router = createBrowserRouter([
  { path: '/quiz/:quizId', element: <QuizContainer /> },
  { path: '/', element: <Home /> },
  { path: '/newquiz', element: <NewQuiz /> },
  { path: '/score', element: <ScoreContainer /> },
]);

export default router;
