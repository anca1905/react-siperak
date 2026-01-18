import React, { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';
import { salesData, categoryData, topProducts, COLORS } from '../../data/reports';

export default function Reports() {
    const [dateRange, setDateRange] = useState("Mingguan");

    // Format Angka ke Rupiah
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="space-y-6">

            {/* Header Page */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Laporan Penjualan</h2>
                    <p className="text-slate-500 text-sm">Analisis performa bisnis Anda secara real-time.</p>
                </div>

                <div className="flex gap-2">
                    {/* Dropdown Filter Dummy */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500 appearance-none"
                        >
                            <option>Mingguan</option>
                            <option>Bulanan</option>
                            <option>Tahunan</option>
                        </select>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all">
                        <Download size={18} /> Unduh PDF
                    </button>
                </div>
            </div>

            {/* 1. Ringkasan Kartu Atas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Omzet */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Omzet</p>
                        <h3 className="text-2xl font-bold text-slate-800">Rp 26.850.000</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center mt-2">
                            <TrendingUp size={14} className="mr-1" /> +12.5% dari minggu lalu
                        </span>
                    </div>
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-lg">
                        <DollarSign size={24} />
                    </div>
                </div>

                {/* Profit */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Profit Bersih</p>
                        <h3 className="text-2xl font-bold text-slate-800">Rp 13.300.000</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center mt-2">
                            <TrendingUp size={14} className="mr-1" /> +8.2% margin profit
                        </span>
                    </div>
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                </div>

                {/* Transaksi */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Transaksi</p>
                        <h3 className="text-2xl font-bold text-slate-800">438 Pesanan</h3>
                        <span className="text-red-500 text-xs font-bold flex items-center mt-2">
                            <TrendingUp size={14} className="mr-1 rotate-180" /> -2.1% dari minggu lalu
                        </span>
                    </div>
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-lg">
                        <ShoppingBag size={24} />
                    </div>
                </div>
            </div>

            {/* 2. Grafik Utama & Grafik Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">

                {/* Chart Kiri: Area Chart (Omzet) */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-6">Tren Pendapatan</h3>
                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorOmzet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value / 1000000}jt`} />
                                <Tooltip
                                    formatter={(value) => formatRupiah(value)}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="omzet" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorOmzet)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart Kanan: Pie Chart (Kategori) */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-4">Penjualan per Kategori</h3>
                    <div className="flex-1 w-full min-h-[300px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Teks di tengah Donut */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                            <p className="text-3xl font-bold text-slate-800">100%</p>
                            <p className="text-xs text-slate-500">Total Sales</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Tabel Top Produk */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Produk Terlaris Minggu Ini</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                            <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}