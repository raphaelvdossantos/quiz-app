function AnswerSelector(props) {
  const { choices, onChange, selectedAnswer, questionId } = props;
  console.log({ selectedAnswer });

  return (
    <div className='flex flex-col'>
      {choices?.map((choice) => (
        <label htmlFor={`answer_${questionId}`} key={choice?.id}>
          <input
            type='radio'
            name={`answer_${questionId}`}
            value={choice?.id}
            className='mr-2'
            onChange={onChange}
            checked={selectedAnswer?.answer === choice?.id}
          />
          {choice?.value}
        </label>
      ))}
    </div>
  );
}

export default AnswerSelector;
