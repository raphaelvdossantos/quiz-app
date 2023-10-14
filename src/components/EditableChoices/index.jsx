function EditableChoices(props) {
  const { choices, removeChoice, editChoices, editAnswer, questionId } = props;

  return (
    <div className='flex flex-col mb-10'>
      {!!choices?.length && (
        <span className='text-red-500 text-sm '>
          Select the option to be the correct answer
        </span>
      )}
      {choices?.map((choice) => (
        <div className='flex items-center' key={choice?.id}>
          <label htmlFor={`answer_${questionId}`}>
            <input
              type='radio'
              id={choice?.id}
              value={choice?.id}
              name={`answer_${questionId}`}
              className='mr-2'
              onChange={editAnswer}
            />
            <input
              className='pl-1 w-[100rem]'
              defaultValue={choice?.value}
              onChange={(event) => editChoices(event, choice?.id)}
            />
          </label>
          <button
            className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100 ml-2'
            onClick={() => removeChoice(choice?.id, questionId)}
          >
            Remove Choice
          </button>
        </div>
      ))}
    </div>
  );
}

export default EditableChoices;
