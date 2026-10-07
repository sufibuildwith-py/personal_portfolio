import React from 'react'
import { WORK_HISTORY } from '../data/portfolioData'
import { FadeIn } from '../components/FadeIn'
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, ArrowUpRight } from 'lucide-react'

interface LocationsSectionProps {
  onOpenContact?: () => void
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#FAF8F5] text-[#171615] px-5 sm:px-8 md:px-12 py-16 sm:py-24 overflow-hidden border-t border-[#171615]/8"
      aria-label="Engineering Work History and Production Deployments"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header (Tightened, zero dead vertical space) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-[#171615]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3 shadow-2xs">
              <Briefcase className="w-3.5 h-3.5" />
              <span>08 // REAL SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#171615] leading-[1.06]">
              REAL SYSTEMS.{' '}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                production track record.
              </span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-sm font-bold uppercase tracking-tight text-[#171615]">
              “Engineered for real operational realities.”
            </p>
            <p className="text-xs sm:text-sm text-[#6E6A64] font-normal mt-1 leading-relaxed">
              Verifiable freelance and internship engagements shipping software that runs in live production environments.
            </p>
          </div>
        </div>

        {/* Vertical Engineering Ledger (Sitting directly on Canvas with Hairlines) */}
        <div className="divide-y divide-[#171615]/10">
          {WORK_HISTORY.map((exp, idx) => (
            <FadeIn
              key={exp.number}
              delay={idx * 0.08}
              y={20}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start hover:bg-white/50 transition-colors duration-200 px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-2xl"
            >
              {/* Left Column (4 cols): Number, Period, Organization & Role */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#64131C] tracking-wider">
                    {exp.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64]">
                    ENGAGEMENT ARCHIVE
                  </span>
                  <div className="ml-auto lg:hidden inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Shipped</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#171615] leading-tight">
                  {exp.organization}
                </h3>

                <div className="text-sm sm:text-base font-semibold text-[#64131C]">
                  {exp.role}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#6E6A64] mt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#64131C]" />
                    <span>{exp.period}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#171615]" />
                    <span>{exp.location}</span>
                  </span>
                </div>

                <div className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full w-max mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="uppercase font-semibold tracking-wider">{exp.verifiedBadge}</span>
                </div>
              </div>

              {/* Center Column (5 cols): Operational Summary & Deliverables */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-semibold block mb-1">
                    OPERATIONAL MANDATE:
                  </span>
                  <p className="text-xs sm:text-sm text-[#171615] font-normal leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#171615]/8 flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-semibold">
                    KEY DELIVERABLES &amp; INVARIANTS:
                  </span>
                  {exp.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#171615]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#64131C] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (3 cols): Technologies Ledger & Direct Discussion */}
              <div className="lg:col-span-3 flex flex-col justify-between h-full gap-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-semibold block mb-2">
                    TECHNOLOGIES SHIPPED:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.split(',').map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#171615]/10 text-[11px] font-mono text-[#171615]"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#171615]/8 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#6E6A64]">
                    <Terminal className="w-3.5 h-3.5 text-[#171615]" />
                    <span>Production Ledger</span>
                  </div>

                  {onOpenContact && (
                    <button
                      onClick={onOpenContact}
                      className="text-[#64131C] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Discuss</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Colophon Strip */}
        <div className="mt-8 pt-6 border-t border-[#171615]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6A64]">
          <div>
            <span>PROVENANCE: VERIFIABLE CLIENT &amp; INTERNSHIP PRODUCTION ARTIFACTS</span>
          </div>
          <div>
            <span>NO PLACEHOLDERS · ZERO FABRICATED EXPERIENCE</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationsSection
