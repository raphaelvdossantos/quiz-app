import { useCallback, useContext, useState } from 'react';
import { SessionContext } from '../../context/Session';
import { Link, Navigate } from 'react-router-dom';
import EditableQuestion from '../../components/EditableQuestion';

function NewQuiz() {
  const session = useContext(SessionContext);
  const [questions, setQuestions] = useState([]);

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
      const question = questions.find((question) => question.id === id);

      const choiceId = (question?.choices.at(-1)?.id ?? 0) + 1;
      const questionsCopy = [...questions];
      questionsCopy.choices.push({ id: choiceId, value: 'Placeholder answer' });
      setQuestions(questionsCopy);
    },
    [questions]
  );

  const removeChoice = useCallback(
    () => (id, questionId) => {
      setQuestions(
        questions.map((question) =>
          question.id === questionId
            ? question.choices.filter((choice) => choice !== id)
            : question
        )
      );
    },
    [questions]
  );

  const editQuestionTitle = useCallback(
    (event, questionId) => {
      const questionsCopy = [...questions];
      const question = questionsCopy.find(
        (question) => question?.id === questionId
      );
      if (question) {
        question.title = event?.target?.value;
        setQuestions(questionsCopy);
      }
    },
    [questions]
  );

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
      <div>
        <label htmlFor='title'>Title:</label>
        <input className='pl-1' type='text' name='title' disabled />
      </div>
      <div>
        <button onClick={addNewQuestion}>Add new question</button>
      </div>
      {questions?.map((question) => (
        <div key={question?.id}>
          <EditableQuestion
            prompt={question?.prompt}
            choices={question?.choices}
            removeChoice={removeChoice}
            addNewChoice={addNewChoice}
            editChoice={(event, choiceId) =>
              editQuestionChoices(event, choiceId, question?.id)
            }
            editTitle={(event) => editQuestionTitle(event, question?.id)}
            id={question?.id}
          />
          <button onClick={() => removeQuestion(question?.id)}>
            Remove Question
          </button>
        </div>
      ))}
    </div>
  );
}

export default NewQuiz;
