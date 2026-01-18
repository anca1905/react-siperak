export default function Hero({
    badge,
    title,
    highlight,
    description,
    onOpenModal // Pastikan props ini diterima jika tombolnya perlu membuka modal
}) {
    return (
        <header className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Badge kecil di atas */}
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    {badge}
                </span>

                <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {title}
                    <br />
                    {/* Ubah highlight jadi Biru */}
                    <span className="text-blue-600">
                        {highlight}
                    </span>
                </h1>

                <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>

                <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* Ubah tombol jadi Biru */}
                    <button
                        onClick={onOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/30"
                    >
                        Jadwalkan Demo
                    </button>
                </div>
            </div>
        </header>
    )
}