
export default function Analytics() {
    return (
        <div className="text-white font-sans h-full p-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-6">Analytics</h1>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#121217] p-6 rounded-2xl border border-white/5 h-64 flex items-center justify-center">
                    <span className="text-gray-500">Productivity Graph</span>
                </div>
                <div className="bg-[#121217] p-6 rounded-2xl border border-white/5 h-64 flex items-center justify-center">
                    <span className="text-gray-500">Focus Distribution</span>
                </div>
            </div>
        </div>
    );
}
