import { useState, useEffect } from "react";
import { Loader2, Hexagon } from "lucide-react";
import { StartGoogleLogin } from "../../wailsjs/go/services/AuthService";
import { EventsOn } from "../../wailsjs/runtime/runtime"; // Manually added import

interface LoginProps {
    onLogin: (user: any) => void;
    onGuest: () => void;
}

export default function Login({ onLogin, onGuest }: LoginProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Listen for auth success from backend
    useEffect(() => {
        const unsubscribe = EventsOn("auth-success", (data: any) => {
            console.log("Auth Success Event:", data);
            onLogin(data);
        });
        return () => {
            // Cleanup not straightforward in Wails without the unregister function,
            // but for this page it's okay.
        };
    }, [onLogin]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError("");
        try {
            // Trigger backend to open system browser
            await StartGoogleLogin();
            // We stay loading until the event comes back
        } catch (err: any) {
            console.error("Login failed", err);
            setError("Could not launch browser.");
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex bg-black text-white font-sans overflow-hidden">
            {/* Left: Branding (Similar to Landing) */}
            <div className="w-1/2 relative hidden md:flex flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1445] via-[#0b0a1a] to-black z-0" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10 opacity-80">
                        <Hexagon size={28} className="text-purple-400" strokeWidth={2} />
                        <span className="text-lg font-semibold tracking-wide">Flowday ID</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        One Account.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Infinite Flow.</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm">
                        Sync your deep work stats, XP, and settings across all your devices.
                    </p>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-12 relative z-10 bg-black/90 md:bg-black">
                <div className="max-w-sm w-full mx-auto">
                    <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                    <p className="text-gray-500 mb-8 text-sm">Access your Flowday workspace.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full bg-white text-black hover:bg-gray-200 disabled:opacity-50 text-sm font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-gray-500">Or</span></div>
                        </div>

                        <button
                            onClick={onGuest}
                            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium py-3 rounded-lg transition-all"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}