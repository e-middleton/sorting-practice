import algorithms from '../algorithms.json';
import AlgorithmListing from './AlgorithmListing';

const AlgorithmListings = ({title='Available Algorithms', endpoints}) => {
  const algs = algorithms.slice(endpoints[0],endpoints[1]);

  return (
    <>
      <section className='bg-background px-4 py-10'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='font-roboto text-3xl font-bold text-darkBlock mb-6 text-center'>
            {title}
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