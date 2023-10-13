function AnswerSelector(props) {
  const { choices } = props;

  return (
    <div className='flex flex-col'>
      {choices?.map((choice) => (
        <label htmlFor={choice?.id}>
          <input
            type='radio'
            key={choice?.id}
            id={choice?.id}
            name='answer'
            className='mr-2'
          />
          {choice?.value}
        </label>
      ))}
    </div>
  );
}

export default AnswerSelector;
