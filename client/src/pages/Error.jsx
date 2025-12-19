import {useRouteError} from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav/>
      <div className='flex-1'>
        <h1>Something went wrong...</h1>
      </div>
      <Footer/>
    </div>
  );
};

export default Error;