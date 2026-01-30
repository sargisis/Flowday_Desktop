
export default function Tasks() {
    return (
        <div className="text-white font-sans h-full p-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-6">My Tasks</h1>
            <div className="space-y-4">
                <div className="p-4 bg-[#121217] rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="w-5 h-5 rounded border border-gray-600"></div>
                    <span className="text-gray-200">Review Implementation Plan</span>
                </div>
                <div className="p-4 bg-[#121217] rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="w-5 h-5 rounded border border-gray-600"></div>
                    <span className="text-gray-200">Setup Database Schema</span>
                </div>
            </div>
        </div>
    );
}
