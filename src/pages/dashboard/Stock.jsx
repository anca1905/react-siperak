import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Trash2, Edit, X, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Stock() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: "", price: "", cost_price: "", stock: "", categoryId: ""
    });
    const [editId, setEditId] = useState(null);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return navigate('/login');

            const headers = { Authorization: `Bearer ${token}` };

            const [resProd, resCat] = await Promise.all([
                axios.get("http://localhost:5000/products", { headers }),
                axios.get("http://localhost:5000/categories", { headers })
            ]);

            setProducts(resProd.data);
            setCategories(resCat.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const url = editId
                ? `http://localhost:5000/products/${editId}`
                : "http://localhost:5000/products";

            const method = editId ? "patch" : "post";

            await axios[method](url, form, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Berhasil!");
            setShowModal(false);
            setForm({ name: "", price: "", cost_price: "", stock: "", categoryId: "" });
            setEditId(null);
            fetchData();
        } catch (error) {
            alert("Gagal menyimpan: " + error.response?.data?.msg);
        }
    };

    const handleEdit = (product) => {
        setEditId(product.uuid);
        setForm({
            name: product.name,
            price: product.price,
            cost_price: product.cost_price,
            stock: product.stock,
            categoryId: product.categoryId || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (uuid) => {
        if (!confirm("Hapus barang ini?")) return;
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/products/${uuid}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Stok & Harga</h2>
                    <p className="text-slate-500 text-sm">Kelola inventaris, harga jual, dan modal.</p>
                </div>
                <button
                    onClick={() => {
                        setEditId(null);
                        setForm({ name: "", price: "", cost_price: "", stock: "", categoryId: "" });
                        setShowModal(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                    <Plus size={18} /> Tambah Barang
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari barang..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4">Nama Produk</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Harga Modal (HPP)</th>
                            <th className="p-4">Harga Jual</th>
                            <th className="p-4">Stok</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((item) => (
                            <tr key={item.uuid} className="hover:bg-slate-50">
                                <td className="p-4 font-bold text-slate-700">{item.name}</td>
                                <td className="p-4">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                        {item.category ? item.category.name : "Tanpa Kategori"}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500">Rp {item.cost_price.toLocaleString()}</td>
                                <td className="p-4 text-emerald-600 font-bold">Rp {item.price.toLocaleString()}</td>
                                <td className="p-4">{item.stock}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(item.uuid)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg">{editId ? "Edit Barang" : "Tambah Barang Baru"}</h3>
                            <button onClick={() => setShowModal(false)}><X className="text-slate-400 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Barang</label>
                                <input type="text" className="input-field w-full border p-2 rounded" required
                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-slate-500">Kategori</label>
                                    <select className="input-field w-full border p-2 rounded bg-white"
                                        value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
                                        <option value="">-- Pilih --</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Stok Awal</label>
                                    <input type="number" className="input-field w-full border p-2 rounded" required
                                        value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-red-600">Harga Modal (HPP)</label>
                                    <input type="number" className="input-field w-full border p-2 rounded focus:ring-red-500" required placeholder="0"
                                        value={form.cost_price} onChange={e => setForm({ ...form, cost_price: e.target.value })} />
                                    <p className="text-[10px] text-slate-400 mt-1">Dipakai hitung profit</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-emerald-600">Harga Jual</label>
                                    <input type="number" className="input-field w-full border p-2 rounded focus:ring-emerald-500" required placeholder="0"
                                        value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                </div>
                            </div>

                            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg mt-4 flex justify-center items-center gap-2">
                                <Save size={18} /> Simpan Data
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}