import { LayoutDashboard, Calendar, CheckSquare, BarChart2, MessageSquare, Users, Settings, Folder, Plus, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { GetProjects, CreateProject, DeleteProject } from "../../wailsjs/go/services/ProjectService";
import { services } from "../../wailsjs/go/models";

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
    const [projects, setProjects] = useState<services.Project[]>([]);

    useEffect(() => {
        GetProjects().then((data) => setProjects(data || []));
    }, []);

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "calendar", icon: Calendar, label: "Calendar" },
        { id: "tasks", icon: CheckSquare, label: "My Tasks" },
        { id: "analytics", icon: BarChart2, label: "Analytics" },
        { id: "messages", icon: MessageSquare, label: "Messages" },
        { id: "team", icon: Users, label: "Team" },
    ];

    const handleAddProject = async () => {
        const name = prompt("Enter project name:");
        if (name) {
            const updated = await CreateProject(name);
            setProjects(updated || []);
        }
    };

    const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this project?")) {
            const updated = await DeleteProject(id);
            setProjects(updated || []);
        }
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
                {(!projects || projects.length === 0) && (
                    <button
                        onClick={handleAddProject}
                        className="w-full text-left px-3 py-4 text-xs text-text-dim hover:text-primary transition-colors border border-dashed border-white/10 rounded-lg hover:border-primary/50 flex flex-col gap-1"
                    >
                        <span className="font-semibold">+ Create Project</span>
                        <span className="opacity-50">Organize your work</span>
                    </button>
                )}
                {projects && projects.map((item) => (
                    <div
                        key={item.id}
                        className="group w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-dim hover:text-text hover:bg-white/5 transition-all cursor-pointer"
                        onClick={() => onNavigate(`project-${item.id}`)} // Placeholder navigation
                    >
                        <div className="flex items-center gap-3">
                            <Folder size={16} />
                            <span>{item.name}</span>
                        </div>
                        <button
                            onClick={(e) => handleDeleteProject(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
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
