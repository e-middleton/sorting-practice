import Hero from "../components/Hero";
import AlgorithmListings from "../components/AlgorithmListings";
import ViewAllAlgorithms from "../components/ViewAllAlgorithms";

const HomePage = () => {
  return (
    <>
      <Hero />
      <AlgorithmListings title='Available Algorithms' endpoints={[0,2]}/>
      <ViewAllAlgorithms />   
    </>
  );
}
export default HomePage;