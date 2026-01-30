
import { useState, useEffect } from "react";
import { Plus, Trash2, Check, CheckSquare } from "lucide-react";
import { GetTasks, CreateTask, ToggleTask, DeleteTask } from "../../wailsjs/go/services/TaskService";
import { GetProjects } from "../../wailsjs/go/services/ProjectService";
import { services } from "../../wailsjs/go/models";

export default function Tasks() {
    const [tasks, setTasks] = useState<services.Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [hasProjects, setHasProjects] = useState(false);

    useEffect(() => {
        GetTasks().then(setTasks);
        GetProjects().then(projects => setHasProjects(projects.length > 0));
    }, []);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            const updatedTasks = await CreateTask(newTaskTitle);
            setTasks(updatedTasks);
            setNewTaskTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleTask = async (id: string) => {
        try {
            const updatedTasks = await ToggleTask(id);
            setTasks(updatedTasks);
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

    return (
        <div className="text-white font-sans h-full p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-2 flex items-center gap-3">
                <CheckSquare className="text-green-400" size={32} />
                My Tasks
            </h1>
            <p className="text-gray-400 mb-8">Manage everything you need to do to stay in flow.</p>

            {/* Add Task Input */}
            <form onSubmit={handleAddTask} className="mb-8 flex gap-2 group">
                <div className={`flex-1 bg-[#121217] border border-white/5 rounded-xl px-4 py-4 flex items-center gap-3 transition-colors shadow-lg ${!hasProjects ? 'opacity-50 cursor-not-allowed' : 'group-focus-within:border-green-500/50'}`}>
                    <Plus size={20} className="text-gray-500 group-focus-within:text-green-400 transition-colors" />
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        disabled={!hasProjects}
                        placeholder={hasProjects ? "Add a new task..." : "Create a project first..."}
                        className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-full text-lg disabled:cursor-not-allowed"
                    />
                </div>
            </form>

            <div className="space-y-3">
                {tasks.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        No tasks yet. Enjoy the silence or plan your next move.
                    </div>
                )}
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${task.completed
                            ? "bg-[#0A0A0C] border-transparent opacity-50"
                            : "bg-[#121217] border-white/5 hover:border-green-500/30"
                            }`}
                    >
                        <button
                            onClick={() => handleToggleTask(task.id)}
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed
                                ? "bg-green-500 border-green-500 text-black"
                                : "border-gray-600 hover:border-green-400"
                                }`}
                        >
                            {task.completed && <Check size={14} strokeWidth={3} />}
                        </button>
                        <span className={`flex-1 font-medium text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
                            {task.title}
                        </span>
                        <div className="text-xs text-gray-600 font-mono">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
