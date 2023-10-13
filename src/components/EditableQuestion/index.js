import { MAX_CHOICES_COUNT } from '../../utils/constants';
import EditableChoices from '../EditableChoices';

function   EditableQuestion(props) {
  const {
    id,
    prompt,
    choices,
    addNewChoice,
    removeChoice,
    editChoices,
    editTitle,
    saveQuestion,
  } = props;

  return (
    <div className='flex flex-col'>
      <input
        className='h-fit w-full pl-1'
        type='textarea'
        defaultValue={prompt}
        onChange={editTitle}
      />
      {choices?.length < MAX_CHOICES_COUNT && (
        <button className='w-fit' onClick={() => addNewChoice(id)}>
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
