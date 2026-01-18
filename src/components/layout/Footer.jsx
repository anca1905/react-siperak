// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            SIPERAK<span className="text-red-500">.</span>
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Platform evaluasi kinerja yang dirancang untuk mempermudah monitoring dan transparansi data secara real-time.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Produk</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#fitur" className="hover:text-red-500 transition-colors">Fitur Utama</a></li>
                            <li><a href="#harga" className="hover:text-red-500 transition-colors">Harga & Paket</a></li>
                            <li><a href="#integrasi" className="hover:text-red-500 transition-colors">Integrasi API</a></li>
                            <li><a href="#changelog" className="hover:text-red-500 transition-colors">Pembaruan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Perusahaan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#tentang" className="hover:text-red-500 transition-colors">Tentang Kami</a></li>
                            <li><a href="#karir" className="hover:text-red-500 transition-colors">Karir</a></li>
                            <li><a href="#blog" className="hover:text-red-500 transition-colors">Blog</a></li>
                            <li><a href="#kontak" className="hover:text-red-500 transition-colors">Hubungi Kami</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S1.2 13 4 8c-3-2-2.3-5-1-5 3.2 0 9.1 2.3 12.5 4.5C18.4 6 22 4 22 4z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {currentYear} Siperak Inc. Hak cipta dilindungi.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;