import React, { useState, Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { AboutTrustSection } from './sections/AboutTrustSection'
import { AnatomySection } from './sections/AnatomySection'
import { ServicesSection } from './sections/ServicesSection'
import { RepairCasesSection } from './sections/RepairCasesSection'
import { BrandsSection } from './sections/BrandsSection'
import { LocationsSection } from './sections/LocationsSection'
import { FinalCTASection } from './sections/FinalCTASection'
import { Footer } from './components/Footer'
import { useLenis } from './hooks/useLenis'

// Code-split modal so it is only loaded on demand, keeping initial JS payload ultra-lean
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })))

export const App: React.FC = () => {
  // Initialize capability-aware smooth scrolling (active on desktop, native on mobile)
  useLenis()

  // Project inquiry consultation modal state
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleOpenContact = () => setIsContactOpen(true)
  const handleCloseContact = () => setIsContactOpen(false)

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#171615] font-sans antialiased selection:bg-[#64131C] selection:text-white relative">
      {/* Floating Header Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* 1. Typographic & Physical Hero (GAZU Architecture: SUFIYAN [Cutout] KHAN) */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* 2. Architecture & Protocol Reel (Direct DOM Transform, RAF Batched) */}
        <MarqueeSection />

        {/* 3. Philosophy & Standards ("I build systems that survive contact with reality") */}
        <AboutTrustSection onOpenContact={handleOpenContact} />

        {/* 4. Full-Stack System Anatomy (175vh Scroll-Scrubbed Tier Inspection) */}
        <AnatomySection onOpenContact={handleOpenContact} />

        {/* 5. Core Engineering Disciplines (Opposing Draggable Infinite Reels) */}
        <ServicesSection onOpenContact={handleOpenContact} />

        {/* 6. Selected Production Systems & Case Studies (Sticky Scaling Cards) */}
        <RepairCasesSection onOpenContact={handleOpenContact} />

        {/* 7. Production Tech Stack & Ecosystem (Draggable Reel) */}
        <BrandsSection />

        {/* 8. Engineering Track Record & Deployments (Itemized Ledger Cards) */}
        <LocationsSection onOpenContact={handleOpenContact} />

        {/* 9. Final System Architecture Inquiry */}
        <FinalCTASection onOpenContact={handleOpenContact} />
      </main>

      {/* 10. Monograph Colophon Footer */}
      <Footer />

      {/* Engineering Intake Modal (Loaded on demand with zero layout shift) */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
        </Suspense>
      )}
    </div>
  )
}

export default App
