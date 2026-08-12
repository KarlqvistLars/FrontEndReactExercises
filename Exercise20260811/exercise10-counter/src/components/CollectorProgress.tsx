
interface CollectorProgressProps {
    totalCount: number;
}


const CollectorProgress = ({ totalCount }: CollectorProgressProps) => {

    const collectorValue = Math.floor(totalCount / 10) * 10;

    const progress = ((totalCount / 10) * 10) % 10 === 0 && totalCount > 0 ? 100 : (totalCount % 10) * 10;


    return (
        <>
            <span className="text-2xl w-1/3 flex justify-center font-bold text-cyan-400">
                Total Count: {totalCount}
            </span>
            <span className="text-2xl w-73 h-20 font-bold text-cyan-400 border-gray-500 border-2 rounded-lg p-2">
                Progress: {totalCount} / 10
                <div className="h-3 w-full mt-3 overflow-hidden rounded-full bg-gray-500">
                    <div
                        className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </span>
            <section className="flex flex-col text-2xl items-center justify-center border-gray-500 border-2 rounded-lg font-bold w-73 h-30 text-cyan-400">
                <p>Collector</p>
                <p>{collectorValue}</p>
                <p>Total points collected</p>
            </section>
        </>
    );
};

export default CollectorProgress;