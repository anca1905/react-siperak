import { useState } from 'react';

export default function Navbar({ onOpenModal }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fungsi helper untuk menutup menu saat link diklik
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                {/* LOGO */}
                <div className="flex items-center gap-2 font-bold text-2xl text-slate-900 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-md">
                        {/* Icon Shield (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.746 3.746 0 0121 12z" />
                        </svg>
                    </div>
                    SIPERAK<span className="text-red-600">.</span>
                </div>

                {/* DESKTOP MENU (Hidden on Mobile) */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 items-center">
                    <a href="#masalah" className="hover:text-red-600 transition-colors">Masalah Umum</a>
                    <a href="#solusi" className="hover:text-red-600 transition-colors">Fitur</a>
                    <a href="#harga" className="hover:text-red-600 transition-colors">Harga</a>

                    {/* CTA Button */}
                    <button
                        onClick={onOpenModal}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
                    >
                        Jadwalkan Demo
                    </button>
                </div>

                {/* MOBILE MENU TOGGLE (Hamburger) */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        /* Icon X (Close) */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        /* Icon Hamburger (Menu) */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {/* Logic: Hanya render jika isMenuOpen === true */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl flex flex-col p-6 space-y-4 animate-in slide-in-from-top-5 duration-200">
                    <a href="#masalah" onClick={handleLinkClick} className="text-lg font-medium text-slate-600 hover:text-red-600">Masalah Umum</a>
                    <a href="#solusi" onClick={handleLinkClick} className="text-lg font-medium text-slate-600 hover:text-red-600">Fitur & Solusi</a>
                    <a href="#harga" onClick={handleLinkClick} className="text-lg font-medium text-slate-600 hover:text-red-600">Paket Harga</a>
                    <hr className="border-slate-100" />
                    <button
                        onClick={() => {
                            handleLinkClick();
                            onOpenModal();
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-center font-bold shadow-md"
                    >
                        Hubungi Sales
                    </button>
                </div>
            )}
        </nav>
    )
}