# SIPERAK - Sistem Penilaian Kinerja Karyawan

![SIPERAK Dashboard](https://img.shields.io/badge/Status-Development-blue) ![License](https://img.shields.io/badge/License-MIT-green)

SIPERAK adalah aplikasi berbasis web modern untuk membantu pemilik bisnis memantau kinerja karyawan, mengelola stok barang, dan melakukan transaksi kasir (POS) secara real-time.

## 🚀 Fitur Unggulan

- **Landing Page Modern**: Desain responsif dengan animasi smooth (AOS).
- **Dashboard Admin**:
  - **Kasir (POS)**: Transaksi cepat dengan fitur keranjang belanja.
  - **Manajemen Stok**: Indikator warna otomatis (Aman/Menipis/Habis).
  - **Data Pegawai**: Monitoring status dan rating kinerja tim.
  - **Laporan Grafik**: Analisis omzet dan tren penjualan visual (Recharts).
- **Multi-Layout**: Pemisahan jelas antara halaman publik dan area admin.

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM v6
- **Charts**: Recharts
- **Animations**: AOS (Animate On Scroll)

## 📦 Cara Menjalankan Project

Ikuti langkah-langkah ini untuk menjalankan SIPERAK di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/siperak.git](https://github.com/username/siperak.git)
    cd siperak
    ```

2.  **Install Dependencies**
    Pastikan Node.js sudah terinstall.
    ```bash
    npm install
    ```

3.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

4.  **Buka di Browser**
    Kunjungi `http://localhost:5173`

## 📂 Struktur Folder

```text
src/
├── components/
│   ├── layout/       # Sidebar, Header, Navbar, Footer
│   ├── sections/     # Bagian-bagian Landing Page (Hero, Pricing, etc)
│   └── ui/           # Komponen kecil (Button, Input, ScrollToTop)
├── data/             # Data dummy (JSON) untuk simulasi backend
├── pages/
│   ├── dashboard/    # Halaman Admin (Kasir, Stok, Laporan, dll)
│   └── LandingPage.jsx
└── App.jsx           # Routing Utama