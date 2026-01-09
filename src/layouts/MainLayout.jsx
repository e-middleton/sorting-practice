import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <>
      <section className='bg-lightBlock min-h-screen pb-10'>
        <Navbar />
        <Outlet/>
      </section>
      
    </> 
  );
}
export default MainLayout;