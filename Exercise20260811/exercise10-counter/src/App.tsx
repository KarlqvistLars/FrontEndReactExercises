import { useState } from 'react'
import Counter from './components/Counter'
import './App.css'
import CollectorProgress from './components/CollectorProgress';

type Counter = {
  id: number;
  count: number;
};

const App = () => {
  // Array  of counters, total count, collector value, and reset counter state
  const [arrID, setArrID] = useState(0);
  const [counterArr, setCounterArr] = useState<Counter[]>([{ id: 0, count: 0 }]);
  const [totalCount, setTotalCount] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  // Function to add a new counter to the array
  const addCounter = () => {
    setCounterArr(current => [
      ...current,
      {
        id: arrID + 1, // ändra id-typen till string
        count: 0,
      },
    ]);
    setArrID(current => current + 1);
  }

  // Function to remove a counter from the array based on its id
  const removeCounter = (id: number) => {
    setCounterArr(current => current.filter(counter => counter.id !== id));
  }

  // Function to reset the total count and increment the reset counter
  const handleReset = () => {
    setTotalCount(0);
    setResetCounter(version => version + 1);
  };

  return (
    <>
      <main className="min-h-screen p-10 bg-blue-900 text-black flex justify-center items-center flex-col gap-3 b from-cyan-500 to-blue-500 ">
        <span className="text-4xl font-bold text-cyan-400">
          Counter App
        </span>

        <CollectorProgress totalCount={totalCount} />

        <section className="flex gap-3">
          <button className="bg-cyan-400 font-bold w-35 text-gray-500 p-2 rounded-lg" onClick={addCounter}>
            Add Counter
          </button>
          <button className="bg-cyan-400 font-bold w-35 text-gray-500 p-2 rounded-lg"
            onClick={() => {
              handleReset();
            }}>
            Reset Counters
          </button>
        </section>
        <span className="text-2xl font-bold text-cyan-400">
          Number of Counters: {counterArr.length}
        </span>
        <span className="grid grid-cols-2 gap-3 items-center">
          {counterArr.map((_, i) => (
            <Counter
              key={`${i}-${resetCounter}`}
              counterID={counterArr[i].id}
              setTotalCount={setTotalCount}
              handleDeleteCounter={removeCounter}
            />
          ))}
        </span>
      </main>
    </>
  )
}

export default App
