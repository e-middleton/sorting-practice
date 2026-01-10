import { useSelectionSort} from "../logic/useSelectionSort";

const SSGameBoard = ({arrayLength = 7}) => {
  const {
    state,
    setDragStartIndex,
    drop,
    undo
  } = useSelectionSort(arrayLength);

  const {values, steps, locked, wrongIndices} = state;
  const complete = steps === arrayLength;

  return (
    <>
      {/* Memory array and button */}
      <section className='flex flex-col items-center gap-2 m-2'>
        <ul className={`mx-auto flex size-fit p-3 rounded-sm gap-1 ${complete ? "bg-green-200" : "bg-gray-200"}`}>
          {values.map((value, i) => {
            const isSorted = i < steps;
            const isWrong = wrongIndices.includes(i);

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
                  ${isWrong ? "bg-red-400" : ""}
                  ${locked && !isSorted ? "opacity-50" : ""}
                `}
              >
                <div className="p-1 font-mono">{value}</div>
              </li>
            );
          })}
        </ul>

        <button onClick={undo} disabled={!locked} className='px-4 py-2 border size-fit rounded disabled:opacity-40'>
          Undo
        </button>
      </section>
    </>
  );
}
export default SSGameBoard;