function Navigate(props) {
  const { next, previous, onPrevious, onNext, onSubmit, disableNavigation } =
    props;
  return (
    <div className='flex'>
      {previous && (
        <button
          disabled={disableNavigation}
          className={`rounded-md px-2 py-1 font-semibold ${
            disableNavigation ? 'text-gray-600' : 'hover:bg-slate-200'
          }`}
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {next ? (
        <button
          disabled={disableNavigation}
          className={`rounded-md px-2 py-1 font-semibold ${
            disableNavigation ? 'text-gray-600' : 'hover:bg-slate-200'
          }`}
          onClick={onNext}
        >
          Next
        </button>
      ) : (
        <button
          disabled={disableNavigation}
          className={`rounded-md px-2 py-1 font-semibold ${
            disableNavigation ? 'text-gray-600' : 'hover:bg-slate-200'
          }`}
          onClick={onSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default Navigate;
