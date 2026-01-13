import {useReducer, useMemo} from 'react';

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
      let temp = Math.floor(Math.random() * 60 + 1); // gives an integer from 1 - 60
      // prevent duplicates
      while (randomArray.includes(temp)){
        temp = Math.floor(Math.random() * 60 + 1); 
      }
      randomArray[i] = temp;
    }
    return randomArray;
  }

  // ALL AVAILABLE ACTIONS
  const ACTION = {
    SWAP: "SWAP",
    SET_DRAG_START: "SET_DRAG_START",
    SET_WRONG_INDICES: "SET_WRONG_INDICES",
    EMPTY_WRONG_INDICES: "EMPTY_WRONG_INDICES",
    INCREMENT_STEPS: "INCREMENT_STEPS",
    UPDATE_NEXT_PAIR: "UPDATE_NEXT_PAIR",
    UNDO: "UNDO"
  }

  // INITIAL VALUES FOR THE ARRAY / DEPENDENCIES
  const initialState = (arrayLength) => ({
    values: randomizedArray(arrayLength),
    steps: 0,
    locked: false,
    lastSwap: [],
    wrongIndices: [],
    dragStartIndex: null,
    complete: false,
    arrayLength
  });

  function selectionSortReducer(state, action) {
    const {type, payload} = action;
    switch (type) {

      case ACTION.SWAP: {
        const from = payload.from;
        const to = payload.to;
        const array = [...state.values];
        [array[from], array[to]] = [array[to], array[from]];

        return {
          ...state,
          values: array,
          lastSwap: [from, to],
          locked: false,
          dragStartIndex: null,
        }};

      case ACTION.SET_DRAG_START:
        return {
          ...state,
          dragStartIndex: payload
        };
      
      case ACTION.SET_WRONG_INDICES: {
        const from = payload.from;
        const to = payload.to;
        return {
          ...state,
          wrongIndices: [from, to],
          locked: true
        }
      }

      case ACTION.INCREMENT_STEPS: {
        return {
          ...state,
          steps: state.steps+1
        }
      }

      case ACTION.EMPTY_WRONG_INDICES: 
        return {
          ...state,
          wrongIndices: [],
          locked: false
        }
        
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(selectionSortReducer, arrayLength, initialState);

  const sorted = useMemo(
    () => [...state.values].sort((a, b) => a - b),
    [state.values]
  );

  function findNextPair() {
    let correctIndex = state.steps;
    let smallest = state.values[state.steps];
    for (let i = state.steps; i < state.values.length; i++) {
      if (state.values[i] < smallest) {
        correctIndex = i;
        smallest = state.values[i];
      }
    }
    return [state.steps, correctIndex];
  }

  /**
   * function to drop an element of the array that has been dragged
   * @param toIndex the ending index where it is being placed
   */
  function drop(toIndex) {
    const nextPair = findNextPair();
    console.log(nextPair[0], nextPair[1]);
    console.log(nextPair.includes(toIndex));

    if (state.locked || state.dragStartIndex === null) { // if locked is set to true, don't allow dragged items to drop
      return; 
    }
    if (toIndex < state.steps || state.dragStartIndex < state.steps) return; // don't allow already sorted elements to move
    
    if (!nextPair.includes(toIndex) || !nextPair.includes(state.dragStartIndex)) return;

    const from = state.dragStartIndex;
    dispatch({type: ACTION.SWAP, payload: {from: from, to: toIndex}});

    if (state.values[from] !== sorted[toIndex]) { // if it is not the correctly sorted position, lock
      dispatch({type: ACTION.SET_WRONG_INDICES, payload: {from: from, to: toIndex}}); // array of elements with a state of 'wrong'
    } else {
      dispatch({type: ACTION.INCREMENT_STEPS})
    }
    const index = null;
    dispatch({type: ACTION.SET_DRAG_START, index});
  };

  /**
   * function to undo a swap, only possible if locked boolean is true
   * so that correct swaps are not undone
   */
  function undo() {
    if (state.lastSwap.length === 0 || !state.locked) return; // if lastSwap is uninitialized, undo is impossible, also impossible if not locked
    const from = state.lastSwap[1];
    const to = state.lastSwap[0];
    dispatch({type: ACTION.SWAP, payload: {from:from , to:to}});
    dispatch({type: ACTION.EMPTY_WRONG_INDICES})
  }

  return {
    state,
    setDragStartIndex: (i) =>
      dispatch({ type: ACTION.SET_DRAG_START, payload: i }),
    drop,
    undo
  };
};