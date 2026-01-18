import { Menu, Bell, User } from 'lucide-react';

export default function Header({ toggleSidebar, isSidebarOpen }) {
    return (
        <header className={`bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm fixed top-0 right-0 z-20 transition-all duration-300 ${isSidebarOpen ? 'left-64' : 'left-20'}`}>
            <button onClick={toggleSidebar} className="text-slate-500 hover:text-slate-700 focus:outline-none p-2 rounded-md hover:bg-slate-100">
                <Menu size={24} />
            </button>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-blue-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-700">Admin Super</p>
                        <p className="text-xs text-slate-500">Super Administrator</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}