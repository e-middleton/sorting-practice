import Hero from "../components/Hero";
import AlgorithmListings from "../components/AlgorithmListings";
import ViewAllAlgorithms from "../components/ViewAllAlgorithms";

const HomePage = () => {
  return (
    <>
      <Hero />
      <AlgorithmListings homePage={true}/>
      <ViewAllAlgorithms />   
    </>
  );
}
export default HomePage;