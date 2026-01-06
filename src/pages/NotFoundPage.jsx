import {Link} from 'react-router-dom';
import {FaExclamationTriangle} from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='flex flex-col justify-center items-center'>
      <FaExclamationTriangle className='text-yellow-300 text-6xl m-4'/>
      <h1 className='text-bold'>404 Error</h1>
      <h1 className='text-4xl text-bold mb-10'>Page Not Found</h1>
      <Link to='/' className='max-w-3xl bg-gray-100 rounded-lg p-2 hover:bg-gray-200'>Return Home</Link>
    </section>
  );
}
export default NotFoundPage;