import AlgorithmListings from "../components/AlgorithmListings";

const AlgorithmsPage = () => {
  return (
    <>
      <AlgorithmListings title='Available Algorithms' endpoints={[0,2]}/>
      <AlgorithmListings title='Under Construction' endpoints={[2,6]}/>
    </>
  );
};
export default AlgorithmsPage;