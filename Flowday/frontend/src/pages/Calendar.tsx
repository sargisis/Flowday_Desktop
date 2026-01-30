
export default function Calendar() {
    return (
        <div className="text-white font-sans h-full flex flex-col items-center justify-center p-10">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">Calendar</h1>
            <p className="text-gray-400">Schedule your deep work sessions here.</p>
            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-gray-500">Integration with Google Calendar coming soon.</p>
            </div>
        </div>
    );
}
