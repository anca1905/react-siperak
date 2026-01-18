export default function Navbar() {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded flex items-center justify-center">
                        <i className="ph ph-shield-check text-xl"></i>
                    </div>
                    SIPERAK
                </div>

                <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                    <a href="#masalah">Masalah Umum</a>
                    <a href="#solusi">Fitur Keamanan</a>
                    <a href="#harga">Paket Harga</a>
                </div>

                <a
                    href="#kontak"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-bold transition"
                >
                    Hubungi Sales
                </a>
            </div>
        </nav>
    )
}
