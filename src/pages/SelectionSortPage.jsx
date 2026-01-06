import SSGameBoard from "../components/SSGameBoard";
import {useState} from 'react';

const SelectionSortPage = () => {

  // Instructions for usage
  let instructions = '';
  const [showInstructions, setShowInstructions] = useState(false);
  if (showInstructions) {
    instructions =  <div>
        <p>In selection sort, each pass involves iterating down the unsorted array and finding the smallest element.</p>
        <p className='pb-2'>Once that smallest element has been located in the unsorted part of the array, it is added as the last element of the sorted section.</p>
        <p>Array elements can be dragged using the mouse, once they have been added to the sorted section, they will be grayed out for visual clarity.</p>
        <p>If an element is in the correct position, but not considered 'sorted', pick it up and drop it back into the same index location.</p>
        <p>The array element being dragged will swap positions with the old element in that index, so that there are no empty spaces in the array.</p>
      </div>
  }

  return (
    <>  
      {/* heading */}
      <div className='flex justify-center w-full mb-2 border-b border-indigo-300 bg-indigo-100 h-35 items-center'>
        <h1 className='text-bold text-indigo-700 text-5xl'>Selection Sort Practice</h1>
      </div>
      <div className='flex flex-col justify-start'>
        <div className='px-10 pb-5 mb-5 py-1 rounded-sm max-w-7xl ml-20'>
          <button onClick={() => setShowInstructions((prevState) => !prevState)} 
            className='bg-gray-200 font-bold rounded-sm p-1 mb-5 hover:bg-gray-400'>
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
          <div>{instructions}</div>
        </div>
      </div>
      <SSGameBoard />
    </>
  );
}
export default SelectionSortPage;