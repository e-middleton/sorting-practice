import {NavLink} from 'react-router-dom';

const Navbar = () => {
  const links = ({isActive}) => 
    isActive 
    ? "text-white font-roboto text-base font-bold rounded-lg bg-black p-2 hover:bg-gray-800" 
    : "text-white font-roboto text-base font-bold bg-gray-400 rounded-lg p-2 hover:bg-gray-800";
  return (
    <nav className='bg-darkBlock border-b border-darkButton'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink to='/' className='font-roboto text-white text-xl font-bold'>Sorting-Practice</NavLink>
          </div>
          <div className='flex gap-2'>
            <NavLink to='/' className={links}>Home</NavLink>
            <NavLink to='/algorithms' className={links}>Algorithms</NavLink>
            </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;