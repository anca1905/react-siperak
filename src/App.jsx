import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";
import SolutionSection from "./components/sections/SolutionSection";
import CTASection from "./components/sections/CTASection";
import DemoModal from "./components/DemoModal";

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div className="bg-slate-50 text-slate-800 font-['Inter']">
      <Navbar />
      <Hero
        badge="Untuk Cafe, Billiard & Retail"
        title="Amankan Omzet Bisnis Anda."
        highlight="Tutup Celah Kebocoran Kas."
        description="Sistem kasir dan operasional yang dirancang khusus untuk owner yang tidak bisa 24 jam di lokasi."
      />
      <ProblemSection />
      <SolutionSection />
      <CTASection onClick={() => setIsDemoOpen(true)} />

      {isDemoOpen && (
        <DemoModal onClose={() => setIsDemoOpen(false)} />
      )}
    </div>
  )
}

export default App
