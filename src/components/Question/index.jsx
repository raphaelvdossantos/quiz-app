import AnswerSelector from '../AnswerSelector';

function Question(props) {
  const { id, prompt = '', choices, selectedAnswer, onChoiceChange } = props;

  return (
    <div className='flex flex-col mb-10'>
      <h1 className='text-lg mb-2'>{prompt}</h1>
      <AnswerSelector
        choices={choices}
        onChange={onChoiceChange}
        selectedAnswer={selectedAnswer}
        questionId={id}
      />
    </div>
  );
}

export default Question;
