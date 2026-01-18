function CTASection({ onClick }) {
    return (
        <section className="bg-indigo-600 py-20 text-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
                <h2 className="mb-4 text-3xl font-bold">
                    Siap Mengamankan Omzet Bisnis Anda?
                </h2>
                <p className="mb-8 text-indigo-100">
                    Jadwalkan demo dan lihat bagaimana SIPERAK bekerja di bisnis Anda.
                </p>

                <button
                    onClick={onClick}
                    className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                    Jadwalkan Demo
                </button>
            </div>
        </section>
    );
}

export default CTASection;
