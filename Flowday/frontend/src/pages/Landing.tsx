import { ArrowRight, CheckCircle2, Hexagon } from "lucide-react";
import { useState } from "react";

interface LandingProps {
    onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
    const [name, setName] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && name.trim()) {
            onEnter();
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-black text-white font-sans selection:bg-purple-500/30">
            {/* LEFT PANEL: Brand & Features */}
            <div className="w-1/2 h-full relative flex flex-col justify-between p-12 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1445] via-[#0b0a1a] to-black z-0" />
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-24 opacity-80">
                        <Hexagon size={28} className="text-purple-400" strokeWidth={2} />
                        <span className="text-lg font-semibold tracking-wide">Flowday</span>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Focus is the new <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Superpower.
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                            Transform your workflow with a neuroscience-first approach to productivity.
                            Block distractions, enter deep work, and ship faster.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <FeatureItem text="AI-Powered Planning" />
                        <FeatureItem text="Deep Work Timer" />
                        <FeatureItem text="Distraction-free UI" />
                    </div>
                </div>

                {/* Footer/Copy */}
                <div className="relative z-10 text-xs text-gray-500 opacity-50">
                    © 2026 Flowday Inc.
                </div>
            </div>

            {/* RIGHT PANEL: Onboarding */}
            <div className="w-1/2 h-full bg-black flex flex-col justify-center px-24 relative z-10">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-700">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-8">Initialize your workspace to begin.</p>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">What should we call you?</label>
                            <input
                                autoFocus
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter your name"
                                className="w-full bg-[#111116] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium"
                            />
                        </div>

                        <button
                            onClick={onEnter}
                            disabled={!name.trim()}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-md font-semibold py-4 rounded-xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-3 group"
                        >
                            Enter Dashboard
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-600">Press <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-400">Enter</code> to start</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-gray-300">
            <div className="p-1 rounded-full bg-blue-500/10 text-blue-400">
                <CheckCircle2 size={16} />
            </div>
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}
