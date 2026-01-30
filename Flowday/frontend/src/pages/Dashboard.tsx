import { useState, useEffect } from "react";
import { Plus, Trash2, Check, Flame, Trophy, Activity, Play } from "lucide-react";
import { GetProjects } from "../../wailsjs/go/services/ProjectService";
import { GetUserProfile, AddXP } from "../../wailsjs/go/services/UserService";
import { GetTasks, CreateTask, ToggleTask, DeleteTask } from "../../wailsjs/go/services/TaskService";
import { services } from "../../wailsjs/go/models";

export default function Dashboard() {
    const [user, setUser] = useState<services.UserProfile | null>(null);
    const [tasks, setTasks] = useState<services.Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [hasProjects, setHasProjects] = useState(false);
    const [projects, setProjects] = useState<services.Project[]>([]);

    useEffect(() => {
        // Fetch initial data
        GetUserProfile().then(setUser);
        GetTasks().then(setTasks);
        GetProjects().then(projs => {
            setProjects(projs || []);
            setHasProjects(projs && projs.length > 0);
        });
    }, []);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !hasProjects) return;

        try {
            // Default to first project for now
            const updatedTasks = await CreateTask(newTaskTitle, projects[0].id);
            setTasks(updatedTasks);
            setNewTaskTitle("");
            // Reward for planning!
            const updatedUser = await AddXP(10);
            setUser(updatedUser);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleTask = async (id: string) => {
        try {
            const updatedTasks = await ToggleTask(id);
            setTasks(updatedTasks);
            // Reward for completion!
            const task = updatedTasks.find(t => t.id === id);
            if (task && task.completed) {
                const updatedUser = await AddXP(20);
                setUser(updatedUser);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const updatedTasks = await DeleteTask(id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) return <div className="text-white p-10">Loading flow...</div>;

    const progress = (user.xp / 100) * 100; // Assuming 100 XP per level

    return (
        <div className="text-white font-sans">
            {/* Header / Stats */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Welcome back, {user.name}
                        </h1>
                        <p className="text-gray-400 mt-1">Ready to enter flow state?</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm font-medium transition-all">
                        <Play size={16} className="fill-white" />
                        Start Zen Mode
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#121217] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Level {user.level}</div>
                            <div className="w-32 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#121217] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
                            <Flame size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Daily Streak</div>
                            <div className="text-xl font-bold">{user.streak} Days</div>
                        </div>
                    </div>
                    <div className="bg-[#121217] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <Activity size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Focus Today</div>
                            <div className="text-xl font-bold">0h 0m</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tasks Section */}
            <div className="max-w-2xl">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Check className="text-gray-500" size={18} />
                    Priority Tasks
                </h2>

                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${task.completed
                                ? "bg-[#0A0A0C] border-transparent opacity-50"
                                : "bg-[#121217] border-white/5 hover:border-purple-500/30"
                                }`}
                        >
                            <button
                                onClick={() => handleToggleTask(task.id)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed
                                    ? "bg-purple-500 border-purple-500 text-black"
                                    : "border-gray-600 hover:border-purple-400"
                                    }`}
                            >
                                {task.completed && <Check size={14} strokeWidth={3} />}
                            </button>
                            <span className={`flex-1 font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity p-2"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Task Input */}
                <form onSubmit={handleAddTask} className="mt-4 flex gap-2 group">
                    <div className={`flex-1 bg-[#121217] border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${!hasProjects ? 'opacity-50 cursor-not-allowed' : 'group-focus-within:border-gray-600'}`}>
                        <Plus size={20} className="text-gray-500" />
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            disabled={!hasProjects}
                            placeholder={hasProjects ? "Add a new task..." : "Create a project first..."}
                            className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-full disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
