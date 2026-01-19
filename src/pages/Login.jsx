import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Tembak API Login Backend
            const response = await axios.post("http://localhost:5000/login", {
                username: username,
                password: password,
            });

            // Simpan Token di LocalStorage (Browser)
            // Ini kuncinya! Token ini nanti dipakai buat ambil data stok/kasir
            localStorage.setItem("accessToken", response.data.accessToken);

            // Redirect ke Dashboard
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg); // Tampilkan pesan error dari backend
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-screen bg-slate-100 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">SIPERAK<span className="text-blue-600">.</span></h1>
                    <p className="text-slate-500 text-sm mt-2">Silakan masuk untuk mengelola bisnis.</p>
                </div>

                <form onSubmit={Auth} className="space-y-6">
                    {msg && <p className="text-center text-red-500 text-sm bg-red-50 p-2 rounded">{msg}</p>}

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-70"
                    >
                        {isLoading ? "Memproses..." : "Masuk Dashboard"}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400">
                    <p>Lupa password? Hubungi tim IT.</p>
                </div>
            </div>
        </section>
    );
};

export default Login;