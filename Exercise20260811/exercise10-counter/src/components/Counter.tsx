import { useState } from 'react';

interface CounterProps {
    counterID: number;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
    handleDeleteCounter?: (id: number) => void;
}

const Counter = ({ counterID, setTotalCount, handleDeleteCounter }: CounterProps) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count >= 3) return;

        setCount(current => current + 1);
        setTotalCount(current => current + 1);
    };

    const handleDelete = () => {
        setTotalCount(current => current - count);
        if (handleDeleteCounter) {
            handleDeleteCounter(counterID);
        }
    }

    const additionalClasses = "disabled:cursor-not-allowed disabled:opacity-50 bg-amber-600 text-white";
    return (
        <>
            <span className="flex flex-col w-35 h-35 items-center gap-2 border-gray-500 border-2 p-2 rounded-lg text-cyan-400 text-md font-bold">
                Counter #{counterID + 1}
                <p className='text-xl'>{count}</p>
                <span className="flex gap-2">
                    <button className={`flex flex-col items-center justify-center border-green-600 bg-green-500 text-green-700 text-5xl border-2 p-2 w-10 h-10 rounded-full ${count >= 3 ? additionalClasses : ""}`} onClick={handleIncrement} disabled={count == 3} >
                        <span className="-translate-y-1.5">
                            +
                        </span>
                    </button>
                    <button className={`flex flex-col items-center justify-center border-amber-600  bg-amber-600 text-white text-5xl border-2 p-2 w-10 h-10 rounded-full`} onClick={handleDelete}   >
                        <span className="-translate-y-1.5">
                            -
                        </span>
                    </button>
                </span>
            </span>
        </>
    );
};

export default Counter;