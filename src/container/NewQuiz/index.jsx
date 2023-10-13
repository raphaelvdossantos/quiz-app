import { useCallback, useContext, useState } from 'react';
import { SessionContext } from '../../context/Session';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import EditableQuestion from '../../components/EditableQuestion';
import { createQuiz } from '../../utils/quiz';

function NewQuiz() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('Insert your Quiz title here');

  const addNewQuestion = useCallback(() => {
    const id = questions.length + 1;

    setQuestions([
      ...questions,
      { id, prompt: 'Insert your prompt here', answer: null, choices: [] },
    ]);
  }, [questions]);

  const removeQuestion = useCallback(
    (id) => {
      setQuestions(questions.filter((question) => question.id !== id));
    },
    [questions]
  );

  const addNewChoice = useCallback(
    (id) => {
      const questionsCopy = [...questions];
      const question = questionsCopy.find((question) => question.id === id);

      const choiceId = (question?.choices.at(-1)?.id ?? 0) + 1;
      question.choices.push({ id: choiceId, value: 'Placeholder answer' });
      setQuestions(questionsCopy);
    },
    [questions]
  );

  const removeChoice = useCallback(
    (id, questionId) => {
      setQuestions(
        questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                choices: question.choices.filter((choice) => choice.id !== id),
              }
            : question
        )
      );
    },
    [questions]
  );

  const editQuestion = useCallback(
    (event, questionId) => {
      const questionsCopy = [...questions];
      const question = questionsCopy.find(
        (question) => question?.id === questionId
      );
      if (question) {
        question.prompt = event?.target?.value;
        setQuestions(questionsCopy);
      }
    },
    [questions]
  );
  const editAnswer = useCallback(
    (event, questionId) => {
      const questionsCopy = [...questions];
      const question = questionsCopy.find(
        (question) => question?.id === questionId
      );
      if (question) {
        question.answer = Number(event?.target?.value);
        setQuestions(questionsCopy);
      }
    },
    [questions]
  );
  console.log('QUESTIONS____________: ', questions);

  const editQuestionChoices = useCallback(
    (event, choiceId, questionId) => {
      const questionsCopy = [...questions];
      const question = questionsCopy.find(
        (question) => question?.id === questionId
      );
      if (question && question?.choice?.length) {
        question.choices.value = question.choices.map((choice) =>
          choice?.id === choiceId
            ? { ...choice, value: event?.target?.value }
            : choice
        );
        setQuestions(questionsCopy);
      }
    },
    [questions]
  );

  const saveQuiz = useCallback(async () => {
    try {
      await createQuiz({
        owner: session.user.id,
        title: quizTitle,
        questions,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }, [navigate, questions, quizTitle, session.user.id]);

  if (!session?.isAuthenticated && !session.user.isAdmin) {
    return <Navigate to='/' />;
  }

  return (
    <div className='px-10 py-4'>
      <nav className='mb-10'>
        <Link className='hover:underline' to='/'>
          {'< Back to Home'}
        </Link>
      </nav>
      <div className='mb-4'>
        <label htmlFor='title'>Title:</label>
        <input
          className='pl-2 text-lg font-semibold w-1/5 bg-slate-100 ml-2   rounded-md'
          type='text'
          name='title'
          value={quizTitle}
          onChange={(event) => setQuizTitle(event?.target?.value)}
        />
      </div>
      <div>
        <button
          className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100 mb-6'
          onClick={addNewQuestion}
        >
          Add new question
        </button>
      </div>
      {questions?.map((question) => (
        <div key={question?.id}>
          <EditableQuestion
            prompt={question?.prompt}
            choices={question?.choices}
            removeChoice={removeChoice}
            addNewChoice={addNewChoice}
            editChoices={(event, choiceId) =>
              editQuestionChoices(event, choiceId, question?.id)
            }
            editQuestion={(event) => editQuestion(event, question?.id)}
            editAnswer={(event) => editAnswer(event, question?.id)}
            id={question?.id}
          />
          <button
            className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100 mb-4'
            onClick={() => removeQuestion(question?.id)}
          >
            Remove Question
          </button>
        </div>
      ))}
      {!!questions?.length && (
        <button
          className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
          onClick={saveQuiz}
        >
          Save Quiz
        </button>
      )}
    </div>
  );
}

export default NewQuiz;
