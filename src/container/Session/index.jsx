import { useCallback, useEffect } from 'react';

function Session(props) {
  const { children, close } = props;

  useEffect(() => {
    const closeOnEscape = () =>
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
      });
    closeOnEscape();

    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [close]);

  return (
    <div className='fixed top-0 z-50 w-screen h-screen  bg-black bg-opacity-70 items-center justify-center flex'>
      <button className='fixed top-3 right-4' onClick={close}>
        Close
      </button>
      <div className='flex rounded-md relative w-1/5 h-2/5 bg-slate-100 justify-center items-center'>
        {children}
      </div>
    </div>
  );
}

Session.Login = function Login(props) {
  const handleCreateAccount = useCallback(
    (event) => {
      event.preventDefault();
      props.switchToAccountCreation();
    },
    [props]
  );

  return (
    <form className='flex flex-col w-3/4' onSubmit={props.onSubmit}>
      <h1 className='mb-10 text-lg font-bold'>Login</h1>
      <label>Username:</label>
      <input
        className='mb-2 pl-1 rounded-md'
        type='text'
        id='username'
        name='username'
      />
      <label>Password:</label>
      <input
        className='mb-2 pl-1 rounded-md'
        type='password'
        id='pwd'
        name='pwd'
      />
      <span>
        Don't have an account?
        <button className='ml-1' onClick={handleCreateAccount} type='button'>
          Create one!
        </button>
      </span>
      <button
        type='submit'
        className='my-4 rounded-md px-2 py-1 font-semibold hover:bg-slate-200'
      >
        Login
      </button>
    </form>
  );
};

Session.CreateAccount = function CreateAccount(props) {
  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      props.switchToLogin();
    },
    [props]
  );

  return (
    <form className='flex flex-col w-3/4' onSubmit={props.onSubmit}>
      <h1 className='mb-10 text-lg font-bold'>Create an Account</h1>
      <label>Username:</label>
      <input
        className='mb-2 pl-1 rounded-md'
        type='text'
        id='username'
        name='username'
      />
      <label>Password:</label>
      <input
        className='mb-2 pl-1 rounded-md'
        type='password'
        id='pwd'
        name='pwd'
      />

      <label>Confirm Password:</label>
      <input
        className='mb-2 pl-1 rounded-md'
        type='password'
        id='confirm_pwd'
        name='confirm_pwd'
      />
      <span>
        Already signed in?
        <button className='ml-1' onClick={handleLogin} type='button'>
          Log in
        </button>
      </span>
      <button
        type='submit'
        className='my-4 rounded-md px-2 py-1 font-semibold hover:bg-slate-200'
      >
        Create account
      </button>
    </form>
  );
};

export default Session;
