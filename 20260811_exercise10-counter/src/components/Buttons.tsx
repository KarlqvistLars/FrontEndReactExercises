const Buttons = ({ addCounter, handleReset }: { addCounter: () => void; handleReset: () => void }) => {
    return (
        <section className="flex gap-3">
            <button className="bg-cyan-400 font-bold w-35 text-gray-500 p-2 rounded-lg"
                onClick={addCounter}>
                Add Counter
            </button>
            <button className="bg-cyan-400 font-bold w-35 text-gray-500 p-2 rounded-lg"
                onClick={() => {
                    handleReset();
                }}>
                Reset Counters
            </button>
        </section>
    );
};

export default Buttons;