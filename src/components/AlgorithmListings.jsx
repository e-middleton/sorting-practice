import algorithms from '../algorithms.json';
import AlgorithmListing from './AlgorithmListing';

const AlgorithmListings = ({homePage = false}) => {
  const algs = homePage ? algorithms.slice(0,3) : algorithms;

  return (
    <>
      <section className='bg-blue-50 px-4 py-10'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
            Available Algorithms
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {algs.map((alg) => (
              <AlgorithmListing key={alg.id} algorithm={alg}/>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default AlgorithmListings;