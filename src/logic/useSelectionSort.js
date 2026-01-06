import {useState, useMemo} from 'react';

/**
 * Logic necessary for simulating selection sort
 */
export function useSelectionSort(arrayLength) {

  /**
   * function to create a randomized array of integers given a length
   * @param numVals number of values in the array
   * @returns a randomized array
   */
  const randomizedArray = (numVals) => {
    const randomArray = [];
    for (let i = 0; i < numVals; i++) {
      randomArray[i] = Math.floor(Math.random() * 60); // gives an integer from 0 - 59
    }
    return randomArray;
  }

  /**
   * hooks
   */
  const [values, setValues] = useState(() => randomizedArray(arrayLength)); // the initial array of random values
  const [steps, setSteps] = useState(0); // number of steps completed
  const [locked, setLocked] = useState(false); // whether or not dragging is currently allowed
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [lastSwap, setLastSwap] = useState(null); 
  const [wrongIndices, setWrongIndices] = useState([]); 

  const complete = steps === arrayLength;

  const sorted = useMemo(
    () => [...values].sort((a, b) => a - b),
    [values]
  );

  /**
   * function to swap two values in the array given their indices
   * @param from the drag start point
   * @param to the drag end point
   */
  function swap(from, to) {
    setValues(v => {
      const copy = [...v];
      [copy[from], copy[to]] = [copy[to], copy[from]];
      return copy;
    });

    setLastSwap([from, to]);
  };

  /**
   * function to drop an element of the array that has been dragged
   * @param toIndex the ending index where it is being placed
   */
  function drop(toIndex) {
    if (locked || dragStartIndex === null) { // if locked is set to true, don't allow dragged items to drop
      return; 
    }
    if (toIndex < steps || dragStartIndex < steps) return; // don't allow already sorted elements to move

    swap(dragStartIndex, toIndex);

    if (values[dragStartIndex] !== sorted[toIndex]) { // if it is not the correctly sorted position, lock
      setWrongIndices([dragStartIndex, toIndex]); // array of elements with a state of 'wrong'
      setLocked(true);
      console.log('locking');
    } else {
      setSteps((s) => s+1);
    }

    setDragStartIndex(null);
  };

  /**
   * function to undo a swap, only possible if locked boolean is true
   * so that correct swaps are not undone
   */
  function undo() {
    if (!lastSwap) return; // if lastSwap is uninitialized, undo is impossible, also impossible if not locked
    swap(lastSwap[1], lastSwap[0]);
    setWrongIndices([]); // clear out
    setLocked(false);
  }

  return {
    values,
    steps,
    locked,
    wrongIndices,
    complete,
    setDragStartIndex,
    drop,
    undo
  };
};