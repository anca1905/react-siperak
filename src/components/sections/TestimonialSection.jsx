// src/components/sections/TestimonialSection.jsx
import { testimonials } from "../../data/testimonials";

export default function TestimonialSection() {
    return (
        <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Dipercaya oleh Tim Modern
                    </h2>
                    <p className="text-lg text-slate-400">
                        Dengar langsung pengalaman mereka yang telah meningkatkan produktivitas tim bersama SIPERAK.
                    </p>
                </div>

                {/* Grid Testimoni */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 relative group"
                        >
                            {/* Icon Kutip (Hiasan) */}
                            <div className="absolute top-6 right-8 text-slate-700 text-6xl font-serif opacity-50 group-hover:text-red-900/50 transition-colors">
                                &rdquo;
                            </div>

                            {/* Isi Review */}
                            <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
                                "{item.content}"
                            </p>

                            {/* Profil User */}
                            <div className="flex items-center gap-4">
                                {/* Avatar Inisial */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                    {item.avatar}
                                </div>

                                <div>
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logo/Brand Trust (Opsional - Biar makin meyakinkan) */}
                <div className="mt-16 pt-10 border-t border-slate-800/50 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Kita pakai text aja sebagai placeholder logo perusahaan */}
                    <span className="text-xl font-bold text-slate-400">GojekKW</span>
                    <span className="text-xl font-bold text-slate-400">TokoPediah</span>
                    <span className="text-xl font-bold text-slate-400">TraveLokal</span>
                    <span className="text-xl font-bold text-slate-400">ShopeePayLater</span>
                </div>
            </div>
        </section>
    );
}