import {Link} from 'react-router-dom';

const ViewAllAlgorithms = () => {
  return (
    <section className='m-auto max-w-lg my-5 px-6'>
      <Link 
        to='/algorithms'
        className='flex items-center justify-center block h-15 bg-black px-0 rounded-xl hover:bg-gray-700'>
        <span className='font-roboto text-white text-bold text-base text-center'>View All Algorithms</span>
      </Link>
    </section>
  );
};
export default ViewAllAlgorithms;