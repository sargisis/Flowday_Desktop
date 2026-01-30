
export default function Team() {
    return (
        <div className="text-white font-sans h-full p-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400 mb-6">Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#121217] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                    <div>
                        <div className="font-bold">Asus User</div>
                        <div className="text-xs text-green-400">Online • Flow State</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
