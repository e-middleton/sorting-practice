import {NavLink} from 'react-router-dom'; 

const AlgorithmHeading = ({ algorithmTitle }) => {
  return (
    <div className="bg-darkBlock">
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex items-center justify-center'>
            <NavLink to='/' className='font-bold text-lightBlock text-[20px]'>Home</NavLink>
          </div>
          <div className="flex flex-1 justify-center">
            <h1 className='font-bold text-lightBlock text-[30px]'>{algorithmTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AlgorithmHeading;