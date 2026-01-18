import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

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
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Ringkasan Bisnis</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Pendapatan" value="Rp 120.5jt" change="+12%" icon={DollarSign} color="bg-blue-500" />
                <StatCard title="Total Pesanan" value="1,240" change="+8.2%" icon={ShoppingBag} color="bg-purple-500" />
                <StatCard title="Pelanggan Baru" value="350" change="+5.1%" icon={Users} color="bg-orange-500" />
                <StatCard title="Total Produk" value="84" change="+2.4%" icon={TrendingUp} color="bg-emerald-500" />
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center py-20">
                <p className="text-slate-500">Grafik Penjualan akan ditampilkan di sini (Nanti kita pasang Recharts)</p>
            </div>
        </div>
    );
}