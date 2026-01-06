import {useState} from 'react';
import { useSelectionSort} from "../logic/useSelectionSort";

const SSGameBoard = ({arrayLength = 5}) => {
  const {
    values,
    steps,
    locked,
    wrongIndices,
    complete,
    setDragStartIndex,
    drop,
    undo
  } = useSelectionSort(arrayLength);

  const [overIndex, setOverIndex] = useState(null);

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
                onDragEnter={() => setOverIndex(i)}
                onDragLeave={() => setOverIndex(null)}
                className={`
                  w-15 h-15 p-1 text-3xl flex items-center justify-center border rounded 
                  ${isSorted ? "bg-slate-300" : ""}              
                  ${isWrong ? "bg-red-400" : ""}
                  ${overIndex === i && !complete? "ring-2 ring-blue-400" : ""}
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