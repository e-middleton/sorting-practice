import { useHeapSort } from "../logic/useHeapSort";

const HSGameBoard = () => {
  const {
    state,
    doubleClick,
    doubleClickTwo,
    setDragStartIndex,
    drop
  } = useHeapSort(7);

  const {arrayValues, heapValues, swappedItems, arrayLength, phase} = state;
  const complete = arrayValues.length === arrayLength && phase==='SORT';

  return (
    <>
      {/* Memory array and button */}
      <section className='flex flex-col items-center gap-2 m-2'>
        <div className='flex'>
          {/* HEAP VALUES */}
          <ul className='mx-auto flex size-fit p-3 rounded-sm gap-1'>
            {heapValues.map((value, i) => {
              const needsToSwap = swappedItems.includes(i);
              return (
                <li
                  key={i}
                  draggable={true}
                  onDragStart={() => setDragStartIndex(i)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => drop(i)}
                  className={`
                    w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded md:text-4xl h-17 w-17 p-2 lg:text-4.5xl w-20 h-20
                    ${needsToSwap ? 'bg-red-400': ''}
                  `}
                  onDoubleClick={() => doubleClickTwo(i)}
                >
                  <div className="p-1 font-mono">{value}</div>
                </li>
              );
            })}
          </ul>
          {/* ARRAY VALUES */}
          <ul className={`mx-auto flex size-fit p-3 rounded-sm gap-1 ${complete ? "bg-green-200" : "bg-transparent"}`}>
            {arrayValues.map((value, i) => {
              return (
                <li
                  key={i}
                  className={`
                    w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded md:text-4xl h-17 w-17 p-2 lg:text-4.5xl w-20 h-20
                  `}
                  onDoubleClick = {() => doubleClick(i)}
                >
                  <div className="p-1 font-mono">{value}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default HSGameBoard;
// double click + enforced swap = remove highlighting
// use the array of swappedItems - useState
