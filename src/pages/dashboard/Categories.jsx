import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Tag, Loader2 } from 'lucide-react';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getCategories = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("https://alecia-decem-matha.ngrok-free.dev/categories", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCategory) return;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post("http://localhost:5000/categories", { name: newCategory }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewCategory("");
            getCategories();
        } catch (error) {
            alert("Gagal menambah kategori");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (uuid) => {
        if (!confirm("Hapus kategori ini?")) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://localhost:5000/categories/${uuid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getCategories();
        } catch (error) {
            alert("Gagal menghapus");
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                    <Tag size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Kategori Barang</h2>
                    <p className="text-slate-500 text-sm">Kelompokkan produkmu (Makanan, Minuman, Jasa, dll).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
                    <h3 className="font-bold text-slate-800 mb-4">Tambah Baru</h3>
                    <form onSubmit={handleAdd}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kategori</label>
                        <input
                            type="text"
                            placeholder="Contoh: Kopi"
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button
                            disabled={isSubmitting}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                            Simpan
                        </button>
                    </form>
                </div>

                <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 font-semibold text-slate-700">
                        Daftar Kategori ({categories.length})
                    </div>

                    {loading ? (
                        <div className="p-8 text-center"><Loader2 className="animate-spin inline text-emerald-500" /></div>
                    ) : categories.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">Belum ada kategori.</div>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <li key={cat.uuid} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                    <span className="font-medium text-slate-800">{cat.name}</span>
                                    <button
                                        onClick={() => handleDelete(cat.uuid)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}