function AnswerSelector(props) {
  const { choices, onChange } = props;

  return (
    <div className='flex flex-col'>
      {choices?.map((choice) => (
        <label htmlFor={choice?.id}>
          <input
            type='radio'
            key={choice?.id}
            id={choice?.id}
            name='answer'
            value={choice?.id}
            className='mr-2'
            onChange={onChange}
          />
          {choice?.value}
        </label>
      ))}
    </div>
  );
}

export default AnswerSelector;
