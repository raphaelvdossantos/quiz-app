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
    editTitle,
  } = props;

  return (
    <div className='flex flex-col mb-4'>
      <input
        className='h-fit w-full pl-1 text-lg mb-2'
        type='textarea'
        defaultValue={prompt}
        onChange={editTitle}
      />
      {choices?.length < MAX_CHOICES_COUNT && (
        <button
          className='w-fit rounded-md px-2 py-1 font-semibold hover:bg-slate-100'
          onClick={() => addNewChoice(id)}
        >
          Add Choice
        </button>
      )}
      <EditableChoices
        choices={choices}
        removeChoice={(choiceId) => removeChoice(choiceId, id)}
        editChoices={editChoices}
      />
    </div>
  );
}

export default EditableQuestion;
