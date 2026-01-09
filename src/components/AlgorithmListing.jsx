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
          <div className='font-roboto text-sm text-gray-600 my-2'>{algorithm.complexity}</div>
          <h3 className='text-lg font-roboto font-bold'>{algorithm.name}</h3>
        </div>

        <div className='mb-4 text-base font-roboto'>{ description }</div>
        <button onClick={() => setShowFullDescription((prevState) => !prevState)} className='font-roboto text-sm text-sky-500 mb-5 hover:text-sky-700'>
          {showFullDescription ? 'less' : 'more'}
        </button>
        <div className='border-b border-color-gray-600 mb-5'></div>
        <div className='flex justify-end'>
          <Link to={`/practice-${algorithm.linkName}`} className='font-roboto bg-button hover:bg-darkButton text-white px-4 py-2 rounded-lg text-center text-sm'>
            practice
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AlgorithmListing;