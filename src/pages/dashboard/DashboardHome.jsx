import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowRight } from 'lucide-react';
import { jwtDecode } from "jwt-decode"; // <--- Import ini
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-500 font-medium flex items-center">
                <TrendingUp size={14} className="mr-1" /> {change}
            </span>
            <span className="text-slate-400 ml-2">dari bulan lalu</span>
        </div>
    </div>
);

export default function DashboardHome() {
    const [user, setUser] = useState({ name: "", role: "" });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ name: decoded.username, role: decoded.role });
            } catch (error) {
                console.error("Token invalid");
            }
        }
    }, []);

    return (
        <div>
            {/* Header Sapaan */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Halo, {user.name} 👋</h2>
                <p className="text-slate-500">Selamat datang kembali di SIPERAK.</p>
            </div>

            {/* --- LOGIKA PEMISAH TAMPILAN --- */}

            {user.role === 'owner' ? (
                // TAMPILAN KHUSUS OWNER (Lihat Uang & Statistik)
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Pendapatan" value="Rp 120.5jt" change="+12%" icon={DollarSign} color="bg-blue-500" />
                        <StatCard title="Total Pesanan" value="1,240" change="+8.2%" icon={ShoppingBag} color="bg-purple-500" />
                        <StatCard title="Pelanggan Baru" value="350" change="+5.1%" icon={Users} color="bg-orange-500" />
                        <StatCard title="Total Produk" value="84" change="+2.4%" icon={TrendingUp} color="bg-emerald-500" />
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-slate-200 text-center py-20">
                        <p className="text-slate-500">Grafik Penjualan akan ditampilkan di sini</p>
                    </div>
                </>
            ) : (
                // TAMPILAN KHUSUS KASIR (Shortcut Kerja)
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="max-w-md mx-auto py-10">
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Siap untuk berjualan?</h3>
                        <p className="text-slate-500 mb-8">
                            Buka mesin kasir untuk mulai melayani pelanggan dan mencatat transaksi hari ini.
                        </p>
                        <Link
                            to="/dashboard/kasir"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                        >
                            Buka Aplikasi Kasir <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}