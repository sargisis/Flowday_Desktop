import { WindowMinimise, WindowToggleMaximise, Quit } from "../../wailsjs/runtime/runtime";
import { X, Minus, Square } from "lucide-react";
import { cn } from "../lib/utils";

export default function CustomTitleBar() {
    return (
        <div
            className={cn(
                "h-[30px] w-full flex items-center justify-between px-2 select-none",
                "bg-transparent fixed top-0 left-0 z-50 pointer-events-none" // Transparent & click-through except buttons
            )}
            style={{ widows: 1, "--wails-draggable": "drag" } as React.CSSProperties}
        >
            {/* Left: Branding (Hidden on Landing if needed, or subtle) */}
            <div className="flex items-center gap-2 pl-2 opacity-50">
                {/* <span className="text-xs font-medium text-text-dim tracking-wider uppercase">Flowday</span> */}
            </div>

            {/* Right: Window Controls */}
            <div
                className="flex items-center gap-1 pointer-events-auto" // Re-enable pointer events for buttons
                style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
            >
                <button
                    onClick={WindowMinimise}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors group"
                >
                    <Minus size={14} className="text-text-dim group-hover:text-text" />
                </button>
                <button
                    onClick={WindowToggleMaximise}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors group"
                >
                    <Square size={12} className="text-text-dim group-hover:text-text" />
                </button>
                <button
                    onClick={Quit}
                    className="p-1 hover:bg-red-500/20 rounded-md transition-colors group"
                >
                    <X size={14} className="text-text-dim group-hover:text-red-400" />
                </button>
            </div>
        </div>
    );
}
