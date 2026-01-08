import HSGameBoard from "../components/HSGameBoard";
import {useState} from 'react';

const HeapSortPage = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  let instructions = '';
  if (showInstructions) {
    instructions = <div className='bg-gray-100 p-2 rounded-sm max-w-4xl lg:max-w-5xl'>
        <p className='font-bold'>Phase 1 Heapify:</p>
        <p>Iterate across the array and add the elements one by one to the heap section of the array.</p>
        <p className='font-bold'>Phase 2 Sorting:</p>
        <p>Once the entire array has been heapified, remove the root element of the heap and add it to the 'sorted' section of the array.</p>
        <p className='mb-2'>Reheapify the heap section if needed. Then continue to remove the root and add it to the sorted section of the array until all elements have been sorted.</p>
        <p>To add an element to the heap section, double click that element.</p>
        <p>If items need to be swapped to maintain heap ordering, drag one element to the next to swap their locations.</p>
        <p className='mb-2'>Once the entire array has been heapified, double click the root of the heap to add it to the sorted section.</p>
        <p className='italic'>Please note: The gap between the 'heap' and 'sorted' sections is for visual distinction only. They represent a single, continuous array in memory.</p>
      </div>
  }

  return (
    <> 
      {/* heading */}
      <div className='flex justify-center w-full mb-2 border-b border-button bg-lightBlock h-35 items-center'>
        <h1 className='font-bold text-darkBlock text-5xl'>Heap Sort Practice</h1>
      </div>
      <div className='bg-white shadow-md mx-auto rounded-md max-w-7xl py-5'>
        <div className='flex flex-col justify-start'>
          <div className='px-10 pb-5 mb-5 py-1 rounded-sm max-w-7xl ml-20'>
            <button onClick={() => setShowInstructions((prevState) => !prevState)} 
              className='bg-gray-200 text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
            <div>{instructions}</div>
          </div>
        </div>
        <HSGameBoard />
      </div>
    </>
  );
};
export default HeapSortPage;
