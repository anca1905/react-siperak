import { useDemoForm } from "../hooks/useDemoForm";
import { submitDemo } from "../services/api";

function DemoModal({ onClose }) {
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Request Demo</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" placeholder="Nama" onChange={handleChange} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <input name="email" placeholder="Email" onChange={handleChange} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <input name="business" placeholder="Nama Bisnis" onChange={handleChange} />
                    {errors.business && <p className="text-red-500 text-sm">{errors.business}</p>}

                    <button
                        type="submit"
                        disabled={loading}                 // 🔒 dikunci saat loading
                        className="w-full bg-indigo-600 text-white py-2 rounded"
                    >
                        {loading ? "Mengirim..." : "Kirim"}  {/* 🔄 teks berubah */}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DemoModal;
