import { useState } from "react";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import CustomTitleBar from "./components/CustomTitleBar";

import { CreateGuestSession } from "../wailsjs/go/services/AuthService";

function App() {
    const [view, setView] = useState<"landing" | "login" | "dashboard">("landing");
    const [user, setUser] = useState<any>(null);

    const handleGuestLogin = async () => {
        try {
            const session = await CreateGuestSession("Guest User");
            console.log("Backend Session:", session);
            setUser({ name: "Guest" });
            setView("dashboard");
        } catch (e) {
            console.error("Guest login error:", e);
        }
    };

    return (
        <>
            <CustomTitleBar />
            {view === "landing" && (
                <Landing onEnter={() => setView("login")} />
            )}
            {view === "login" && (
                <Login
                    onLogin={(u) => { setUser(u); setView("dashboard"); }}
                    onGuest={handleGuestLogin}
                />
            )}
            {view === "dashboard" && (
                <RootLayout>
                    <Dashboard />
                </RootLayout>
            )}
        </>
    )
}

export default App
