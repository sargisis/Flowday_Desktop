
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Briefcase, Users, Coffee } from "lucide-react";
import { GetEvents } from "../../wailsjs/go/services/CalendarService";
import { services } from "../../wailsjs/go/models";

export default function Calendar() {
    const [events, setEvents] = useState<services.CEvent[]>([]);

    useEffect(() => {
        GetEvents().then((data) => {
            // Sort by time? Assuming mock data is somewhat ordered or we sort manually
            setEvents(data);
        });
    }, []);

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "work": return <Briefcase size={16} className="text-cyan-400" />;
            case "meeting": return <Users size={16} className="text-purple-400" />;
            case "break": return <Coffee size={16} className="text-orange-400" />;
            default: return <Clock size={16} className="text-gray-400" />;
        }
    };

    return (
        <div className="text-white font-sans h-full p-8 max-w-4xl mx-auto flex flex-col">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6 flex items-center gap-3">
                <CalendarIcon className="text-blue-400" size={32} />
                Today's Schedule
            </h1>

            <div className="space-y-4">
                {events.length === 0 && (
                    <div className="p-8 text-center text-gray-500 border border-white/5 rounded-2xl bg-[#121217]">
                        No events scheduled for today. Enjoy your free time!
                    </div>
                )}

                {events.map((event) => (
                    <div key={event.id} className="relative pl-8 py-2 group">
                        {/* Timeline Line */}
                        <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-white/5 group-hover:bg-blue-500/20 transition-colors"></div>
                        {/* Timeline Dot */}
                        <div className="absolute left-[7px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#121217] border-2 border-blue-500 z-10"></div>

                        <div className="bg-[#121217] border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-white/5 ${event.type === 'work' ? 'bg-cyan-500/10' : ''}`}>
                                    {getIcon(event.type)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{event.title}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <Clock size={12} />
                                        {formatTime(event.start)} - {formatTime(event.end)}
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-white/5 rounded text-xs uppercase font-bold text-gray-400 tracking-wider">
                                {event.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-center">
                <p className="text-sm text-blue-300">
                    💡 Tip: This connects to the Go backend `CalendarService`. Currently using mock data for today.
                </p>
            </div>
        </div>
    );
}
