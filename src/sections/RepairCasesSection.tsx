import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { Github, ExternalLink, Code2, ArrowRight } from 'lucide-react'

export const RepairCasesSection: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact: _onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      id="systems"
      className="relative w-full bg-[#F5F2EA] text-[#171615] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 z-20 px-4 sm:px-8 md:px-12 pt-20 sm:pt-28 pb-32 border-t border-[#171615]/10"
      aria-label="Engineered Systems and Production Case Studies"
    >
      {/* Editorial Section Header */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3 shadow-sm">
            <Code2 className="w-3.5 h-3.5" />
            <span>06 // SELECTED WORK</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={25}>
          <h2
            className="text-[#171615] font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 108px)' }}
          >
            Systems Built
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={15}>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#6E6A64] font-normal max-w-xl mx-auto">
            Editorial case studies of production systems engineered with deterministic boundaries, resilient backends, and evidence-grounded AI.
          </p>
        </FadeIn>
      </div>

      {/* Case Studies Stacking Container */}
      <div className="max-w-6xl mx-auto w-full relative">
        {/* =========================================================================
            01 / SA COMMAND — FLAGSHIP CASE STUDY
            ========================================================================= */}
        <CaseCardWrapper
          index={0}
          totalCards={4}
          progress={scrollYProgress}
          range={[0, 1]}
          targetScale={1 - 3 * 0.03}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header: Large 01 + Title + Context Tag */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#171615]/10">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-3xl sm:text-5xl font-black text-[#64131C] tracking-tighter">
                    01
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615]">
                    SA COMMAND
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64] block">
                    OPERATIONS INFRASTRUCTURE · SA PRODUCTIONS / VARANASI · SEP 2026 — PRESENT
                  </span>
                </div>
              </div>

              {/* Large Supporting Statement */}
              <p className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-[#171615] mt-5 sm:mt-6 leading-snug">
                “Operations infrastructure for an active production company.”
              </p>

              {/* Large Editorial Split: Left Context vs Right Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-6 pt-5 border-t border-[#171615]/8">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-2">
                    01 // PROBLEM &amp; OPERATIONAL CONTEXT
                  </span>
                  <p className="text-xs sm:text-sm text-[#171615] font-normal leading-relaxed">
                    Production company operations were fractured across disconnected spreadsheets, unstructured WhatsApp call-sheets, manual paper ledgers, and verbal equipment commitments. The lack of a single operational truth caused crew scheduling collisions, isolated call times, and lost financial context across complex production runs.
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#64131C] font-bold block mb-2">
                    02 // ARCHITECTURE &amp; EXECUTION
                  </span>
                  <p className="text-xs sm:text-sm text-[#171615] font-normal leading-relaxed">
                    Designed and built SA Command, a private operations platform unifying people, productions, crew scheduling, double-entry finance, GST billing, and an offline local-AI core (EVE). Engineered the Spring Boot / PostgreSQL backend and React / Tauri desktop client with concurrency-safe gear reservations and commercial reconciliation.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Catalogue Annotations (Sitting directly on canvas with hairline rules) */}
            <div className="mt-8 pt-5 border-t border-[#171615]/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-2.5">
                TECHNICAL EVIDENCE &amp; INVARIANTS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs font-mono text-[#171615]">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#64131C] font-bold">STACK:</span>
                  <span>JAVA 21</span> · <span>SPRING BOOT</span> · <span>POSTGRESQL</span> · <span>TAURI 2</span> · <span>REACT</span> · <span>EXPO / REACT NATIVE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#64131C] font-bold">SYSTEMS:</span>
                  <span>EVE / LOCAL AI</span> · <span>2-STAGE QWEN RERANKER</span> · <span>30M VEIL SESSION GRANTS</span> · <span>STOMP WEBSOCKETS</span> · <span>DOUBLE-ENTRY FINANCE</span> · <span>GST BILLING</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-[#171615]/8 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-800 font-medium">
                  ✓ Concurrency-safe gear lock · 30m cryptographic session grants
                </span>
                <a
                  href="https://github.com/sufibuildwith-py/sa-controlcentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Codebase</span>
                </a>
              </div>
            </div>
          </div>
        </CaseCardWrapper>

        {/* =========================================================================
            02 / SENTINEL — PRINCIPLE & GOVERNANCE COMPOSITION
            ========================================================================= */}
        <CaseCardWrapper
          index={1}
          totalCards={4}
          progress={scrollYProgress}
          range={[0.25, 1]}
          targetScale={1 - 2 * 0.03}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header: Large 02 + Title + Context Tag */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#171615]/10">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-3xl sm:text-5xl font-black text-[#64131C] tracking-tighter">
                    02
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615]">
                    SENTINEL
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64] block">
                    GOVERNED REVENUE RECOVERY · RAZORPAY TEST MODE · 2026
                  </span>
                </div>
              </div>

              {/* Central Typographic Centerpiece */}
              <div className="my-5 sm:my-6 py-4 sm:py-5 border-y border-[#171615]/10 flex flex-col items-center text-center">
                <div className="font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#171615] leading-tight space-y-0.5">
                  <div>AI PROPOSES.</div>
                  <div className="text-[#6E6A64]">EVIDENCE SUPPORTS.</div>
                  <div className="text-[#64131C]">POLICY DECIDES.</div>
                  <div className="text-[#6E6A64]">TOOLS EXECUTE.</div>
                  <div>OUTCOMES TEACH.</div>
                </div>
              </div>

              {/* Architecture Flow Strip */}
              <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-mono uppercase tracking-wider text-[#171615] my-4">
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">Gemini / RAG</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64131C]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">Evidence</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64131C]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10 text-[#64131C] font-bold">Deterministic Policy</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64131C]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">Safety Governor</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64131C]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">Execution</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64131C]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">Outcome</span>
              </div>
            </div>

            {/* Technical Proof Row */}
            <div className="mt-4 pt-4 border-t border-[#171615]/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-2">
                DETERMINISTIC VERIFICATION &amp; TECHNICAL PROOF:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                  <span className="font-bold text-[#171615] block">10,000+</span>
                  <span className="text-[10px] text-[#6E6A64]">BENCHMARK CASES</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                  <span className="font-bold text-emerald-800 block">8 / 8</span>
                  <span className="text-[10px] text-[#6E6A64]">SAFETY GATES</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                  <span className="font-bold text-[#171615] block">IDEMPOTENT</span>
                  <span className="text-[10px] text-[#6E6A64]">PAYMENT LINKS</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                  <span className="font-bold text-[#171615] block">RAW-BYTE HMAC</span>
                  <span className="text-[10px] text-[#6E6A64]">SIGNED WEBHOOKS</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8 col-span-2 sm:col-span-1">
                  <span className="font-bold text-[#171615] block">EXACTLY-ONCE</span>
                  <span className="text-[10px] text-[#6E6A64]">RECONCILIATION</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-[#171615]/8 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-800 font-medium">
                  ✓ Validated against 10,000+ deterministic cases · Zero duplicate payments
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/sufibuildwith-py/Sentinel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F5F2EA] border border-[#171615]/10 text-[#171615] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                  <a
                    href="https://sentinelxops.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CaseCardWrapper>

        {/* =========================================================================
            03 / GUIDEIN — TECHNICAL ARCHIVE COMPOSITION
            ========================================================================= */}
        <CaseCardWrapper
          index={2}
          totalCards={4}
          progress={scrollYProgress}
          range={[0.5, 1]}
          targetScale={1 - 1 * 0.03}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header: Large 03 + Title + Context Tag */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#171615]/10">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-3xl sm:text-5xl font-black text-[#64131C] tracking-tighter">
                    03
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615]">
                    GUIDEIN
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64] block">
                    CHANGE INTELLIGENCE CONTROL PLANE · 2024 — PRESENT
                  </span>
                </div>
              </div>

              {/* Verified Metrics as Large Typographic Anchors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-5 sm:my-6 py-4 border-y border-[#171615]/10 text-center">
                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#171615] block tracking-tight">
                    189 / 189
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    TESTS PASSED
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#64131C] block tracking-tight">
                    2,132
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    EXPECTED EDGES
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-emerald-800 block tracking-tight">
                    100%
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    EDGE RECALL
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-emerald-800 block tracking-tight">
                    0
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    FALSE EDGES
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#171615] block tracking-tight">
                    50,000
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    GRAPH NODES
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#171615] block tracking-tight">
                    250,000
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6A64] mt-0.5 block">
                    GRAPH EDGES
                  </span>
                </div>
              </div>

              {/* Architectural Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm text-[#171615] leading-relaxed">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                    DETERMINISTIC SYSTEM GRAPH
                  </span>
                  <p>
                    Rebuilt GuideIn into an evidence-governed system for deciding whether software changes are safe to ship. Constructs a deterministic System Graph for change impact and evidence, proving blast radius before code enters production.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                    HMAC INGRESS &amp; TRANSACTIONAL OUTBOX
                  </span>
                  <p>
                    Ingests GitHub webhook events via raw-byte HMAC verification, stores durable delivery receipts, and processes tasks via a transactional outbox/jobs pattern with PostgreSQL 18 Row Level Security (FORCE RLS).
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-5 pt-3 border-t border-[#171615]/8 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Validated graph scalability up to 50k nodes and 250k edges · Zero false trusted edges
              </span>
              <a
                href="https://github.com/sufibuildwith-py/GuideIn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Inspect Repository</span>
              </a>
            </div>
          </div>
        </CaseCardWrapper>

        {/* =========================================================================
            04 / OFFLINE DOCUMENT ADVISOR — DOCUMENT INDEX COMPOSITION
            ========================================================================= */}
        <CaseCardWrapper
          index={3}
          totalCards={4}
          progress={scrollYProgress}
          range={[0.75, 1]}
          targetScale={1}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header: Large 04 + Title + Context Tag */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#171615]/10">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-3xl sm:text-5xl font-black text-[#64131C] tracking-tighter">
                    04
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615]">
                    OFFLINE DOCUMENT ADVISOR
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64] block">
                    IDEAL WEB SOLUTIONS · DESKTOP TOOLING · AUG 2026 — PRESENT
                  </span>
                </div>
              </div>

              {/* Horizontal Editorial Document Index */}
              <div className="my-5 py-4 border-y border-[#171615]/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-2 text-center">
                  SUPPORTED DOCUMENT SPECIFICATIONS:
                </span>
                <div className="flex items-center justify-around flex-wrap gap-3 font-mono text-sm sm:text-base font-black uppercase text-[#171615] tracking-widest">
                  <span className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">AADHAAR</span>
                  <span className="text-[#64131C]">·</span>
                  <span className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">PAN</span>
                  <span className="text-[#64131C]">·</span>
                  <span className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">VOTER ID</span>
                  <span className="text-[#64131C]">·</span>
                  <span className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#171615]/10">PASSPORT</span>
                </div>
              </div>

              {/* Processing Pipeline Specs */}
              <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-mono text-[#6E6A64] my-3">
                <span className="px-2.5 py-1 rounded border border-[#171615]/10 bg-[#FAF8F5]">ENGLISH / HINDI OCR</span>
                <span>→</span>
                <span className="px-2.5 py-1 rounded border border-[#171615]/10 bg-[#FAF8F5]">PDF RASTERIZATION</span>
                <span>→</span>
                <span className="px-2.5 py-1 rounded border border-[#171615]/10 bg-[#FAF8F5]">DOCUMENT-SPECIFIC PARSERS</span>
                <span>→</span>
                <span className="px-2.5 py-1 rounded border border-[#171615]/10 bg-[#FAF8F5]">MRZ EXTRACTION</span>
              </div>

              {/* Key Reliability Story Statement */}
              <div className="mt-5 p-4 rounded-xl bg-[#FAF8F5] border border-[#171615]/10 text-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#64131C] font-bold block">
                  KEY RELIABILITY STORY //
                </span>
                <h4 className="font-black text-base sm:text-xl md:text-2xl uppercase tracking-tight text-[#171615] mt-1">
                  SELF-CONTAINED WINDOWS RUNTIME
                </h4>
                <div className="flex items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-[#6E6A64] mt-2 font-bold">
                  <span>NO NODE</span>
                  <span>·</span>
                  <span>NO NPM</span>
                  <span>·</span>
                  <span>NO INTERNET</span>
                </div>
                <p className="text-xs text-[#6E6A64] max-w-xl mx-auto mt-2 leading-relaxed">
                  Resolved packaged-app worker-path failures and made the installer self-contained, eliminating external runtime dependencies on employee PCs. Automatically cross-verifies extracted fields, flags mismatches, and exports a review-ready Excel workflow.
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-5 pt-3 border-t border-[#171615]/8 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Production deployed at Ideal Web Solutions · Zero cloud API dependence
              </span>
              <a
                href="https://github.com/sufibuildwith-py/OCR---Offline-Docs-Application"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </CaseCardWrapper>
      </div>
    </section>
  )
}

const CaseCardWrapper: React.FC<{
  children: React.ReactNode
  index: number
  totalCards: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}> = ({ children, index, progress, range, targetScale }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[580px] max-h-[820px] flex items-center justify-center sticky top-20 sm:top-24"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 20}px`,
        }}
        className="relative w-full max-w-6xl rounded-[28px] sm:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(23,22,21,0.06)] origin-top overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default RepairCasesSection
