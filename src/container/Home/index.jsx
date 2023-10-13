import { useContext, useEffect, useState } from 'react';
import { fetchQuizzes } from '../../utils/quiz';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../context/Session';

function Home() {
  const [quizzes, setQuizzes] = useState();
  const session = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      const q = await fetchQuizzes();
      setQuizzes(q);
    })();
  }, []);

  return (
    <div className='px-10 py-4'>
      <nav className='flex gap-4 justify-end mb-10'>
        {!session.isAuthenticated ? (
          <>
            <button
              className='rounded-md px-2 py-1 hover:bg-slate-100'
              onClick={session.createAccount}
            >
              Create Account
            </button>
            <button
              className='rounded-md px-2 py-1 hover:bg-slate-100'
              onClick={session.login}
            >
              Login
            </button>
          </>
        ) : (
          <>
            {session.user.isAdmin && (
              <Link className='hover:underline' to='/newquiz'>
                Add New Quiz
              </Link>
            )}
            <button
              className='rounded-md px-2 py-1 hover:bg-slate-100'
              onClick={session.logout}
            >
              Log out
            </button>
            <h1>{session.user.username}</h1>
          </>
        )}
      </nav>
      <div className='flex flex-col'>
        {quizzes?.map((quiz) => (
          <div className='mb-4 w-full rounded-md border-2 border-slate-800 py-2 px-1 hover:bg-slate-100'>
            <Link key={quiz?.id} to={`/quiz/${quiz?.id}`} state={{ quiz }}>
              <h1 className='text-lg'>{quiz?.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
