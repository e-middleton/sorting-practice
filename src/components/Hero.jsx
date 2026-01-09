const Hero = ({title='Practice Sorting', subtitle='Familiarize yourself with basic sorting algorithms from Data Structures by simulating them on arrays'}) => {
  return (
    <>
      <section className='bg-darkBlock py-20 mb-1 border-b border-darkButton'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
          <div className='text-center'>
            <h1 className='font-roboto text-3xl text-white font-bold md:text-5xl'> {title} </h1>
            <p className='font-roboto my-4 text-white text-lg'> {subtitle} </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;