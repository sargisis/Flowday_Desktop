
import { useState } from "react";
import RootLayout from "./RootLayout";
import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import Analytics from "../pages/Analytics";
import Messages from "../pages/Messages";
import Team from "../pages/Team";

export default function Workspace() {
    const [page, setPage] = useState("dashboard");

    return (
        <RootLayout activePage={page} onNavigate={setPage}>
            {page === "dashboard" && <Dashboard />}
            {page === "calendar" && <Calendar />}
            {page === "tasks" && <Tasks />}
            {page === "analytics" && <Analytics />}
            {page === "messages" && <Messages />}
            {page === "team" && <Team />}
        </RootLayout>
    );
}
