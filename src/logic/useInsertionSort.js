import {useReducer} from 'react';

/**
 * Logic necessary for simulating insertion sort
 */
export function useInsertionSort(arrayLength) {

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
    INCREMENT_STEPS: "INCREMENT_STEPS",
    UPDATE_CURRIDX: "UPDATE_CURRIDX",
    UPDATE_NEXT_PAIR: "UPDATE_NEXT_PAIR",
    UNDO: "UNDO"
  }

  // INITIAL VALUES FOR THE ARRAY / DEPENDENCIES
  const initialState = (arrayLength) => ({
    values: randomizedArray(arrayLength),
    steps: 1,               // automatically start at 1, because the first element is 'sorted'
    currIdx: 1,                 // the current 'active' index being compared
    dragStartIndex: null,
    arrayLength
  });

  function insertionSortReducer(state, action) {
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

      case ACTION.INCREMENT_STEPS: {
        return {
          ...state,
          steps: state.steps+1
        }
      };

      case ACTION.UPDATE_CURRIDX: {
        return {
          ...state,
          currIdx: payload
        }
      };
        
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(insertionSortReducer, arrayLength, initialState);
  
  function findSwap() {
    if (state.values[state.currIdx] < state.values[state.currIdx - 1]) {
      return [state.currIdx, state.currIdx-1];
    } else {
      return [state.currIdx, state.currIdx]; // pick up and drop back down
    }
  }

  /**
   * function to drop an element of the array that has been dragged
   * @param toIndex the ending index where it is being placed
   */
  function drop(toIndex) {
    // first check, which indices need to swap, and are the selected indices matching
    const swapVals = findSwap();
    if (state.dragStartIndex != swapVals[0]) return; // drag from the right index

    if (!swapVals.includes(toIndex) || !swapVals.includes(state.dragStartIndex)) return;
    if ((swapVals[0] !== swapVals[1]) && (toIndex === state.dragStartIndex)) return; 

    if (state.dragStartIndex === null) {
      return; 
    }
    // if (toIndex < state.steps || state.dragStartIndex < state.steps) return; // don't allow already sorted elements to move
    checkDone(toIndex);
    
    const index = null;
    dispatch({type: ACTION.SET_DRAG_START, index});
  };

  /**
   * checks if a given value is properly set, if it is, it increases
   * the sorted section by one and moves on
   */
  function checkDone(toIndex) {
    const fakeVals = structuredClone(state.values);
    const from = state.dragStartIndex;

    // if currIdx == 0, automatically move on
    if (state.currIdx == 0) {
      dispatch({type: ACTION.INCREMENT_STEPS}); // this value is done, sorted section increases by one
      const newIdx = state.steps + 1;
      dispatch({type: ACTION.UPDATE_CURRIDX, payload: newIdx});
    }
    // pretend the swap has happened, are we done with this index? Or are more swaps needed.
    [fakeVals[from], fakeVals[toIndex]] = [fakeVals[toIndex], fakeVals[from]];

    if (fakeVals[toIndex] < fakeVals[toIndex-1]) {
      const newIdx = state.currIdx - 1;
      dispatch({type: ACTION.UPDATE_CURRIDX, payload: newIdx});
    } else {
      // console.log(fakeVals);
      dispatch({type: ACTION.INCREMENT_STEPS}); // this value is done, sorted section increases by one
      const newIdx = state.steps + 1;
      dispatch({type: ACTION.UPDATE_CURRIDX, payload: newIdx});
    }

    dispatch({type: ACTION.SWAP, payload: {from: from, to: toIndex}});
  }

  return {
    state,
    setDragStartIndex: (i) =>
      dispatch({ type: ACTION.SET_DRAG_START, payload: i }),
    drop
  };
};