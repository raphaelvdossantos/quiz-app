import { useCallback } from 'react';

function Score(props) {
  const { answers, quiz } = props;

  const userAnswer = useCallback(
    (questionId, choiceId) =>
      answers
        .find((answer) => answer.quiz === quiz.id)
        .choices?.find((choice) => choice?.question === questionId)?.answer ===
      choiceId,
    [answers, quiz.id]
  );

  return (
    <div>
      <h1 className='text-lg font-semibold mb-6'>{quiz?.title}</h1>
      {quiz?.questions?.map((question) => (
        <div className='mb-4'>
          <h1 className='mb-2'>{question?.prompt}</h1>
          {question?.choices?.map((choice) => (
            <li
              className={`pl-2 
                ${
                  userAnswer(question?.id, choice?.id)
                    ? 'bg-slate-200 rounded-md w-1/2'
                    : 'bg-white'
                }`}
            >
              {choice?.value}
              {choice?.id === question?.answer && (
                <span className='italic'> - Correct Answer</span>
              )}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Score;
