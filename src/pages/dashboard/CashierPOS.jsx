import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, Plus, Minus, ShoppingCart, Loader2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CashierPOS() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]); // <--- State Pelanggan
    const [selectedCustomer, setSelectedCustomer] = useState(""); // <--- Pilihan User
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    // 1. Ambil Produk DAN Pelanggan sekaligus
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return navigate('/login');
                const headers = { Authorization: `Bearer ${token}` };

                const [resProd, resCust] = await Promise.all([
                    axios.get("http://localhost:5000/products", { headers }),
                    axios.get("http://localhost:5000/customers", { headers })
                ]);

                setProducts(resProd.data);
                setCustomers(resCust.data);
            } catch (error) {
                console.error("Gagal ambil data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // ... (Fungsi filteredProducts, addToCart, decreaseQty biarkan sama) ...
    // ... Paste ulang aja function-nya kalau ragu, atau biarkan kalau tidak diubah ...

    // Filter Produk
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
        const currentInCart = cart.find(item => item.productId === product.id)?.qty || 0;
        if (product.stock - currentInCart <= 0) {
            alert("Stok habis!"); return;
        }
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === product.id);
            if (existing) {
                return prev.map((item) => item.productId === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { productId: product.id, name: product.name, price: product.price, qty: 1 }];
        });
    };

    const decreaseQty = (productId) => {
        setCart((prev) => prev.map((item) => item.productId === productId ? { ...item, qty: item.qty - 1 } : item).filter((item) => item.qty > 0));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = subtotal; // Kita skip pajak dulu biar simpel

    // --- UPDATE FUNGSI BAYAR ---
    const handleCheckout = async () => {
        if (!confirm(`Total Rp ${total.toLocaleString()}. Proses?`)) return;
        setIsProcessing(true);
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post("http://localhost:5000/transactions", {
                total: total,
                cart: cart,
                customerId: selectedCustomer || null // <--- KIRIM ID PELANGGAN
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Transaksi Berhasil! ✅");
            setCart([]);
            setSelectedCustomer(""); // Reset pilihan

            // Refresh stok
            const res = await axios.get("http://localhost:5000/products", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data);

        } catch (error) {
            alert("Gagal: " + (error.response?.data?.msg || "Server Error"));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">

            {/* KIRI: Daftar Produk (SAMA SEPERTI SEBELUMNYA) */}
            <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text" placeholder="Cari produk..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    {isLoading ? <div className="text-center p-10"><Loader2 className="animate-spin inline" /></div> : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} onClick={() => addToCart(product)}
                                    className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 transition-all flex flex-col items-center text-center group ${product.stock > 0 ? 'cursor-pointer hover:border-blue-300' : 'opacity-50 cursor-not-allowed'}`}>
                                    <div className="text-4xl mb-3">📦</div>
                                    <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-blue-600 font-bold">Rp {product.price.toLocaleString()}</p>
                                    <p className="text-xs text-slate-400">Stok: {product.stock}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* KANAN: Keranjang & Pelanggan */}
            <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">

                {/* 🔥 UPDATE: PILIH PELANGGAN */}
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Pelanggan</label>
                    <div className="relative">
                        <select
                            className="w-full p-2 pl-9 bg-white border border-slate-300 rounded-lg text-sm appearance-none outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                        >
                            <option value="">-- Pelanggan Umum --</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.phone || '-'})</option>
                            ))}
                        </select>
                        <User size={16} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                        <ShoppingCart size={20} /> Keranjang
                    </h2>
                </div>

                {/* List Item */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <ShoppingCart size={48} className="mb-2 opacity-20" />
                            <p>Keranjang kosong</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.productId} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div>
                                    <h4 className="font-medium text-slate-800 text-sm w-32 truncate">{item.name}</h4>
                                    <p className="text-blue-600 font-bold text-sm">Rp {item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-md border border-slate-200">
                                    <button onClick={() => decreaseQty(item.productId)} className="p-1 hover:text-red-500"><Minus size={14} /></button>
                                    <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                                    <button onClick={() => addToCart({ id: item.productId })} className="p-1 hover:text-blue-500"><Plus size={14} /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Total & Bayar */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl space-y-3">
                    <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-200">
                        <span>Total</span>
                        <span>Rp {total.toLocaleString()}</span>
                    </div>
                    <button onClick={handleCheckout} disabled={cart.length === 0 || isProcessing}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2">
                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Bayar Sekarang"}
                    </button>
                </div>
            </div>
        </div>
    );
}