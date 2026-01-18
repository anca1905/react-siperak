import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import ProblemSection from './components/sections/ProblemSection'
import SolutionSection from './components/sections/SolutionSection'
import CTASection from './components/sections/CTASection'
import Footer from './components/layout/Footer'
import DemoModal from './components/DemoModal'
import { useState } from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <CTASection onClick={() => setIsModalOpen(true)} />
      </main>
      <Footer />

      {isModalOpen && (
        <DemoModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App