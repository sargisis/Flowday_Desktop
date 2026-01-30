import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface RootLayoutProps {
    children: ReactNode;
    activePage: string;
    onNavigate: (page: string) => void;
}

export default function RootLayout({ children, activePage, onNavigate }: RootLayoutProps) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-text">
            {/* Sidebar (Fixed Left) */}
            <Sidebar activePage={activePage} onNavigate={onNavigate} />

            {/* Main Content Area */}
            <main className="flex-1 mt-[30px] overflow-auto relative">
                <div className="p-8 pb-20 max-w-[1600px] mx-auto min-h-full">
                    {children}
                </div>

                {/* Background Details */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            </main>
        </div>
    );
}
