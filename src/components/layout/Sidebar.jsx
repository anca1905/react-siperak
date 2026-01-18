import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, FileBarChart, Settings, LogOut, Package } from 'lucide-react';

export default function Sidebar({ isOpen }) {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/kasir', label: 'Kasir / POS', icon: ShoppingCart },
        { path: '/dashboard/stok', label: 'Stok Barang', icon: Package },
        { path: '/dashboard/pegawai', label: 'Data Pegawai', icon: Users },
        { path: '/dashboard/laporan', label: 'Laporan', icon: FileBarChart },
        { path: '/dashboard/pengaturan', label: 'Pengaturan', icon: Settings },
    ];

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col fixed h-full z-30`}>
            <div className="h-16 flex items-center justify-center border-b border-slate-800">
                <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>
                    SIPERAK<span className="text-blue-500">.</span>
                </h1>
                {!isOpen && <span className="text-blue-500 font-bold text-2xl">S.</span>}
            </div>

            <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors group relative
                ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Icon size={20} />
                            <span className={`ml-3 font-medium whitespace-nowrap ${!isOpen && 'hidden'}`}>{item.label}</span>
                            {!isOpen && (
                                <div className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link to="/" className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className={`ml-3 font-medium ${!isOpen && 'hidden'}`}>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}