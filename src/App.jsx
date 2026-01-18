import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import CashierPOS from './pages/dashboard/CashierPOS';
import Employees from './pages/dashboard/Employees';
import Stock from './pages/dashboard/Stock';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Publik (Landing Page) */}
        <Route path="/" element={<LandingPage />} />

        {/* Route Private (Dashboard) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Halaman Utama Dashboard */}
          <Route index element={<DashboardHome />} />
          <Route path="kasir" element={<CashierPOS />} />
          <Route path="pegawai" element={<Employees />} />
          <Route path="stok" element={<Stock />} />
          <Route path="laporan" element={<Reports />} />
          <Route path="pengaturan" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;