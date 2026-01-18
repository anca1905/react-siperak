import { useState } from 'react';
import { User, Lock, Bell, Save, Camera } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulasi simpan data
        setTimeout(() => {
            setLoading(false);
            alert("Pengaturan berhasil disimpan!");
        }, 1000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Pengaturan Akun</h2>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar Menu Settings */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <User size={18} /> Profil Saya
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "security" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <Lock size={18} /> Keamanan
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <Bell size={18} /> Notifikasi
                    </button>
                </div>

                {/* Content Settings */}
                <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

                    {/* TAB 1: PROFIL */}
                    {activeTab === "profile" && (
                        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Informasi Profil</h3>

                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-md">
                                        AS
                                    </div>
                                    <button type="button" className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-sm">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Admin Super</h4>
                                    <p className="text-sm text-slate-500">Super Administrator</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Depan</label>
                                    <input type="text" defaultValue="Admin" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Belakang</label>
                                    <input type="text" defaultValue="Super" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" defaultValue="admin@siperak.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
                                    <input type="tel" defaultValue="081234567890" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                                    {loading ? "Menyimpan..." : <><Save size={18} /> Simpan Perubahan</>}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* TAB 2: KEAMANAN */}
                    {activeTab === "security" && (
                        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Ubah Password</h3>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password Saat Ini</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                                    <input type="password" placeholder="Minimal 8 karakter" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
                                    <input type="password" placeholder="Ulangi password baru" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                                    {loading ? "Menyimpan..." : <><Save size={18} /> Update Password</>}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* TAB 3: NOTIFIKASI */}
                    {activeTab === "notifications" && (
                        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Preferensi Notifikasi</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-slate-800">Notifikasi Email</h4>
                                        <p className="text-sm text-slate-500">Terima ringkasan laporan mingguan via email.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-slate-800">Stok Menipis</h4>
                                        <p className="text-sm text-slate-500">Beri peringatan saat ada barang yang stoknya di bawah batas.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                                    {loading ? "Menyimpan..." : <><Save size={18} /> Simpan Preferensi</>}
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}