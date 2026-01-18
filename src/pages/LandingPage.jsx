import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Perhatikan jalur import mundur satu langkah (../)
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ProblemSection from '../components/sections/ProblemSection';
import SolutionSection from '../components/sections/SolutionSection';
import PricingSection from '../components/sections/PricingSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/layout/Footer';
import DemoModal from '../components/DemoModal';
import ScrollToTop from '../components/ui/ScrollToTop';

function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            <main>
                <Hero onOpenModal={() => setIsModalOpen(true)}
                    badge="Untuk Cafe, Billiard & Retail"
                    title="Amankan Omzet Bisnis Anda."
                    highlight="Tutup Celah Kebocoran Kas."
                    description="Sistem kasir dan operasional yang dirancang khusus untuk owner yang tidak bisa 24 jam di lokasi."
                />
                <ProblemSection />
                <SolutionSection />
                <PricingSection />
                <TestimonialSection />
                <FAQSection />
                <CTASection onClick={() => setIsModalOpen(true)} />
            </main>
            <Footer onOpenModal={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <DemoModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <ScrollToTop />
        </div>
    )
}

export default LandingPage;