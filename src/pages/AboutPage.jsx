import Navbar from "../components/Navbar";

const AboutPage = () => {
  const text = `
  Hello!
  My name is Emily, and I'm a CSC Major at Smith.
  I took Data structures (CSC 210) in Fall of 2025, and I loved the class,
  but I wished I had some hands-on practice for some of the algorithms.
  I made this website over winter break to try create some visualizations,
  ... and am still working on it. :( 

  This website was made by a party of one (me), so there are likely a few bugs lurking I haven't caught yet.
  My goal is to help other data structures students, so if something seems broken
  or incorrect, please don't hesitate to reach out or submit in github issues!
  `

  return (
    <>
      <Navbar />
      <section className='bg-white flex justify-start m-5 shadow-sm rounded-lg px-4'>
        <div className="flex justify-center rounded-lg bg-white text-xl md:justify-start">
          <p className="whitespace-pre-wrap"> 
            {text}
          </p>
        </div>
      </section>
      
    </>
  );
}
export default AboutPage;