import { useState } from 'react';
import { Search, Plus, Filter, AlertTriangle, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { stocks } from '../../data/stocks';

export default function Stock() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All"); // All, Low, Out

    // Fungsi cek status stok
    const getStockStatus = (stock, min) => {
        if (stock === 0) return { label: "Habis", color: "bg-red-100 text-red-700", icon: AlertCircle };
        if (stock < min) return { label: "Menipis", color: "bg-amber-100 text-amber-700", icon: AlertTriangle };
        return { label: "Aman", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle };
    };

    // Filter Data
    const filteredStocks = stocks.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === "All") return matchesSearch;
        if (filterStatus === "Low") return matchesSearch && item.stock < item.minStock && item.stock > 0;
        if (filterStatus === "Out") return matchesSearch && item.stock === 0;
        return matchesSearch;
    });

    // Hitung jumlah untuk kartu ringkasan
    const lowStockCount = stocks.filter(i => i.stock < i.minStock && i.stock > 0).length;
    const outOfStockCount = stocks.filter(i => i.stock === 0).length;

    return (
        <div>
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Stok Barang</h2>
                    <p className="text-slate-500 text-sm">Monitoring ketersediaan bahan baku dan produk.</p>
                </div>

                {/* Tombol Aksi */}
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Filter size={18} /> Export Laporan
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all">
                        <Plus size={18} /> Tambah Barang
                    </button>
                </div>
            </div>

            {/* Alert Cards (Ringkasan Cepat) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Total Item</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stocks.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Stok Menipis</p>
                        <h3 className="text-2xl font-bold text-slate-800">{lowStockCount}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Stok Habis</p>
                        <h3 className="text-2xl font-bold text-slate-800">{outOfStockCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filter Tabs & Search */}
            <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg self-start">
                    {["All", "Low", "Out"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterStatus === status
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {status === "All" ? "Semua" : status === "Low" ? "Menipis" : "Habis"}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama / SKU..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Stok */}
            <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold border-b border-slate-200">Info Barang</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Kategori</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Sisa Stok</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredStocks.length > 0 ? (
                                filteredStocks.map((item) => {
                                    const status = getStockStatus(item.stock, item.minStock);
                                    const StatusIcon = status.icon;

                                    return (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold text-slate-800">{item.name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">{item.sku}</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600">{item.category}</td>
                                            <td className="p-4">
                                                <span className="font-bold text-slate-800">{item.stock}</span>
                                                <span className="text-slate-500 text-xs ml-1">{item.unit}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${status.color}`}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                                    Update Stok
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        Tidak ada barang yang cocok dengan filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}