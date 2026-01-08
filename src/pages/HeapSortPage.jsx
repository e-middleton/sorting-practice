import HSGameBoard from "../components/HSGameBoard";
import {useState} from 'react';

const HeapSortPage = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  let instructions = '';
  if (showInstructions) {
    instructions = <div className='bg-gray-100 p-2 mb-4 rounded-sm max-w-4xl lg:max-w-5xl'>
        <p className='font-roboto text-center font-bold text-lg'>Double click to add an item to the heap. </p>
        <p className='font-roboto text-center font-bold text-lg'>Double click the heap root to remove and add to the sorted section.</p>
        <p className='font-roboto text-center font-bold mb-2 text-lg'>Drag items to swap them when preserving heap ordering.</p>
        <p className='font-bold font-roboto text-lg'>Phase 1 Heapify:</p>
        <p className='font-roboto text-lg mb-2'>Iterate across the array and add the elements one by one to the heap section of the array.</p>
        <p className='font-bold text-lg'>Phase 2 Sorting:</p>
        <p className='font-roboto text-lg'>Once the entire array has been heapified, remove the root element of the heap and add it to the 'sorted' section of the array.</p>
        <p className='font-roboto mb-2 text-lg'>Reheapify the heap section if needed. Then continue to remove the root and add it to the sorted section of the array until all elements have been sorted.</p>
        <p className='font-roboto italic text-lg'>Please note: The gap between the 'heap' and 'sorted' sections is for visual distinction only. They represent a single, continuous array in memory.</p>
      </div>
  }

  let [seed, setSeed] = useState(0);

  const resetArray = () => {
    // Change the key to a new value (e.g., a random number or incremented counter)
    setSeed(Math.random());
  };

  return (
    <> 
      {/* heading */}
      <div className='flex justify-center w-full mb-2 border-b border-button bg-lightBlock h-35 items-center'>
        <h1 className='font-bold text-darkBlock text-5xl'>Heap Sort Practice</h1>
      </div>
      <div className='bg-white mt-5 shadow-md mx-auto rounded-md max-w-7xl py-5'>
        <div className='flex flex-col justify-start'>
          <div className='px-10 pb-5 mb-5 py-1 rounded-sm max-w-7xl ml-20'>
            <button onClick={() => setShowInstructions((prevState) => !prevState)} 
              className='bg-gray-200 text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
            <div>{instructions}</div>
            <button onClick={resetArray} className='bg-gray-200 text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              Refresh Array
            </button>
          </div>
        </div>
        <HSGameBoard key={seed}/>
      </div>
    </>
  );
};
export default HeapSortPage;
