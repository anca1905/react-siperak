import { useEffect } from 'react';
import { useDemoForm } from "../hooks/useDemoForm";
import { submitDemo } from "../services/api";

function DemoModal({ onClose }) {
    // 1. KITA PAKAI LOGIC ASLIMU DI SINI
    const {
        form,
        errors,
        loading,
        setLoading,
        handleChange,
        validate,
    } = useDemoForm();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);              // 🔄 mulai loading
        await submitDemo(form);        // ⏳ tunggu API
        setLoading(false);             // ✅ selesai

        alert("Request demo terkirim!");
        onClose();
    }

    // Tambahan: Menutup modal dengan tombol ESC (UX yang baik)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // 2. TAPI KITA BUNGKUS DENGAN DESAIN BARU (BIRU & TENGAH)
    return (
        // Overlay Gelap & Fixed Position (Supaya di tengah dan di atas segalanya)
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">

            {/* Kotak Modal Putih */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()} // Supaya klik di dalam kotak tidak menutup modal
            >
                {/* Header Modal (Biru) */}
                <div className="bg-blue-600 p-6 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-blue-100 hover:text-white hover:bg-blue-500/50 rounded-full p-1 transition-colors"
                    >
                        {/* Icon X */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h3 className="text-2xl font-bold text-white mb-1">Request Demo</h3>
                    <p className="text-blue-100 text-sm">Isi data bisnis Anda di bawah ini</p>
                </div>

                {/* Form Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Input Nama */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                            <input
                                name="name"
                                value={form.name || ''} // Pastikan tidak error uncontrolled input
                                onChange={handleChange}
                                placeholder="Cth: Budi Santoso"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                name="email"
                                value={form.email || ''}
                                onChange={handleChange}
                                placeholder="nama@email.com"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Input Business */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Bisnis</label>
                            <input
                                name="business"
                                value={form.business || ''}
                                onChange={handleChange}
                                placeholder="Cth: Kopi Kenangan"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.business ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                            />
                            {errors.business && <p className="text-red-500 text-xs mt-1">{errors.business}</p>}
                        </div>

                        {/* Tombol Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mengirim...
                                </>
                            ) : "Kirim Request"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default DemoModal;