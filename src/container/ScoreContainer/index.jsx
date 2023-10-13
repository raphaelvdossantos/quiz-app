import { Navigate, useLocation } from 'react-router';
import Score from '../../components/Score';
import { useContext } from 'react';
import { SessionContext } from '../../context/Session';
import { Link } from 'react-router-dom';

function ScoreContainer() {
  const session = useContext(SessionContext);
  let { state } = useLocation();

  if (!session?.isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='px-10 py-4'>
      <nav className='mb-10 flex justify-between'>
        <Link className='hover:underline' to='/'>
          {'< Back to Home'}
        </Link>
        <h1 className='text-lg font-semibold'>{session.user.username}</h1>
      </nav>
      <Score answers={state?.answers} quiz={state?.quiz} />
    </div>
  );
}

export default ScoreContainer;
