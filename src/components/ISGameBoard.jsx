import { useInsertionSort } from '../logic/useInsertionSort';

const ISGameBoard = ({arrayLength = 7}) => {
  const {
      state,
      setDragStartIndex,
      drop,
    } = useInsertionSort(arrayLength);

    const {values, steps, currIdx} = state;
    const complete = steps === arrayLength;
    let midRound;
    if (values[currIdx] > values[currIdx - 1]) {
      midRound = true;
    } else {
      midRound = false;
    }

  return (
    <>
      {/* Memory array and button */}
      <section className='flex flex-col items-center gap-2 m-2'>
        <ul className={`mx-auto flex size-fit p-3 rounded-sm gap-1 ${complete ? "bg-green-200" : "bg-gray-200"}`}>
          {values.map((value, i) => {
            let isSorted;
            if (midRound) {
              isSorted = i < steps;
            } else {
              isSorted = i < steps + 1;
            }
            
            const isCurr = i == currIdx;

            return (
              <li
                key={i}
                draggable={true}
                onDragStart={() => setDragStartIndex(i)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => drop(i)}
                className={`
                  w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded md:text-4xl h-17 w-17 p-2 lg:text-4.5xl w-20 h-20
                  ${isSorted ? "bg-slate-300" : ""}
                  ${isCurr ? "bg-white" : ""}              
                `}
              >
                <div className="p-1 font-mono">{value}</div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
export default ISGameBoard;