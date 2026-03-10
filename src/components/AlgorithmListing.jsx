import {Link} from 'react-router-dom';

const AlgorithmListing = ({algorithm}) => {


  let description = algorithm.description;

  return (
    <Link to={`/practice-${algorithm.linkName}`} className='bg-white rounded-xl shadow-md relative hover:bg-gray-100'>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='font-roboto text-sm text-gray-600 my-2'>{algorithm.complexity}</div>
          <h3 className='text-lg font-roboto font-bold'>{algorithm.name}</h3>
        </div>

        <div className='mb-4 text-base h-20 font-roboto'>{ description }</div>
        <div className='border-b border-color-gray-600 mb-5'></div>
        <div className='flex justify-end'>
        </div>

      </div>
    </Link>
  );
}
export default AlgorithmListing;