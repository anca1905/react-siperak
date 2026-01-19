import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Trash2, Edit, User, Phone, MapPin, Loader2, X, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", address: "" });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const getCustomers = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return navigate('/login');
            const response = await axios.get("http://localhost:5000/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getCustomers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const url = editId
                ? `http://localhost:5000/customers/${editId}`
                : "http://localhost:5000/customers";
            const method = editId ? "patch" : "post";

            await axios[method](url, form, { headers: { Authorization: `Bearer ${token}` } });

            alert("Data Tersimpan!");
            setShowModal(false);
            setForm({ name: "", phone: "", address: "" });
            setEditId(null);
            getCustomers();
        } catch (error) {
            alert(error.response?.data?.msg || "Gagal menyimpan");
        }
    };

    const handleEdit = (cust) => {
        setEditId(cust.uuid);
        setForm({ name: cust.name, phone: cust.phone, address: cust.address });
        setShowModal(true);
    };

    const handleDelete = async (uuid) => {
        if (!confirm("Hapus pelanggan ini?")) return;
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/customers/${uuid}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        getCustomers();
    };

    const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Data Pelanggan</h2>
                    <p className="text-slate-500 text-sm">Kelola kontak pelanggan setia Anda.</p>
                </div>
                <button
                    onClick={() => { setEditId(null); setForm({ name: "", phone: "", address: "" }); setShowModal(true); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                    <Plus size={18} /> Tambah Pelanggan
                </button>
            </div>

            {/* Konten */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center"><Loader2 className="animate-spin inline text-blue-500" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                                <tr>
                                    <th className="p-4">Nama Pelanggan</th>
                                    <th className="p-4">No. HP / WhatsApp</th>
                                    <th className="p-4">Alamat</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.length > 0 ? filtered.map((item) => (
                                    <tr key={item.uuid} className="hover:bg-slate-50">
                                        <td className="p-4 font-bold text-slate-700 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                <User size={16} />
                                            </div>
                                            {item.name}
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            {item.phone ? (
                                                <span className="flex items-center gap-1"><Phone size={14} className="text-emerald-500" /> {item.phone}</span>
                                            ) : "-"}
                                        </td>
                                        <td className="p-4 text-slate-500 truncate max-w-xs">
                                            {item.address || "-"}
                                        </td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(item.uuid)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="p-6 text-center text-slate-400">Belum ada data pelanggan</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL FORM */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg">{editId ? "Edit Pelanggan" : "Pelanggan Baru"}</h3>
                            <button onClick={() => setShowModal(false)}><X className="text-slate-400 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <input type="text" className="input-field w-full border p-2 rounded" required
                                    placeholder="Contoh: Pak Budi Warteg"
                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor HP (WA)</label>
                                <input type="text" className="input-field w-full border p-2 rounded"
                                    placeholder="0812..."
                                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Alamat</label>
                                <textarea className="input-field w-full border p-2 rounded h-20 resize-none"
                                    placeholder="Alamat lengkap..."
                                    value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2">
                                <Save size={18} /> Simpan Data
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}