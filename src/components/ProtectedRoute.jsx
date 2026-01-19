import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // 1. Cek apakah ada token di saku (LocalStorage)
    const token = localStorage.getItem("accessToken");

    // 2. Kalau GAK ADA token -> Tendang ke Login
    // 'replace' agar user gak bisa klik Back button browser
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 3. Kalau ADA token -> Silakan masuk (Render halaman tujuan)
    return <Outlet />;
};

export default ProtectedRoute;