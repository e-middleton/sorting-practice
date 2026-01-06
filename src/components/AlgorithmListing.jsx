import {Link} from 'react-router-dom';
import {useState} from 'react';

const AlgorithmListing = ({algorithm}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = algorithm.description;

  if (!showFullDescription) {
    description = description.substring(0,90) + '...';
  }

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='text-gray-600 my-2'>{algorithm.complexity}</div>
          <h3 className='text-xl font-bold'>{algorithm.name}</h3>
        </div>

        <div className='mb-4'>{ description }</div>
        <button onClick={() => setShowFullDescription((prevState) => !prevState)} className='text-blue-500 mb-5 hover:text-blue-600'>
          {showFullDescription ? 'less' : 'more'}
        </button>
        <div className='border-b border-color-gray-600 mb-5'></div>
        <div className='flex justify-end'>
          <Link to='/practice.html' className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'>
            practice
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AlgorithmListing;