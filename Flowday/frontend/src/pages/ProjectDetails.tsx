
import { useEffect, useState } from "react";
import { Folder, Plus } from "lucide-react";
import { GetProjects } from "../../wailsjs/go/services/ProjectService";
import { services } from "../../wailsjs/go/models";

interface ProjectDetailsProps {
    projectId: string;
    onNavigate: (page: string) => void;
}

export default function ProjectDetails({ projectId, onNavigate }: ProjectDetailsProps) {
    const [project, setProject] = useState<services.Project | null>(null);

    useEffect(() => {
        // Find the project details from the list (or fetch individual project if API supported)
        GetProjects().then(projects => {
            const found = projects?.find(p => p.id === projectId);
            setProject(found || null);
        });
    }, [projectId]);

    if (!project) return <div className="text-white p-10">Project not found</div>;

    return (
        <div className="text-white font-sans h-full p-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Folder className="text-blue-400" size={32} />
                {project.name}
            </h1>

            <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500">
                <p className="mb-4">No tasks in this project yet.</p>
                <button
                    onClick={() => onNavigate("tasks")}
                    className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={16} />
                    Add Task to {project.name}
                </button>
            </div>
        </div>
    );
}
