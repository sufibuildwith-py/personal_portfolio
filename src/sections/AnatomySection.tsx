import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ANATOMY_LAYERS } from '../data/portfolioData'
import { CheckCircle2, Layers, ShieldCheck, Terminal } from 'lucide-react'

interface AnatomySectionProps {
  onOpenContact: () => void
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({ onOpenContact }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isManualClickRef = useRef<boolean>(false)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  // Tightened 125vh scroll container eliminating dead whitespace while preserving scrubber physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Automatic scroll-driven progression through all 6 architecture layers
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isManualClickRef.current) return
    const calculatedIndex = Math.min(
      ANATOMY_LAYERS.length - 1,
      Math.max(0, Math.floor(latest * ANATOMY_LAYERS.length))
    )
    setActiveIndex(calculatedIndex)
  })

  // Manual click on horizontal navigation rail with smooth lock
  const handleSelectLayer = (index: number) => {
    setActiveIndex(index)
    isManualClickRef.current = true
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false
    }, 1000)
  }

  const activeLayer = ANATOMY_LAYERS[activeIndex] || ANATOMY_LAYERS[0]

  return (
    <section
      id="anatomy"
      ref={containerRef}
      className="relative w-full bg-[#F5F2EA] text-[#171615] border-t border-[#171615]/10 h-[125vh] select-none"
      aria-label="Full-Stack System Architecture Specification"
    >
      {/* Sticky Compact Architectural Specification Sheet Viewport */}
      <div className="sticky top-16 sm:top-20 z-10 w-full px-4 sm:px-8 md:px-12 py-5 sm:py-6 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          {/* 1. Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#171615]/10">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#171615]/10 text-[11px] font-mono uppercase tracking-widest text-[#64131C] font-semibold shadow-sm">
                <Layers className="w-3 h-3" />
                <span>04 // ARCHITECTURAL SPECIFICATION</span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#171615]">
                FROM PERSISTENCE SE{' '}
                <span className="font-serif italic font-normal text-[#64131C] lowercase">
                  interface tak.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#6E6A64]">
              <span className="hidden md:inline-block">SCROLL TO INSPECT TIERS</span>
              <span className="text-[#64131C] font-bold">
                0{activeIndex + 1} / 0{ANATOMY_LAYERS.length}
              </span>
            </div>
          </div>

          {/* 2. Horizontal Navigation Rail */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none select-none">
            {ANATOMY_LAYERS.map((layer, idx) => {
              const isSelected = idx === activeIndex
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleSelectLayer(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#171615] text-[#FAF8F5] border-[#171615] shadow-sm'
                      : 'bg-white/80 border-[#171615]/10 text-[#6E6A64] hover:border-[#171615]/25 hover:text-[#171615]'
                  }`}
                >
                  <span className={`font-bold ${isSelected ? 'text-[#FAF8F5]' : 'text-[#64131C]'}`}>
                    {layer.number}
                  </span>
                  <span className="font-semibold">{layer.name.split(' ')[0]}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* 3. Architectural Specification Sheet */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#171615]/10 p-5 sm:p-7 md:p-8 shadow-[0_12px_36px_-10px_rgba(23,22,21,0.06)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
              {/* Specification Meta Column */}
              <div className="lg:col-span-5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#171615]/8 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#171615]/8">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#64131C] font-bold">
                          TIER {activeLayer.number} // {activeLayer.layerTag}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-[#6E6A64]">
                        <Terminal className="w-3.5 h-3.5 text-[#171615]" />
                        <span>SPECIFICATION CONTRACT</span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#171615] mt-1 leading-tight">
                        {activeLayer.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
                      <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deterministic Boundary</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#171615]">
                        SUFIYAN KHAN
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Technical Information Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#171615] leading-tight">
                          {activeLayer.name}
                        </h3>
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Active Standard</span>
                        </span>
                      </div>

                      <p className="font-mono text-xs text-[#64131C] font-semibold mt-0.5">
                        {activeLayer.tagline}
                      </p>

                      <p className="mt-2 text-xs sm:text-sm text-[#6E6A64] font-normal leading-relaxed">
                        {activeLayer.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-[#171615]/8">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-semibold block mb-1.5">
                          Architectural Invariants &amp; Implementation:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {activeLayer.technicalDetails.map((detail, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#171615]/8 text-[11px] font-mono text-[#171615] flex items-start gap-1.5"
                            >
                              <span className="text-[#64131C] font-bold">›</span>
                              <span className="leading-tight">{detail}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#171615]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                        <span className="truncate">Guarantee: {activeLayer.guarantee}</span>
                      </div>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 shrink-0"
                      >
                        <span>Discuss Architecture</span>
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnatomySection
