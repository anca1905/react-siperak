export default function CTASection({ onClick }) {
    return (
        <section className="py-24 bg-blue-600 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 data-aos="fade-up" className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Siap Meningkatkan Kinerja Tim?
                </h2>
                <p data-aos="fade-up" data-aos-delay="100" className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Bergabunglah dengan ribuan manajer yang telah beralih ke cara monitoring modern. Coba gratis sekarang.
                </p>

                <div data-aos="fade-up" data-aos-delay="200">
                    <button
                        onClick={onClick}
                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all transform hover:-translate-y-1 hover:shadow-black/20"
                    >
                        Mulai Uji Coba Gratis
                    </button>
                    <p className="mt-4 text-sm text-blue-200 opacity-80">
                        Tanpa kartu kredit • Batalkan kapan saja
                    </p>
                </div>
            </div>
        </section>
    )
}