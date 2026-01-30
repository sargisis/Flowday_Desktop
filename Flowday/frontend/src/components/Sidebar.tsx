import { LayoutDashboard, Calendar, CheckSquare, BarChart2, MessageSquare, Users, Settings, Folder, Plus } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
    const [projects, setProjects] = useState<string[]>([]); // Dynamic projects

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "calendar", icon: Calendar, label: "Calendar" },
        { id: "tasks", icon: CheckSquare, label: "My Tasks" },
        { id: "analytics", icon: BarChart2, label: "Analytics" },
        { id: "messages", icon: MessageSquare, label: "Messages" },
        { id: "team", icon: Users, label: "Team" },
    ];

    const handleAddProject = () => {
        // TODO: Implement project creation dialog
        const name = prompt("Enter project name:");
        if (name) setProjects([...projects, name]);
    };

    return (
        <aside className="w-[240px] h-screen bg-background/50 backdrop-blur-xl border-r border-white/5 flex flex-col pt-[40px]">
            {/* Menu */}
            <div className="px-3 py-4 space-y-1">
                <div className="px-3 text-xs font-semibold text-text-dim uppercase mb-2">Menu</div>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative",
                            activePage === item.id
                                ? "text-text bg-surface"
                                : "text-text-dim hover:text-text hover:bg-white/5"
                        )}
                    >
                        {activePage === item.id && (
                            <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                        )}
                        <item.icon size={18} className={cn(
                            "transition-colors",
                            activePage === item.id ? "text-primary" : "group-hover:text-white"
                        )} />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Projects */}
            <div className="px-3 py-4 mt-4">
                <div className="px-3 text-xs font-semibold text-text-dim uppercase mb-2 flex justify-between items-center">
                    Projects
                    <button onClick={handleAddProject} className="hover:text-white transition-colors">
                        <Plus size={14} />
                    </button>
                </div>
                {projects.length === 0 && (
                    <div className="px-3 text-xs text-text-dim italic">No projects yet</div>
                )}
                {projects.map((item, idx) => (
                    <button
                        key={idx}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-dim hover:text-text hover:bg-white/5 transition-all"
                    >
                        <Folder size={16} />
                        {item}
                    </button>
                ))}
            </div>

            {/* Bottom: Settings */}
            <div className="mt-auto p-3">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-dim hover:text-text hover:bg-white/5 transition-all">
                    <Settings size={18} />
                    Settings
                </button>
            </div>
        </aside>
    );
}
