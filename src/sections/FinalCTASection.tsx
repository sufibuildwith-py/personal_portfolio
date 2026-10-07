import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { ArrowUpRight, Mail, Github, Linkedin, ShieldCheck, CheckCircle2, Sparkles, Terminal } from 'lucide-react'
import { PERSONAL_BRAND } from '../data/portfolioData'

interface FinalCTASectionProps {
  onOpenContact: () => void
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#F5F2EA] text-[#171615] px-5 sm:px-8 md:px-12 py-16 sm:py-24 md:py-28 overflow-hidden border-t border-[#171615]/10"
      aria-label="Contact Sufiyan Khan & Discuss Architecture"
    >
      {/* Subtle warm glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-[#64131C]/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>09 // SYSTEM INQUIRY</span>
          </div>
        </FadeIn>

        {/* Display Headline */}
        <FadeIn delay={0.1} y={30}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#171615] leading-[1.05]">
            HAVE A SYSTEM TO BUILD?{' '}
            <br />
            <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
              let&apos;s talk architecture.
            </span>
          </h2>
        </FadeIn>

        {/* Thesis statement */}
        <FadeIn delay={0.2} y={20}>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-[#171615] font-semibold max-w-2xl leading-relaxed">
            “I build AI systems that survive contact with reality.”
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <p className="mt-2 text-xs sm:text-sm text-[#6E6A64] font-normal max-w-lg">
            Available for forward-deployed engineering, high-reliability backend systems, and governed AI platforms. From schema design to production deployment.
          </p>
        </FadeIn>

        {/* Action Buttons */}
        <FadeIn delay={0.4} y={30} className="mt-10 sm:mt-12 w-full flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onOpenContact}
            className="px-8 py-3.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center gap-2.5"
          >
            <span>Start Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={`mailto:${PERSONAL_BRAND.email}`}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#171615]/10 text-[#171615] font-semibold uppercase tracking-wider text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Mail className="w-4 h-4 text-[#64131C]" />
            <span>Email Directly</span>
          </a>

          <a
            href={PERSONAL_BRAND.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#171615]/10 text-[#171615] font-semibold uppercase tracking-wider text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>

          <a
            href={PERSONAL_BRAND.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#171615]/10 text-[#171615] font-semibold uppercase tracking-wider text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>LinkedIn</span>
          </a>
        </FadeIn>

        {/* Reassurance Guarantees */}
        <FadeIn delay={0.5} y={20} className="mt-14 sm:mt-18 pt-8 border-t border-[#171615]/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-[#6E6A64]">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Production-Grade Architecture</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#64131C] shrink-0" />
            <span>Deterministic Guardrails</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-[#171615] shrink-0" />
            <span>End-to-End Ownership (DB → AI → UI)</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default FinalCTASection
