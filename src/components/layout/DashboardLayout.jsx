import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col h-full">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />

                {/* Main Content Area */}
                <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 pt-24 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}