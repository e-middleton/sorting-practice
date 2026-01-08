import {useState, useEffect} from 'react';

export function useHeapSort(arrayLength=6) {

  const PHASE = {
    BUILD: "BUILD",
    SORT: "SORT"
  };


  /**
   * function to create a randomized array of integers given a length
   * @param numVals number of values in the array
   * @returns a randomized array
   */
  const randomizedArray = (numVals) => {
    const randomArray = [];
    for (let i = 0; i < numVals; i++) {
      randomArray[i] = Math.floor(Math.random() * 60 + 1); // gives an integer from 1 - 60
    }
    return randomArray;
  }

  // let dragStartIndex; // will change
  // let sortedElem = 0; // how many elements are sorted
  const [arrayValues, setArrayValues] = useState(() => {return randomizedArray(arrayLength);});
  const [heapValues, setHeapValues] = useState([]);
  const [swappedItems, setSwappedItems] = useState([]); // parent and child index last swapped
  const [locked, setLocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState(PHASE.BUILD);
  const [dragStartIndex, setDragStartIndex] = useState(null);

  useEffect(() => {
    if (heapValues.length === arrayLength && (swappedItems.length === 0)) {
      setPhase(PHASE.SORT);
      console.log('setting phase 2');
    }
  }, [heapValues.length, arrayLength]);

  const heapTable = prepHeap(heapValues.concat(arrayValues));

  function heapify() {
    // use first arrayValues because useState is asynchronous and only updates on next render (?)
    let equal;
    let tempHeap;
    const endIndex = findEnd(heapTable[currentIndex]);
    // if the last move was NOT an enforced swap
    // it means there has not been a rerender, and heapValues doesn't include latest update, so needs arrayValues[0]
    if (heapValues.length === currentIndex) {
      equal = arrayComp(heapValues.concat(arrayValues[0]), heapTable[currentIndex].slice(0, endIndex+1));
    } else {
      tempHeap = structuredClone(heapValues);
      const tempVal = tempHeap[swappedItems[0]];
      tempHeap[swappedItems[0]] = tempHeap[swappedItems[1]]; // swap current index with parent val
      tempHeap[swappedItems[1]] = tempVal;
      equal = arrayComp(tempHeap, heapTable[currentIndex].slice(0, endIndex+1));
    }
    
    let wrongIndices;
    if (!equal) {
      if (tempHeap) {
        wrongIndices = findWrongIndices(tempHeap, heapTable[currentIndex].slice(0, endIndex+1));
        setSwappedItems(wrongIndices);
      } else {
        wrongIndices = findWrongIndices(heapValues.concat(arrayValues[0]), heapTable[currentIndex].slice(0, endIndex+1));
        setSwappedItems(wrongIndices);
      }
      setLocked(val => !val);
    } else {
      setCurrentIndex(index => index+1);
    }

    // if (heapValues.length === arrayLength) {
    //   if (!wrongIndices) { // if not initialized, then no swaps were needed
    //      setStageTwo(true);
    //   }
    // }
  }

  function arrayComp(arr1, arr2) {
    let equality = true;
    for(let i = 0; i < arr1.length; i++) { // they should always be the same length, so no check for length
      if (arr1[i] !== arr2[i]) {
        equality = false;
      }
    }
    return equality;
  }

  function findEnd(arr) {
    let index = 0;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i]) { // as long as values are not null, index will update
        index = i;
      }
    }
    return index;
  }

  /**
   * find the mismatched indices between the two arrays
   * only include the last two because multiple swaps might
   * be involved, but only one should be shown in a rendering
   */
  function findWrongIndices(arr1, arr2) {
    const wrongIndices = [];
    for(let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        wrongIndices.push(i);
      }
    }
    if (wrongIndices.length > 2) {
      wrongIndices.splice(0, wrongIndices.length-2);
    }
    return wrongIndices;
  }

  function doubleClick(index) {
    if (index !== 0) {
      return;
    }

    if (phase===PHASE.BUILD && !locked) {
      setHeapValues(heap => {
        const copy = [...heap];
        copy.push(arrayValues[0]);
        return copy;
      })

      // remove item from array values
      setArrayValues(v => {
        const copy = [...v];
        copy.splice(0, 1);
        return copy;
      })
      heapify();
    }
  }

  function reheapify(arr) {
    arr.splice(0,1); // ignore first val
    const reHeapTable = prepHeap(arr);
    const correctRow = reHeapTable[arr.length-1];
    let equal = arrayComp(arr, correctRow);
    if (equal) {
      return;
    } else {
      let wrongIndices = findWrongIndices(arr, correctRow);
      setSwappedItems(wrongIndices);
    }
  }

  /**
   * function to drop an element of the array that has been dragged
   * @param toIndex the ending index where it is being placed
   */
  function drop(toIndex) {
    console.log('drag')
    if (!locked || dragStartIndex === null) { // if locked is not true, don't allow dragged items to drop
      return; 
    }
    if (dragStartIndex === toIndex) {
      return;
    }
    if (swappedItems.includes(dragStartIndex) && swappedItems.includes(toIndex)){
      console.log('valid swap')
      swap(dragStartIndex, toIndex);
      setSwappedItems([]);
      setLocked(false);
      if (phase===PHASE.BUILD) {
        heapify();
      } else {
        reheapify();
      }
    }
  
    setDragStartIndex(null);
  };

  function swap(from, to) {
    setHeapValues(v => {
      const copy = [...v];
      [copy[from], copy[to]] = [copy[to], copy[from]];
      return copy;
    });
  };

  function doubleClickTwo(itemIndex) {
    console.log(`stage 2 ${phase}`);
    if (phase===PHASE.SORT) { // either stage 2 or the array is empty with no swaps needed
      if (itemIndex===0) { // only allowed on the root of the heap
        setArrayValues(v => {
          const copy = [heapValues[0]].concat([...v]);
          return copy;
        });
        setHeapValues(heap => {
        const copy = [...heap];
        copy.splice(0,1);
        return copy;
        });
        reheapify(structuredClone(heapValues));
      }
    }
  }

  return {
    arrayValues,
    heapValues,
    swappedItems,
    doubleClick,
    doubleClickTwo,
    setDragStartIndex,
    drop
  };
};




function prepHeap(initialValues) {
  const heapTable = createHeapTable(initialValues.length, initialValues.length);

  // create a table of heaps for each added index element
  function createHeapTable(rows, columns, defaultValue = null) {
    const arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(columns).fill(defaultValue);
    }
    fillHeapTable(arr);
    return arr;
  }

  function fillHeapTable(arr){
    for (let i = 0; i < arr.length; i++) {
      for(let j = 0; j < i+1; j++) {
        if (j < i) {
          arr[i][j] = arr[i-1][j];
        } else {
          arr[i][j] = initialValues[j];
        }
      }
      heapify(i, arr);
    }
    return arr;
  }

  function heapify(row, table) {
    let index = row; // index of last added 
    let parentIndex = Math.floor((index-1)/2);

    // compare with parent and swap if needed
    while (parentIndex >= 0) {
      parentIndex = Math.floor((index-1)/2);
      if (table[row][parentIndex] < table[row][index]) {
        let temp = table[row][parentIndex];
        table[row][parentIndex] = table[row][index];
        table[row][index] = temp;
      }
      index = parentIndex;
    }
    return table;
  }
  return heapTable;
}