import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { Download, TrendingUp, DollarSign, ShoppingBag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ omzet: 0, count: 0, profit: 0 });
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    // 1. Ambil Data Transaksi dari Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return navigate('/login');

                const response = await axios.get("http://localhost:5000/transactions", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data;
                setTransactions(data);
                processData(data); // Olah data untuk grafik
            } catch (error) {
                console.error("Gagal ambil laporan:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // 2. Fungsi Mengolah Data Mentah -> Data Grafik
    const processData = (data) => {
        // A. Hitung Ringkasan (Total Omzet & Jumlah Transaksi)
        const totalOmzet = data.reduce((acc, curr) => acc + curr.total_price, 0);
        const totalCount = data.length;
        // Asumsi profit 40% dari omzet (karena kita belum input harga modal di DB)
        const estProfit = totalOmzet * 0.4;

        setSummary({
            omzet: totalOmzet,
            count: totalCount,
            profit: estProfit
        });

        // B. Siapkan Data untuk Grafik (Group by Date)
        // Format yang dibutuhkan Recharts: [{ date: "18 Jan", omzet: 50000 }, ...]
        const grouped = {};

        data.forEach(t => {
            const date = new Date(t.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            if (!grouped[date]) {
                grouped[date] = 0;
            }
            grouped[date] += t.total_price;
        });

        // Ubah object ke array
        const chartArray = Object.keys(grouped).map(key => ({
            date: key,
            omzet: grouped[key]
        }));

        setChartData(chartArray);
    };

    // Format Rupiah
    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Laporan Penjualan (Real-time)</h2>
                    <p className="text-slate-500 text-sm">Data diambil langsung dari transaksi kasir.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all">
                    <Download size={18} /> Export Data
                </button>
            </div>

            {/* 1. Kartu Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Omzet */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Omzet</p>
                        <h3 className="text-2xl font-bold text-slate-800">{formatRupiah(summary.omzet)}</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center mt-2">
                            <TrendingUp size={14} className="mr-1" /> Data Real
                        </span>
                    </div>
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-lg">
                        <DollarSign size={24} />
                    </div>
                </div>

                {/* Profit (Estimasi) */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Estimasi Profit (40%)</p>
                        <h3 className="text-2xl font-bold text-slate-800">{formatRupiah(summary.profit)}</h3>
                    </div>
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                </div>

                {/* Transaksi */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Transaksi</p>
                        <h3 className="text-2xl font-bold text-slate-800">{summary.count} Pesanan</h3>
                    </div>
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-lg">
                        <ShoppingBag size={24} />
                    </div>
                </div>
            </div>

            {/* 2. Grafik Utama (Omzet per Hari) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Grafik Pendapatan</h3>
                <div className="w-full h-80">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorOmzet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                                <Tooltip
                                    formatter={(value) => formatRupiah(value)}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                                <Area type="monotone" dataKey="omzet" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorOmzet)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">Belum ada data transaksi</div>
                    )}
                </div>
            </div>

            {/* 3. Riwayat Transaksi Terbaru (Tabel) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Riwayat Transaksi Terbaru</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                                <th className="p-4 border-b border-slate-200">No Invoice</th>
                                <th className="p-4 border-b border-slate-200">Tanggal</th>
                                <th className="p-4 border-b border-slate-200">Kasir</th>
                                <th className="p-4 border-b border-slate-200">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {transactions.slice(0, 5).map((trx) => (
                                <tr key={trx.uuid} className="hover:bg-slate-50">
                                    <td className="p-4 font-mono text-blue-600 font-medium">{trx.invoice_number}</td>
                                    <td className="p-4 text-slate-500">{new Date(trx.createdAt).toLocaleString()}</td>
                                    <td className="p-4 font-medium text-slate-800">{trx.user?.username}</td>
                                    <td className="p-4 font-bold text-slate-800">{formatRupiah(trx.total_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}