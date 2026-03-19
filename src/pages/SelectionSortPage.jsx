import SSGameBoard from "../components/SSGameBoard";
import {useState} from 'react';
import DragDemo from "../components/DragDemo";
import AlgorithmHeading from "../components/AlgorithmHeading";

const SelectionSortPage = () => {

  // Instructions for usage
  const instructions =  <div className='bg-gray-100 p-2 mb-4 text-lg font-roboto rounded-sm max-w-4xl lg:max-w-5xl'>
      <h1 className='font-roboto font-bold text-[20px]'>Instructions: </h1>
      <p className='font-roboto  font-bold'>Elements can be dragged to their correct location using the mouse.</p>
      <p className='font-roboto mb-2  font-bold'>They then swap places with the element that was previously in that index.</p>
      <p className='font-roboto mb-2'>Selection sort finds the smallest element in the 'unsorted' part of the array and places it at the end of the 'sorted' section.</p>
      <p className='font-roboto italic'>If an element is in the correct position, but not considered 'sorted', pick it up and drop it back into the same index location.</p>
    </div>

  let [seed, setSeed] = useState(0);

  const resetArray = () => {
    // Change the key to a new value (e.g., a random number or incremented counter)
    setSeed(Math.random());
  };

  return (
    <>  
      {/* heading */}
      <AlgorithmHeading algorithmTitle={"Selection Sort Practice"}/>
      <div className='bg-white shadow-md mx-auto rounded-md max-w-7xl py-2 my-5'>
        <div className='flex flex-col justify-start'>
          <div className='px-10 pb-5 mb-5 py-1 rounded-sm max-w-7xl ml-20'>
            <div>{instructions}</div>
            <button onClick={resetArray} className='bg-gray-200 font-roboto text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              Refresh Array
            </button>
          </div>
        </div>
        <SSGameBoard key={seed}/>
      </div>
      {/* <DragDemo /> */}
    </>
  );
}

export default SelectionSortPage;