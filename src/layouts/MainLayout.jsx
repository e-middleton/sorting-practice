import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <>
      <section className='bg-lightBlock h-screen'>
        <Navbar />
        <Outlet/>
      </section>
      
    </> 
  );
}
export default MainLayout;