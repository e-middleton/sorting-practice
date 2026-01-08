import { useReducer } from 'react';


export function useHeapSort(arrayLength=6) {
  const PHASE = {
    BUILD: "BUILD",
    SORT: "SORT"
  };

  // ALL AVAILABLE ACTIONS
  const ACTION = {
    PUSH_TO_HEAP: "PUSH_TO_HEAP",
    SWAP: "SWAP",
    FORCE_SWAP: "FORCE_SWAP",
    UNLOCK: "UNLOCK",
    SET_DRAG_START: "SET_DRAG_START",
    POP_ROOT: "POP_ROOT",
    CHECK_PHASE: "CHECK_PHASE"
  }

  // INITIAL VALUES FOR THE ARRAY / DEPENDENCIES
  const initialState = (arrayLength) => ({
    phase: PHASE.BUILD,

    arrayValues: randomizedArray(arrayLength),
    heapValues: [],

    locked: false,
    swappedItems: [],
    dragStartIndex: null,

    arrayLength
  });

  function heapReducer(state, action) {
    switch (action.type) {

      case ACTION.PUSH_TO_HEAP: {
        const value = state.arrayValues[0]; // the leftmost array value

        const newHeap = [...state.heapValues, value]; // add onto the heap array
        const newArray = state.arrayValues.slice(1); // slices from the first element onwards

        // spread operator to keep old values
        return {
          ...state,
          heapValues: newHeap,
          arrayValues: newArray,
        };
      }

      case ACTION.FORCE_SWAP: 
        return {
          ...state,
          swappedItems: action.swapItems,
          locked: true
        };
      
      case ACTION.SWAP: {
        const { from, to } = action;

        const heap = [...state.heapValues];
        [heap[from], heap[to]] = [heap[to], heap[from]];

        return {
          ...state,
          heapValues: heap,
          swappedItems: [],
          locked: false,
          dragStartIndex: null,
        };
      }

      case ACTION.SET_DRAG_START:
        return {
          ...state,
          dragStartIndex: action.index
        };

      case ACTION.POP_ROOT: {
        const [root, ...rest] = state.heapValues;
        if (rest.length !== 0) {
          const newRoot = state.heapValues[state.heapValues.length-1];
          rest.splice(rest.length-1, 1);
          rest.splice(0,0,newRoot);
        }
        
        return {
          ...state,
          heapValues: rest,
          arrayValues: [root, ...state.arrayValues]
        };
      }

      case ACTION.CHECK_PHASE: {
        const correctLength = state.heapValues.length === state.arrayLength;
        const correctOrder = state.swappedItems.length === 0;
        
        return {
          ...state,
          phase:
            correctLength && correctOrder
            ? PHASE.SORT
            : state.phase
        }
      }
  
      default:
        return state;
    }
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
      if (state.phase===PHASE.BUILD) {
        wrongIndices.splice(0, wrongIndices.length-2);
      } else {
        wrongIndices.splice(2);
      }
    }
    return wrongIndices;
  }

  /**
   * assumes that all values except the most recently added (last index)
   * are a correct heap
   * @param arr the input array
   */
  function findHeap(arr) {
    let index = arr.length-1; // index of last added 
    let parentIndex = Math.floor((index-1)/2);

    // compare with parent and swap if needed
    while (parentIndex >= 0) {
      parentIndex = Math.floor((index-1)/2);
      if (arr[parentIndex] < arr[index]) {
        let temp = arr[parentIndex];
        arr[parentIndex] = arr[index];
        arr[index] = temp;
      }
      index = parentIndex;
    }
    return arr;
  };

  /**
   * finds the correct heap when the last 
   * action was removal of the root element
   * @param arr the heap being checked
   */
  function findHeapTwo(arr) {
    let index = 0;
    while (index < arr.length) {
      let lChild = index*2 + 1;
      let rChild = index*2 + 2;
      let lVal;
      let rVal;
      if (lChild < arr.length) {
        if (arr[lChild] > arr[index]) lVal = arr[lChild];
      } 
      if (rChild < arr.length) {
        if (arr[rChild] > arr[index]) rVal = arr[rChild];
      }
      if (lVal && rVal) { // if both exist, choose the larger for the swap
        if (lVal > rVal) {
          rVal = null;
        } else {
          lVal = null;
        }
      } 
      if (rVal) {
        let temp = arr[index];
        arr[index] = rVal;
        arr[rChild] = temp;
        index = rChild;
      } else if (lVal) {
        let temp = arr[index];
        arr[index] = lVal;
        arr[lChild] = temp;
        index = lChild;
      } else {
        index = index+1; // continue down
      }
    }
    return arr;
  }

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

  const [state, dispatch] = useReducer(heapReducer, arrayLength, initialState);

  function doubleClick(index) {
    if (index !== 0) return;

    if (state.phase !== PHASE.BUILD || state.locked) return;

    const nextHeap = [...state.heapValues, state.arrayValues[0]];
    dispatch({type : ACTION.PUSH_TO_HEAP}); 

    checkHeap(nextHeap);
    dispatch({type : ACTION.CHECK_PHASE})
  }

  function drop(toIndex) {
    const from = state.dragStartIndex;
    if (from === null || !state.locked) return;
    if (from === toIndex) return; // picking up and dropping shouldn't have any impact
    if (
      state.swappedItems.includes(from) &&
      state.swappedItems.includes(toIndex)
    ) {
      dispatch({ type: ACTION.SWAP, from, to: toIndex });
    }
    // pretend the swap happened
    const heap = structuredClone(state.heapValues);
    [heap[from], heap[toIndex]] = [heap[toIndex], heap[from]];

    checkHeap(heap);
    dispatch({type : ACTION.CHECK_PHASE})
  }

  function doubleClickTwo(index) {
    if (state.phase !== PHASE.SORT || state.locked) return;
    if (index !== 0) return;

    const newHeap = structuredClone(state.heapValues);
    const newRoot = newHeap[newHeap.length-1];
    newHeap.splice(0,1,newRoot);
    newHeap.splice(newHeap.length-1, 1);
    
    dispatch({ type: ACTION.POP_ROOT });
    checkHeapTwo(newHeap);
  }

  function checkHeap(arr) {
    const correctHeap = findHeap(structuredClone(arr));
    const swapItems = findWrongIndices(arr, correctHeap);

    if (swapItems.length > 0) {
      dispatch({
        type: ACTION.FORCE_SWAP,
        swapItems
      });
    }
  }

  function checkHeapTwo(arr) {
    const correctHeap = findHeapTwo(structuredClone(arr)); // different way of checking the heap because of root
    const swapItems = findWrongIndices(arr, correctHeap);

    if (swapItems.length > 0) {
      dispatch({
        type: ACTION.FORCE_SWAP,
        swapItems
      });
    }
  }

   return {
    state,
    doubleClick,
    doubleClickTwo,
    setDragStartIndex: (i) =>
      dispatch({ type: ACTION.SET_DRAG_START, index: i }),
    drop
  };
};