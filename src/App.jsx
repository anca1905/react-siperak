import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import CashierPOS from './pages/dashboard/CashierPOS';
import Employees from './pages/dashboard/Employees';
import Stock from './pages/dashboard/Stock';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';
import Categories from './pages/dashboard/Categories';
import ProfitLoss from './pages/dashboard/ProfitLoss';
import Customers from './pages/dashboard/Customers';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="kasir" element={<CashierPOS />} />
            <Route path="pegawai" element={<Employees />} />
            <Route path="stok" element={<Stock />} />
            <Route path="laporan" element={<Reports />} />
            <Route path="pengaturan" element={<Settings />} />
            <Route path="kategori" element={<Categories />} />
            <Route path="laporan" element={<ProfitLoss />} />
            <Route path="pelanggan" element={<Customers />} />
          </Route>
        </Route>
      </Routes>
    </Router >
  );
}

export default App;