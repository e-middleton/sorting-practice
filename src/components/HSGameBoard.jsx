import { useHeapSort } from "../logic/useHeapSort";

const HSGameBoard = () => {
  const {
    state,
    doubleClick,
    doubleClickTwo,
    setDragStartIndex,
    drop
  } = useHeapSort(6);

  const {arrayValues, heapValues, swappedItems} = state;

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
                    w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded 
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
          <ul className='mx-auto flex size-fit p-3 rounded-sm gap-1'>
            {arrayValues.map((value, i) => {
              return (
                <li
                  key={i}
                  className={`
                    w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded 
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
