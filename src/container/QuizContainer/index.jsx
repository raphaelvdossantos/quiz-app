import { useCallback, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Question from '../../components/Question';
import { SessionContext } from '../../context/Session';
import EditableQuestion from '../../components/EditableQuestion';
import Navigate from '../../components/Navigate';
import { updateQuestion } from '../../utils/quiz';

function QuizContainer() {
  const session = useContext(SessionContext);

  let { state } = useLocation();

  const [currentQuestion, setCurrentQuestion] = useState(
    state?.quiz.questions?.at(0)
  );
  const [editQuiz, setEditQuiz] = useState(false);
  const [choices, setChoices] = useState([]);

  const navigate = useNavigate();

  const answered = useCallback(() => {
    const answeredId = choices?.findIndex(
      (choice) => choice?.question === currentQuestion?.id
    );

    return answeredId;
  }, [choices, currentQuestion?.id]);

  const handleOnChoiceChange = useCallback(
    (event) => {
      const choicesCopy = [...choices];

      answered() !== -1
        ? (choicesCopy[answered()].answer = Number(event?.target?.value))
        : choicesCopy.push({
            question: currentQuestion?.id,
            answer: Number(event?.target?.value),
          });

      return setChoices(choicesCopy);
    },
    [answered, choices, currentQuestion]
  );

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

  const handleOnSubmit = useCallback(() => {
    if (
      !session?.isAuthenticated &&
      window.confirm('You need to be logged in to see the results')
    ) {
      return session.login();
    }

    const answers = [{ quiz: state?.quiz?.id, choices }];
    return navigate('/score', { state: { answers, quiz: state?.quiz } });
  }, [choices, navigate, session, state?.quiz]);

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
      const questionCopy = { ...currentQuestion };
      const choice = questionCopy.choices.find(
        (choice) => choice?.id === choiceId
      );
      if (choice) {
        choice.value = event?.target?.value;
        setCurrentQuestion(questionCopy);
      }
    },
    [currentQuestion]
  );

  const saveChanges = useCallback(async () => {
    const quiz = { ...state?.quiz };
    let question = quiz?.questions.find(
      (question) => question.id === currentQuestion.id
    );

    if (question) {
      question = currentQuestion;
      await updateQuestion(quiz);
    }
  }, [currentQuestion, state?.quiz]);

  return (
    <div className='px-10 py-4'>
      <nav className='flex justify-between mb-10'>
        <Link className='hover:underline' to='/'>
          {'< Back to Home'}
        </Link>
        <div className='flex gap-4 align-middle'>
          {!session.isAuthenticated ? (
            <>
              <button
                className='rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
                onClick={session.createAccount}
              >
                Create Account
              </button>
              <button
                className='rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
                onClick={session.login}
              >
                Login
              </button>
            </>
          ) : (
            <>
              {session?.user?.isAdmin && (
                <button
                  className='rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
                  onClick={() => setEditQuiz((prev) => !prev)}
                >
                  {editQuiz ? 'Stop Editing' : 'Edit Quiz'}
                </button>
              )}
              <button
                className='rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
                onClick={session.logout}
              >
                Log out
              </button>
              <h1 className='text-lg font-semibold'>{session.user.username}</h1>
            </>
          )}
        </div>
      </nav>
      <h1 className='text-lg font-semibold mb-6'>{state?.quiz?.title}</h1>
      {editQuiz ? (
        <>
          <EditableQuestion
            prompt={currentQuestion?.prompt}
            choices={currentQuestion?.choices}
            addNewChoice={addNewChoice}
            removeChoice={removeChoice}
            editChoices={editQuestionChoices}
            editTitle={editQuestionTitle}
            id={currentQuestion?.id}
          />
          <button
            className='rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
            onClick={saveChanges}
          >
            Save Question
          </button>
        </>
      ) : (
        <>
          <Question
            prompt={currentQuestion?.prompt}
            choices={currentQuestion?.choices}
            onChoiceChange={handleOnChoiceChange}
          />
          <Navigate
            previous={currentQuestion?.id > 1}
            next={currentQuestion?.id !== state?.quiz.questions.at(-1).id}
            onPrevious={handleOnPrevious}
            onNext={handleOnNext}
            onSubmit={handleOnSubmit}
            disableNavigation={answered() === -1}
          />
        </>
      )}
    </div>
  );
}

export default QuizContainer;
