import { useCallback, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Question from '../../components/Question';
import { SessionContext } from '../../context/Session';
import EditableQuestion from '../../components/EditableQuestion';
import Navigate from '../../components/Navigate';

function QuizContainer() {
  const session = useContext(SessionContext);

  let { state } = useLocation();

  const [currentQuestion, setCurrentQuestion] = useState(
    state?.quiz.questions?.find((question) => question.id === 1)
  );
  const [editQuiz, setEditQuiz] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleOnNext = useCallback(() => {
    setCurrentQuestion((prev) =>
      state?.quiz.questions.find(
        (q) => q.id === Math.min(prev.id + 1, state?.quiz.questions.at(-1).id)
      )
    );
  }, [state?.quiz.questions]);

  const handleOnPrevious = useCallback(() => {
    setCurrentQuestion((prev) =>
      state?.quiz.questions.find((q) => q.id === Math.max(prev.id - 1, 1))
    );
  }, [state?.quiz.questions]);

  const addNewChoice = useCallback(
    (id) => {
      const choiceId = (currentQuestion?.choices.at(-1)?.id ?? 0) + 1;
      const questionsCopy = { ...currentQuestion };
      questionsCopy.choices.push({ id: choiceId, value: 'Placeholder answer' });
      setCurrentQuestion(questionsCopy);
    },
    [currentQuestion]
  );

  const removeChoice = useCallback(
    (id) => {
      const question = { ...currentQuestion };
      question.choices = question.choices.filter((choice) => choice.id !== id);
      setCurrentQuestion(question);
    },
    [currentQuestion]
  );

  const editQuestionTitle = useCallback(
    (event) => {
      setCurrentQuestion({ ...currentQuestion, title: event?.target?.value });
    },
    [currentQuestion]
  );

  const editQuestionChoices = useCallback(
    (event, choiceId) => {
      const questionsCopy = { ...currentQuestion };
      const choice = questionsCopy.choices.find(
        (choice) => choice?.id === choiceId
      );
      if (choice) {
        choice.value = event?.target?.value;
        setCurrentQuestion(questionsCopy);
      }
    },
    [currentQuestion]
  );

  return (
    <div className='px-10 py-4'>
      <nav className='flex justify-between mb-10'>
        <Link className='hover:underline' to='/'>
          {'< Back to Home'}
        </Link>
        <div className='flex gap-4'>
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
              {session?.user?.isAdmin && (
                <button
                  className='rounded-md px-2 py-1 hover:bg-slate-100'
                  onClick={() => setEditQuiz((prev) => !prev)}
                >
                  {editQuiz ? 'Stop Editing' : 'Edit Quiz'}
                </button>
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
        </div>
      </nav>
      <h1 className='text-lg font-semibold mb-6'>{state?.quiz?.title}</h1>
      {editQuiz ? (
        <EditableQuestion
          prompt={currentQuestion?.prompt}
          choices={currentQuestion?.choices}
          addNewChoice={addNewChoice}
          removeChoice={removeChoice}
          editChoice={editQuestionChoices}
          editTitle={editQuestionTitle}
          id={currentQuestion?.id}
        />
      ) : (
        <>
          <Question
            prompt={currentQuestion?.prompt}
            choices={currentQuestion?.choices}
          />
          <Navigate
            previous={currentQuestion?.id > 1}
            next={currentQuestion?.id !== state?.quiz.questions.at(-1).id}
            onPrevious={handleOnPrevious}
            onNext={handleOnNext}
          />
        </>
      )}
    </div>
  );
}

export default QuizContainer;
