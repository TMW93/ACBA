import {useRouteError} from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Something went wrong...</h1>
    </div>
  );
};

export default Error;