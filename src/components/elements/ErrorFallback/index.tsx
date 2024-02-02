const ErrorFallback = ({ error }: any) => {
  return (
    <div className='text-red'>
      Some thing wrong! <br />
      {error.message}
    </div>
  );
};

export default ErrorFallback;
