import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DISCIPLINES_DATA, type ServicePillar } from '../data/portfolioData'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { FadeIn } from '../components/FadeIn'
import { ArrowUpRight, Sparkles, X, CheckCircle2 } from 'lucide-react'

interface ServicesSectionProps {
  onOpenContact: () => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  // State for active discipline detail modal
  const [selectedDiscipline, setSelectedDiscipline] = useState<ServicePillar | null>(null)

  // Listen for Escape key and lock body scroll while modal is active
  useEffect(() => {
    if (!selectedDiscipline) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDiscipline(null)
      }
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedDiscipline])

  // Top Rail: Disciplines 01, 02, 03 continuously moving LEFT -> RIGHT (direction: 'right')
  const topReel = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 26,
    speedMobile: 20,
    gapFallback: 16,
  })

  // Bottom Rail: Disciplines 04, 05, 06 continuously moving RIGHT -> LEFT (direction: 'left')
  const bottomReel = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 22,
    speedMobile: 18,
    gapFallback: 16,
  })

  // Partition the 6 core disciplines into two 3-discipline lanes
  const topDisciplines = DISCIPLINES_DATA.slice(0, 3) // 01, 02, 03
  const bottomDisciplines = DISCIPLINES_DATA.slice(3, 6) // 04, 05, 06

  const topItems = [...topDisciplines, ...topDisciplines]
  const bottomItems = [...bottomDisciplines, ...bottomDisciplines]

  const cardPointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const renderDisciplineCard = (
    discipline: ServicePillar,
    idx: number,
    keyPrefix: string,
    reel: ReturnType<typeof useDraggableInfiniteReel>
  ) => (
    <div
      key={`${keyPrefix}-${discipline.number}-${idx}`}
      className="w-[84vw] sm:w-[420px] md:w-[460px] lg:w-[490px] shrink-0"
    >
      <div
        onPointerDown={(e) => {
          cardPointerDownPos.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={(e) => {
          const dist = Math.hypot(
            e.clientX - cardPointerDownPos.current.x,
            e.clientY - cardPointerDownPos.current.y
          )
          if (dist < 6 && !reel.justDraggedRef.current) {
            setSelectedDiscipline(discipline)
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (reel.justDraggedRef.current) return
          setSelectedDiscipline(discipline)
        }}
        className="group relative rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#171615]/8 hover:border-[#64131C]/30 px-5 py-3.5 sm:px-6 sm:py-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center select-none cursor-pointer"
      >
        {/* Top Row: Number, Title and Direct Action Arrow */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="font-mono text-sm sm:text-base font-black text-[#64131C] shrink-0 tracking-tight">
              {discipline.number}
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-tight text-[#171615] group-hover:text-[#64131C] transition-colors truncate">
              {discipline.title}
            </h3>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#64131C] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Bottom Row: Descriptor & indicator */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] sm:text-[11px] text-[#6E6A64] truncate font-normal leading-tight">
            {discipline.subtitle}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
            title="Core Engineering Capability"
          />
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="disciplines"
      className="relative w-full bg-[#FAF8F5] text-[#171615] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-12 sm:py-16 md:py-20 z-10 overflow-hidden select-none border-t border-[#171615]/8"
      aria-label="Engineering Disciplines"
    >
      {/* =========================================================================
          TOP RAIL: 01 -> 02 -> 03 (Flows continuously LEFT -> RIGHT)
          ========================================================================= */}
      <div
        ref={topReel.viewportRef}
        onPointerDown={topReel.handlePointerDown}
        onPointerMove={topReel.handlePointerMove}
        onPointerUp={topReel.handlePointerUp}
        onPointerCancel={topReel.handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden py-1 sm:py-1.5 ${
          topReel.isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="AI, Backend and Data disciplines reel (Left to Right)"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        <div
          ref={topReel.trackRef}
          className="flex gap-3.5 sm:gap-4 will-change-transform w-max items-stretch"
        >
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'top-set0', topReel))}
          </div>

          <div ref={topReel.singleSetRef} className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch">
            {topItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'top-set1', topReel))}
          </div>

          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'top-set2', topReel))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER HEADING: Framing between opposing reels
          ========================================================================= */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6 sm:py-8 md:py-10 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/8 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-2 sm:mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // ENGINEERING DISCIPLINES</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <h2
            className="text-[#171615] font-black uppercase text-center leading-none tracking-tighter select-none"
            style={{ fontSize: 'clamp(2.9rem, 8.5vw, 114px)' }}
          >
            Disciplines
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={15}>
          <p className="mt-2.5 text-xs sm:text-sm text-[#6E6A64] font-normal max-w-lg mx-auto leading-relaxed">
            From low-level data schemas and backend control planes to local AI reasoning and 120 FPS interaction design.
          </p>
        </FadeIn>

        <div className="mt-4 flex items-center justify-center gap-4 sm:gap-8 text-[11px] font-mono text-[#6E6A64] select-none">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="text-[#64131C] font-bold">01 → 03</span>
            <span>AI · BACKEND · DATA PLATFORMS</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#64131C] font-semibold bg-white px-3 py-0.5 rounded-full border border-[#171615]/10 text-[10px] sm:text-[11px] shadow-sm">
            <span>↔ DRAG REELS TO INSPECT</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span>DESKTOP · CHANGE GRAPHS · CLIENT UI</span>
            <span className="text-[#64131C] font-bold">04 ← 06</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM RAIL: 04 -> 05 -> 06 (Flows continuously RIGHT -> LEFT)
          ========================================================================= */}
      <div
        ref={bottomReel.viewportRef}
        onPointerDown={bottomReel.handlePointerDown}
        onPointerMove={bottomReel.handlePointerMove}
        onPointerUp={bottomReel.handlePointerUp}
        onPointerCancel={bottomReel.handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden py-1 sm:py-1.5 ${
          bottomReel.isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Desktop, System Graph and Client UI disciplines reel (Right to Left)"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        <div
          ref={bottomReel.trackRef}
          className="flex gap-3.5 sm:gap-4 will-change-transform w-max items-stretch"
        >
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'bottom-set0', bottomReel))}
          </div>

          <div ref={bottomReel.singleSetRef} className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch">
            {bottomItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'bottom-set1', bottomReel))}
          </div>

          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((disc, idx) => renderDisciplineCard(disc, idx, 'bottom-set2', bottomReel))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          DISCIPLINE DETAIL POPUP MODAL
          ========================================================================= */}
      <AnimatePresence>
        {selectedDiscipline && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDiscipline(null)}
              className="fixed inset-0 bg-[#171615]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white border border-[#171615]/10 p-6 sm:p-8 shadow-2xl z-10 my-auto text-[#171615] overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#171615]/8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#64131C]">
                    {selectedDiscipline.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#171615]/8 text-[#64131C] font-semibold">
                    {selectedDiscipline.badge}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDiscipline(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#F5F2EA] border border-[#171615]/8 flex items-center justify-center text-[#171615] transition-colors"
                  aria-label="Close discipline details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#171615]">
                  {selectedDiscipline.title}
                </h3>
                <p className="font-mono text-xs text-[#64131C] font-semibold mt-1">
                  {selectedDiscipline.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-[#6E6A64] font-normal leading-relaxed">
                  {selectedDiscipline.description}
                </p>

                <div className="mt-4 pt-4 border-t border-[#171615]/8 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] font-semibold block mb-1">
                    Engineering Invariants &amp; Capabilities:
                  </span>
                  {selectedDiscipline.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#171615]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#64131C] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#171615]/8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDiscipline(null)}
                  className="px-4 py-2 rounded-full border border-[#171615]/15 text-[#6E6A64] hover:text-[#171615] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDiscipline(null)
                    onOpenContact()
                  }}
                  className="px-5 py-2 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <span>Discuss Discipline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ServicesSection
