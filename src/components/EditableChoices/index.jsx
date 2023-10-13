function EditableChoices(props) {
  const { choices, removeChoice, editChoices, saveChoices } = props;

  return (
    <div className='flex flex-col'>
      {choices?.map((choice) => (
        <div className='flex' key={choice?.id}>
          <label htmlFor={choice?.id}>
            <input
              type='radio'
              id={choice?.id}
              name='answer'
              className='mr-2'
            />
            <input
              className='pl-1'
              defaultValue={choice?.value}
              onChange={(event) => editChoices(event, choice?.id)}
            />
          </label>
          <button className='w-fit' onClick={() => removeChoice(choice?.id)}>
            Remove Choice
          </button>
        </div>
      ))}
    </div>
  );
}

export default EditableChoices;
