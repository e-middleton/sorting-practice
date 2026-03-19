import Hero from "../components/Hero";
import AlgorithmListings from "../components/AlgorithmListings";
import Navbar from "../components/Navbar";
import {useState} from 'react';


const HomePage = () => {
  let endpoint = 3;
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    endpoint = 6;
  }
  
  return (
    <>
      <Navbar/>
      <Hero />
      <AlgorithmListings title='Available Algorithms' endpoints={[0, endpoint]}/>
      <section className='m-auto max-w-lg my-5'>
        <button onClick={() => setShowAll((prevState) => !prevState)} 
        className=' mx-auto flex w-2/3 items-center justify-center block h-15 bg-black rounded-xl hover:bg-gray-700'>
          <div className='font-roboto text-white font-bold text-base text-center'>
            {showAll ? "Hide Algorithms" : "Show All Algorithms" }
          </div>
        </button>
      </section>
    </>
  );
}
export default HomePage;