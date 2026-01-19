import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingCart, Users, FileText, Settings, LogOut,
    Package, Database, ChevronDown, ChevronRight, Tag, Layers,
    User, Truck, ShoppingBag, DollarSign, Store, Calculator,
    Smartphone, Gift, CreditCard, Wallet, Percent, Printer, HelpCircle,
    GitBranch, Globe, Box, Crown
} from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';

export default function Sidebar({ isOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Token invalid");
            }
        }
    }, []);

    const toggleSubmenu = (menuLabel) => {
        setOpenMenu(openMenu === menuLabel ? null : menuLabel);
    };

    // STRUKTUR MENU LENGKAP ALA KASIR PINTAR
    // STRUKTUR MENU DENGAN LABEL PRO
    const menuStructure = [
        {
            type: 'link', path: '/dashboard/misi', label: 'Misi & Hadiah', icon: Gift,
            badge: 'Baru', badgeColor: 'bg-red-500'
        },
        {
            type: 'link', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard
        },

        // DATABASE
        {
            type: 'dropdown',
            label: 'DATABASE',
            icon: Database,
            id: 'database',
            children: [
                { path: '/dashboard/stok', label: 'Barang atau Jasa', icon: Package },
                { path: '/dashboard/manajemen-stok', label: 'Manajemen Stok', icon: Layers, isPro: true }, // PRO!
                { path: '/dashboard/kategori', label: 'Kategori', icon: Tag },
                { path: '/dashboard/pelanggan', label: 'Pelanggan', icon: User },
                { path: '/dashboard/supplier', label: 'Supplier', icon: Truck },
                { path: '/dashboard/marketing', label: 'Marketing (Promo)', icon: Globe, isPro: true }, // PRO!
            ]
        },

        // TRANSAKSI
        {
            type: 'dropdown',
            label: 'TRANSAKSI',
            icon: Calculator,
            id: 'transaksi',
            children: [
                { path: '/dashboard/kasir', label: 'Penjualan (POS)', icon: ShoppingBag },
                { path: '/dashboard/pembelian', label: 'Pembelian', icon: ShoppingCart },
                { path: '/dashboard/keuangan', label: 'Keuangan', icon: DollarSign, isPro: true }, // PRO!
            ]
        },

        // LAPORAN
        {
            type: 'dropdown',
            label: 'LAPORAN',
            icon: FileText,
            id: 'laporan',
            children: [
                { path: '/dashboard/laporan', label: 'Laporan Laba Rugi', icon: FileText, isPro: true }, // SUPER PRO!
                { path: '/dashboard/laporan-jual', label: 'Laporan Penjualan', icon: ShoppingBag },
                { path: '/dashboard/laporan-beli', label: 'Laporan Pembelian', icon: ShoppingCart },
                { path: '/dashboard/laporan-shift', label: 'Laporan Shift', icon: Users, isPro: true }, // PRO!
            ]
        },

        // CABANG (FITUR PREMIUM)
        {
            type: 'dropdown',
            label: 'CABANG',
            icon: GitBranch,
            id: 'cabang',
            isPro: true, // Satu folder PRO semua!
            children: [
                { path: '/dashboard/cabang-all', label: 'Semua Cabang', icon: Store },
                { path: '/dashboard/transfer-stok', label: 'Transfer Barang', icon: Truck },
            ]
        },

        // PENGATURAN
        {
            type: 'dropdown',
            label: 'PENGATURAN',
            icon: Settings,
            id: 'pengaturan',
            children: [
                { path: '/dashboard/profil', label: 'Profil Toko', icon: Store },
                { path: '/dashboard/pegawai', label: 'Manajemen Staff', icon: Users },
                { path: '/dashboard/absensi', label: 'Absensi Staff', icon: Calculator, isPro: true }, // PRO!
                { path: '/dashboard/struk', label: 'Pengaturan Struk', icon: Printer },
            ]
        },

        // E-KATALOG (PRO)
        {
            type: 'dropdown',
            label: 'E-KATALOG',
            icon: Store,
            id: 'katalog',
            isPro: true, // Satu folder PRO
            children: [
                { path: '/dashboard/pesanan', label: 'Daftar Pesanan', icon: FileText },
                { path: '/dashboard/katalog-view', label: 'Tampilan Katalog', icon: Globe },
            ]
        },
        {
            type: 'link', path: '/dashboard/ppob', label: 'PPOB (Pulsa/Listrik)', icon: Smartphone
        },
        {
            type: 'link', path: '/dashboard/ewallet', label: 'E-Wallet', icon: Wallet
        },
    ];

    // Filter Menu User Biasa (Kasir)
    const filteredMenu = menuStructure.filter(item => {
        if (role === 'cashier') {
            // Kasir cuma butuh Dashboard, Transaksi, dan Stok
            if (item.label === 'Dashboard') return true;
            if (item.label === 'TRANSAKSI') return true;
            // Kasir biasanya gak butuh akses PPOB/Cabang/Laporan Detail
            return false;
        }
        return true;
    });

    const handleLogout = () => {
        if (confirm("Yakin ingin keluar?")) {
            localStorage.removeItem("accessToken");
            navigate("/login");
        }
    };

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col fixed h-full z-30 overflow-y-auto custom-scrollbar`}>

            {/* Header Logo */}
            <div className="h-16 flex items-center justify-center border-b border-slate-800 shrink-0 bg-slate-900 sticky top-0 z-10">
                <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>
                    SIPERAK<span className="text-emerald-500">.</span>
                </h1>
                {!isOpen && <span className="text-emerald-500 font-bold text-2xl">S.</span>}
            </div>

            {/* Menu List */}
            {/* Menu List */}
            <nav className="flex-1 py-4 space-y-1 px-3">
                {isOpen && <p className="text-xs text-center text-slate-500 mb-4">Web SIPERAK Ver. 1.0.0</p>}

                {filteredMenu.map((item, index) => {
                    const Icon = item.icon;

                    // --- KOMPONEN LENCANA PRO ---
                    const ProBadge = () => (
                        <div className="ml-auto bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                            <Crown size={10} fill="white" /> PRO
                        </div>
                    );

                    // --- TIPE LINK BIASA ---
                    if (item.type === 'link') {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors group relative mb-1
                                    ${isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Icon size={20} className="shrink-0" />
                                <span className={`ml-3 font-medium whitespace-nowrap flex-1 flex items-center ${!isOpen && 'hidden'}`}>
                                    {item.label}
                                    {/* TAMPILKAN BADGE JIKA PRO */}
                                    {item.isPro && <ProBadge />}
                                </span>

                                {item.badge && isOpen && !item.isPro && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ml-auto ${item.badgeColor || 'bg-blue-500'}`}>
                                        {item.badge}
                                    </span>
                                )}

                                {!isOpen && (
                                    <div className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded z-50 ml-2">
                                        {item.label} {item.isPro && "(PRO)"}
                                    </div>
                                )}
                            </Link>
                        );
                    }

                    // --- TIPE DROPDOWN ---
                    if (item.type === 'dropdown') {
                        const isExpanded = openMenu === item.id;
                        const isChildActive = item.children.some(child => location.pathname === child.path);

                        return (
                            <div key={index} className="mb-1">
                                <button
                                    onClick={() => isOpen && toggleSubmenu(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group relative
                                        ${isChildActive ? 'text-white bg-slate-800' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <div className="flex items-center overflow-hidden flex-1">
                                        <Icon size={20} className="shrink-0" />
                                        <span className={`ml-3 font-medium whitespace-nowrap text-sm uppercase tracking-wider flex items-center w-full ${!isOpen && 'hidden'}`}>
                                            {item.label}
                                            {/* BADGE PRO DI PARENT MENU */}
                                            {item.isPro && <div className="ml-2"><ProBadge /></div>}
                                        </span>
                                    </div>

                                    {isOpen && (
                                        isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                    )}
                                </button>

                                {/* Sub-Menu */}
                                {isOpen && isExpanded && (
                                    <div className="mt-1 space-y-1 bg-slate-900/50 rounded-lg overflow-hidden">
                                        {item.children.map((child, cIndex) => {
                                            const isChildActive = location.pathname === child.path;
                                            return (
                                                <Link
                                                    key={cIndex}
                                                    to={child.path}
                                                    className={`flex items-center justify-between px-4 py-2 pl-11 text-sm transition-colors border-l-2
                                                        ${isChildActive
                                                            ? 'text-emerald-400 border-emerald-500 bg-slate-800'
                                                            : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-600'}`}
                                                >
                                                    <span>{child.label}</span>
                                                    {/* BADGE PRO DI ANAK MENU */}
                                                    {child.isPro && <Crown size={12} className="text-amber-500" fill="currentColor" />}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-800 shrink-0 sticky bottom-0 bg-slate-900">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className={`ml-3 font-medium ${!isOpen && 'hidden'}`}>Keluar</span>
                </button>
            </div>
        </aside>
    );
}