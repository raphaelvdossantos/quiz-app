function Navigate(props) {
  const { next, previous, onPrevious, onNext, handleSubmit } =
    props;
  return (
    <div className='flex'>
      {previous && <button onClick={onPrevious}> Previous</button>}
      {next ? <button onClick={onNext}> Next</button> : <button>Submit</button>}
    </div>
  );
}

export default Navigate;
