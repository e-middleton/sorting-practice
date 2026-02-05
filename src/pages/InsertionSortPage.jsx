import ISGameBoard from "../components/ISGameBoard";
import {useState} from 'react';

const InsertionSortPage = () => {
  // Instructions for usage
    let instructions = '';
    const [showInstructions, setShowInstructions] = useState(false);
    if (showInstructions) {
      instructions =  <div className='bg-gray-100 p-2 mb-4 text-lg font-roboto rounded-sm max-w-4xl lg:max-w-5xl'>
          <p className='font-roboto text-center font-bold'>Elements can be dragged to their correct location using the mouse.</p>
          <p className='font-roboto mb-2 text-center font-bold'>They then swap places with the element that was previously in that index.</p>
          <p className='font-roboto '>Insertion sort takes an arbitrary unsorted element and inserts it into the correct spot in the 'sorted' section.</p>
          <p className='font-roboto '>For an array implementation, this arbirary element will be the first element in the 'unsorted' section.</p>
          <p className='font-roboto '>The sorting algorithm then compares the unsorted element with the elements in the sorted section one by one,</p>
          <p className='font-roboto mb-2'>If the unsorted element is smaller, it swaps places with the 'sorted' element and shifts down until it is correctly placed.</p>
          <p className='font-roboto italic'>If an element is in the correct position, but not considered 'sorted', pick it up and drop it back into the same index location.</p>
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
        <h1 className='font-bold font-roboto text-darkBlock text-5xl'>Insertion Sort Practice</h1>
      </div>
      <div className='bg-white shadow-md mx-auto rounded-md max-w-7xl py-5'>
        <div className='flex flex-col justify-start'>
          <div className='px-10 pb-5 mb-5 py-1 rounded-sm max-w-7xl ml-20'>
            <button onClick={() => setShowInstructions((prevState) => !prevState)} 
              className='bg-gray-200 font-roboto text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
            <div>{instructions}</div>
            <button onClick={resetArray} className='bg-gray-200 font-roboto text-xl font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
              Refresh Array
            </button>
          </div>
        </div>
        <ISGameBoard key={seed}/>
      </div>
    </>
  );
}
export default InsertionSortPage;