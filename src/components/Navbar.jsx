import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <Link to='/' className='text-white text-2xl font-bold'>Homepage</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;