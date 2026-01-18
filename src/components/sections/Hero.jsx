export default function Hero({
    badge,
    title,
    highlight,
    description
}) {
    return (
        <header className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    {badge}
                </span>

                <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {title}
                    <br />
                    <span className="text-emerald-600">
                        {highlight}
                    </span>
                </h1>

                <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>

                <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row justify-center gap-4">
                    <a className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold">
                        Jadwalkan Demo
                    </a>
                </div>
            </div>
        </header>
    )
}
