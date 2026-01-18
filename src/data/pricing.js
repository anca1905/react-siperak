// src/data/pricing.js
export const pricingPlans = [
    {
        id: 1,
        name: "Starter",
        price: "Rp 0",
        period: "/bulan",
        description: "Untuk tim kecil yang baru memulai evaluasi kinerja.",
        features: [
            "Mencakup 5 Karyawan",
            "Akses Dashboard Basic",
            "Laporan Bulanan",
            "Email Support",
        ],
        isPopular: false,
        buttonText: "Mulai Gratis",
    },
    {
        id: 2,
        name: "Professional",
        price: "Rp 299rb",
        period: "/bulan",
        description: "Solusi lengkap untuk perusahaan berkembang.",
        features: [
            "Mencakup 50 Karyawan",
            "Analisis Kinerja Real-time",
            "Ekspor Laporan (PDF/Excel)",
            "Integrasi API Standar",
            "Prioritas Support 24/7",
        ],
        isPopular: true, // Kita akan highlight ini
        buttonText: "Coba Pro",
    },
    {
        id: 3,
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Untuk organisasi besar dengan kebutuhan spesifik.",
        features: [
            "Unlimited Karyawan",
            "Custom Dashboard & Metrik",
            "Dedicated Account Manager",
            "On-premise Deployment",
            "SLA Jaminan Uptime",
        ],
        isPopular: false,
        buttonText: "Hubungi Sales",
    },
];