import { MAX_CHOICES_COUNT } from '../../utils/constants';
import EditableChoices from '../EditableChoices';

function EditableQuestion(props) {
  const {
    id,
    prompt,
    choices,
    addNewChoice,
    removeChoice,
    editChoices,
    editQuestion,
    editAnswer,
  } = props;

  return (
    <div className='flex flex-col mb-4'>
      <input
        className='h-fit w-[100rem] pl-1 text-md mb-4'
        type='text'
        defaultValue={prompt}
        onChange={editQuestion}
      />
      {choices?.length < MAX_CHOICES_COUNT && (
        <button
          className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100 mb-1'
          onClick={() => addNewChoice(id)}
        >
          Add Choice
        </button>
      )}
      <EditableChoices
        choices={choices}
        removeChoice={removeChoice}
        editChoices={editChoices}
        editAnswer={editAnswer}
        questionId={id}
      />
    </div>
  );
}

export default EditableQuestion;
