import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Trash2, User, Shield, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "", confPassword: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    // 1. Ambil Data User dari API
    const getEmployees = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:5000/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    // 2. Fungsi Tambah Pegawai (Register)
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                username: formData.username,
                password: formData.password,
                confPassword: formData.confPassword,
                role: "cashier" // Otomatis jadi kasir
            });

            alert("Pegawai Berhasil Ditambahkan!");
            setShowModal(false);
            setFormData({ username: "", password: "", confPassword: "" });
            getEmployees(); // Refresh tabel
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    };

    // 3. Fungsi Hapus Pegawai
    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus pegawai ini? Akses login mereka akan hilang.")) return;

        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://localhost:5000/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getEmployees(); // Refresh tabel
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Manajemen Pegawai</h2>
                    <p className="text-slate-500 text-sm">Kelola akses masuk untuk kasir Anda.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all"
                >
                    <Plus size={18} /> Tambah Kasir
                </button>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold border-b border-slate-200">Username</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Role / Jabatan</th>
                            <th className="p-4 font-semibold border-b border-slate-200 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${emp.role === 'owner' ? 'bg-indigo-600' : 'bg-emerald-500'}`}>
                                        {emp.username.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span className="font-bold text-slate-700">{emp.username}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                        ${emp.role === 'owner' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {emp.role === 'owner' ? <Shield size={12} /> : <User size={12} />}
                                        {emp.role === 'owner' ? "Owner (Pemilik)" : "Cashier (Kasir)"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {emp.role !== 'owner' && (
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                            title="Hapus Pegawai"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL TAMBAH PEGAWAI */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold text-lg">Tambah Kasir Baru</h3>
                            <button onClick={() => setShowModal(false)} className="hover:bg-blue-500 p-1 rounded">✕</button>
                        </div>

                        <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
                            {msg && <p className="bg-red-50 text-red-500 text-sm p-2 rounded">{msg}</p>}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Contoh: kasir_pagi"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="******"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="******"
                                    value={formData.confPassword}
                                    onChange={(e) => setFormData({ ...formData, confPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-2">
                                Simpan Pegawai
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}