import { useState } from "react";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import CustomTitleBar from "./components/CustomTitleBar";

function App() {
    const [hasEntered, setHasEntered] = useState(false);

    return (
        <>
            <CustomTitleBar />
            {hasEntered ? (
                <RootLayout>
                    <Dashboard />
                </RootLayout>
            ) : (
                <Landing onEnter={() => setHasEntered(true)} />
            )}
        </>
    )
}

export default App
