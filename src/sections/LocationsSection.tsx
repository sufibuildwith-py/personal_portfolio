import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { WORK_HISTORY } from '../data/portfolioData'
import { FadeIn } from '../components/FadeIn'
import { Briefcase, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react'

interface LocationsSectionProps {
  onOpenContact?: () => void
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full bg-[#FAF8F5] text-[#171615] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 md:px-10 lg:px-12 pt-20 sm:pt-28 pb-32 border-t border-[#171615]/8"
      aria-label="Engineering Work History and Production Track Record"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>08 // REAL SYSTEMS</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={25}>
          <h2
            className="text-[#171615] font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(2.5rem, 7.5vw, 96px)' }}
          >
            Production Track Record
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={15}>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#6E6A64] font-normal max-w-xl mx-auto leading-relaxed">
            Verifiable freelance and internship engagements shipping software that survives contact with real operational realities.
          </p>
        </FadeIn>
      </div>

      {/* Overlapping Sticky Cards Stacking Container */}
      <div className="max-w-5xl mx-auto w-full relative space-y-8 lg:space-y-0">
        {WORK_HISTORY.map((exp, idx) => (
          <ExperienceCardWrapper
            key={exp.number}
            index={idx}
            totalCards={WORK_HISTORY.length}
            progress={scrollYProgress}
            range={[idx / WORK_HISTORY.length, 1]}
            targetScale={1 - (WORK_HISTORY.length - 1 - idx) * 0.03}
          >
            <div className="flex flex-col justify-between h-full w-full">
              {/* Header: Number + Organization + Period */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10">
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
                      {exp.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#171615]">
                      {exp.organization}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#171615]">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Subheader: Role + Location + Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-[#64131C] uppercase tracking-wide">
                      {exp.role}
                    </span>
                    <span className="text-[#171615]/20 hidden sm:inline">·</span>
                    <span className="flex items-center gap-1 text-xs font-mono text-[#6E6A64]">
                      <MapPin className="w-3.5 h-3.5 text-[#171615]" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="font-semibold uppercase tracking-wider">{exp.verifiedBadge}</span>
                  </div>
                </div>

                {/* Operational Mandate & Key Deliverables */}
                <div className="my-3.5 sm:my-5 py-3.5 sm:py-4 border-y border-[#171615]/8 space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-1">
                      OPERATIONAL MANDATE:
                    </span>
                    <p className="text-xs sm:text-sm text-[#171615] leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-1.5">
                      KEY DELIVERABLES &amp; INVARIANTS:
                    </span>
                    <div className="space-y-1.5">
                      {exp.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#171615]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#64131C] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Shipped & Discussion CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#171615]/8">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#6E6A64] font-bold mr-1">
                    STACK:
                  </span>
                  {exp.stack.split(',').map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#171615]/10 text-[10px] sm:text-[11px] font-mono text-[#171615]"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {onOpenContact && (
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="px-3.5 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Discuss Architecture</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </ExperienceCardWrapper>
        ))}
      </div>

      {/* Bottom Colophon Strip */}
      <div className="max-w-5xl mx-auto mt-12 sm:mt-16 pt-6 border-t border-[#171615]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6A64]">
        <div>
          <span>PROVENANCE: VERIFIABLE CLIENT &amp; INTERNSHIP PRODUCTION ARTIFACTS</span>
        </div>
        <div>
          <span>NO PLACEHOLDERS · ZERO FABRICATED EXPERIENCE</span>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   STICKY EXPERIENCE CARD WRAPPER
   Overlapping sticky sheet stack shared with Section 06
   ------------------------------------------------------------------------- */
const ExperienceCardWrapper: React.FC<{
  children: React.ReactNode
  index: number
  totalCards: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}> = ({ children, index, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      className="min-h-0 h-auto lg:h-[72vh] lg:min-h-[490px] lg:max-h-[620px] flex items-center justify-center sticky top-20 sm:top-24 mb-6 lg:mb-0"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 16}px`,
        }}
        className="relative w-full max-w-5xl rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-9 shadow-[0_20px_50px_-15px_rgba(23,22,21,0.06)] origin-top overflow-hidden flex flex-col justify-between"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default LocationsSection
