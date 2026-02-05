import AlgorithmListings from "../components/AlgorithmListings";

const AlgorithmsPage = () => {
  return (
    <>
      <AlgorithmListings title='Available Algorithms' endpoints={[0,3]}/>
      <AlgorithmListings title='Under Construction' endpoints={[3,6]}/>
    </>
  );
};
export default AlgorithmsPage;