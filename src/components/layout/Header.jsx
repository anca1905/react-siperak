import { Menu, Bell, User } from 'lucide-react';

export default function Header({ toggleSidebar }) {
    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
            {/* Left: Toggle Button */}
            <button onClick={toggleSidebar} className="text-slate-500 hover:text-slate-700 focus:outline-none">
                <Menu size={24} />
            </button>

            {/* Right: User Profile & Notif */}
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