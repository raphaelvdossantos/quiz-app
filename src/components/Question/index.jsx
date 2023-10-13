import AnswerSelector from '../AnswerSelector';

function Question(props) {
  const { prompt = '', choices } = props;

  return (
    <div className='flex flex-col mb-10'>
      <h1 className='text-lg mb-2'>{prompt}</h1>
      <AnswerSelector choices={choices} />
    </div>
  );
}

export default Question;
