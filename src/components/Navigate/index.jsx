function Navigate(props) {
  const { next, previous, onPrevious, onNext, onSubmit } = props;
  return (
    <div className='flex'>
      {previous && (
        <button
          className='rounded-md px-2 py-1 font-semibold hover:bg-slate-200'
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {next ? (
        <button
          className='rounded-md px-2 py-1 font-semibold hover:bg-slate-200'
          onClick={onNext}
        >
          Next
        </button>
      ) : (
        <button
          className='rounded-md px-2 py-1 font-semibold hover:bg-slate-200'
          onClick={onSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default Navigate;
