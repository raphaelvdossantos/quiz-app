import { createBrowserRouter } from 'react-router-dom';
import Home from './container/Home';
import QuizContainer from './container/QuizContainer';
import NewQuiz from './container/NewQuiz';

const router = createBrowserRouter([
  {
    path: '/quiz/:quizId',
    element: <QuizContainer />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/newquiz',
    element: <NewQuiz />,
  },
]);

export default router;
