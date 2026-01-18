import { useState } from 'react';
import { Search, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products } from '../../data/products'; // Import data produk

export default function CashierPOS() {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // Filter produk berdasarkan pencarian & kategori
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "Semua" || product.category === selectedCategory)
    );

    // Kategori unik untuk tab filter
    const categories = ["Semua", ...new Set(products.map(p => p.category))];

    // Fungsi Tambah ke Keranjang
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    // Fungsi Kurangi Qty
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item)
                .filter((item) => item.qty > 0) // Hapus jika qty jadi 0
        );
    };

    // Hitung Total
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.11; // PPN 11%
    const total = subtotal + tax;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">

            {/* BAGIAN KIRI: Daftar Produk */}
            <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Header Pencarian & Filter */}
                <div className="p-4 border-b border-slate-100 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tab Kategori */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedCategory === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Produk (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{product.image}</div>
                                <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                                <p className="text-blue-600 font-bold">Rp {product.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BAGIAN KANAN: Keranjang (Cart) */}
            <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
                <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                    <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                        <ShoppingCart size={20} /> Keranjang Belanja
                    </h2>
                </div>

                {/* List Item Keranjang */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <ShoppingCart size={48} className="mb-2 opacity-20" />
                            <p>Keranjang kosong</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div>
                                    <h4 className="font-medium text-slate-800 text-sm">{item.name}</h4>
                                    <p className="text-blue-600 font-bold text-sm">Rp {item.price.toLocaleString()}</p>
                                </div>

                                {/* Kontrol Qty */}
                                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                                    >
                                        {item.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                    </button>
                                    <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="p-1 hover:bg-blue-50 hover:text-blue-500 rounded transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary & Checkout Button */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>PPN (11%)</span>
                        <span>Rp {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-200">
                        <span>Total</span>
                        <span>Rp {total.toLocaleString()}</span>
                    </div>

                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95 mt-2"
                    >
                        Bayar Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}