import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Crown } from 'lucide-react';

export default function ProfitLoss() {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({ omzet: 0, modal: 0, profit: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:5000/transactions", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                processProfitData(response.data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const processProfitData = (transactions) => {
        let totalOmzet = 0;
        let totalModal = 0;
        const chartMap = {};

        transactions.forEach(trx => {
            let trxModal = 0;
            if (trx.transaction_items) {
                trx.transaction_items.forEach(item => {
                    trxModal += (item.cost_price || 0) * item.qty;
                });
            }

            totalOmzet += trx.total_price;
            totalModal += trxModal;

            const date = new Date(trx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            if (!chartMap[date]) {
                chartMap[date] = { date, omzet: 0, modal: 0, profit: 0 };
            }
            chartMap[date].omzet += trx.total_price;
            chartMap[date].modal += trxModal;
            chartMap[date].profit += (trx.total_price - trxModal);
        });

        setSummary({
            omzet: totalOmzet,
            modal: totalModal,
            profit: totalOmzet - totalModal
        });

        setData(Object.values(chartMap));
    };

    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl">
                <div className="p-3 bg-amber-400 rounded-lg text-slate-900">
                    <Crown size={32} fill="currentColor" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Laporan Laba Rugi (Profit & Loss)</h2>
                    <p className="text-slate-300 text-sm">Analisa keuntungan bersih bisnis Anda secara real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-bold uppercase mb-2">Pendapatan (Omzet)</p>
                    <h3 className="text-2xl font-bold text-blue-600">{formatRupiah(summary.omzet)}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                        <DollarSign size={14} /> Total uang masuk
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-bold uppercase mb-2">Beban Pokok (HPP)</p>
                    <h3 className="text-2xl font-bold text-red-500">{formatRupiah(summary.modal)}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                        <TrendingDown size={14} /> Total modal barang
                    </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 shadow-sm">
                    <p className="text-emerald-700 text-sm font-bold uppercase mb-2">Profit Bersih (Laba)</p>
                    <h3 className="text-3xl font-bold text-emerald-600">{formatRupiah(summary.profit)}</h3>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-semibold">
                        <TrendingUp size={14} /> Keuntungan Real
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Grafik Performa Keuntungan</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <Tooltip
                                formatter={(value) => formatRupiah(value)}
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="omzet" name="Omzet" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="profit" name="Profit Bersih" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}