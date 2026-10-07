import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import {
  Github,
  ExternalLink,
  Code2,
  ShieldCheck,
  Lock,
  Workflow,
  Sparkles
} from 'lucide-react'

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
      className="relative w-full bg-[#F5F2EA] text-[#171615] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 md:px-10 lg:px-12 pt-20 sm:pt-28 pb-32 border-t border-[#171615]/10"
      aria-label="Engineered Systems and Production Case Studies"
    >
      {/* Editorial Section Header */}
      <div className="max-w-6xl mx-auto mb-14 sm:mb-20 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3 shadow-2xs">
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
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#6E6A64] font-normal max-w-2xl mx-auto leading-relaxed">
            Architectural monographs of production systems engineered with deterministic boundaries, resilient backends, and evidence-grounded AI.
          </p>
        </FadeIn>
      </div>

      {/* Case Studies Stacking Container */}
      <div className="max-w-7xl mx-auto w-full relative space-y-10 lg:space-y-0">
        {/* =========================================================================
            01 / SA COMMAND — FLAGSHIP CASE STUDY
            ========================================================================= */}
        <CaseCardWrapper
          index={0}
          totalCards={4}
          progress={scrollYProgress}
          range={[0, 1]}
          targetScale={1 - 3 * 0.025}
        >
          <SACommandCard />
        </CaseCardWrapper>

        {/* =========================================================================
            02 / SENTINEL — PRINCIPLE & GOVERNANCE COMPOSITION
            ========================================================================= */}
        <CaseCardWrapper
          index={1}
          totalCards={4}
          progress={scrollYProgress}
          range={[0.25, 1]}
          targetScale={1 - 2 * 0.025}
        >
          <SentinelCard />
        </CaseCardWrapper>

        {/* =========================================================================
            03 / GUIDEIN — TECHNICAL ARCHIVE COMPOSITION
            ========================================================================= */}
        <CaseCardWrapper
          index={2}
          totalCards={4}
          progress={scrollYProgress}
          range={[0.5, 1]}
          targetScale={1 - 1 * 0.025}
        >
          <GuideInCard />
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
          <OfflineDocumentAdvisorCard />
        </CaseCardWrapper>
      </div>

      {/* =========================================================================
          05 / LAPTOP CARE — SECONDARY COMMERCIAL CASE STUDY MONOGRAPH
          ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full mt-20 sm:mt-28">
        <LaptopCareShowcase />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   STICKY CARD WRAPPER
   On desktop (lg): Sticky stacking presentation with subtle Framer Motion scale
   On mobile (<lg): Fluid natural document flow with full height and zero clipping
   ------------------------------------------------------------------------- */
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
      className="min-h-0 h-auto lg:h-[88vh] lg:min-h-[660px] lg:max-h-[860px] flex items-center justify-center lg:sticky lg:top-24 mb-8 lg:mb-0"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 16}px`,
        }}
        className="relative w-full max-w-7xl rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-[0_20px_50px_-15px_rgba(23,22,21,0.06)] origin-top overflow-hidden flex flex-col justify-between"
      >
        {children}
      </motion.div>
    </div>
  )
}

/* =========================================================================
   CASE 01: SA COMMAND
   ========================================================================= */
const SACommandCard: React.FC = () => {
  const [activeView, setActiveView] = useState<'arena' | 'philosophy' | 'deck'>('arena')

  const views = {
    arena: {
      image: '/projects/sa-command-hero.webp',
      caption: 'Fig 1.1 — Arena Live Production: Real-time lighting staging, STOMP crew telemetry & equipment lock.',
      badge: 'ARENA STAGE // LIVE RUN',
    },
    philosophy: {
      image: '/projects/sa-command-editorial.webp',
      caption: 'Fig 1.2 — Production Philosophy: Editorial typography and sound system clarity protocols.',
      badge: 'SOUND PHILOSOPHY',
    },
    deck: {
      image: '/projects/sa-command-gallery.webp',
      caption: 'Fig 1.3 — Selected Executions: Multi-city event staging ledger and equipment reservations.',
      badge: 'EVENT LEDGER',
    },
  }

  const current = views[activeView]

  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            01
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            SA COMMAND
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          OPERATIONS INFRASTRUCTURE · SA PRODUCTIONS / VARANASI · SEP 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering (Mobile: Image First -> Text; Desktop: Text Left -> Image Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 xl:gap-10 items-stretch mt-4 sm:mt-5 flex-1">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
          <div className="rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-sm flex flex-col h-full justify-between">
            {/* macOS Editorial Window Chrome */}
            <div className="px-3.5 py-2 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[10px] text-[#6E6A64] tracking-wider uppercase hidden sm:inline">
                  sa-command.internal // STOMP: CONNECTED
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveView('arena')}
                  className={`px-2.5 py-0.5 rounded transition-all ${
                    activeView === 'arena'
                      ? 'bg-[#171615] text-white font-bold'
                      : 'bg-white/60 text-[#6E6A64] hover:text-[#171615]'
                  }`}
                >
                  01 Arena
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('philosophy')}
                  className={`px-2.5 py-0.5 rounded transition-all ${
                    activeView === 'philosophy'
                      ? 'bg-[#171615] text-white font-bold'
                      : 'bg-white/60 text-[#6E6A64] hover:text-[#171615]'
                  }`}
                >
                  02 Philosophy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('deck')}
                  className={`px-2.5 py-0.5 rounded transition-all ${
                    activeView === 'deck'
                      ? 'bg-[#171615] text-white font-bold'
                      : 'bg-white/60 text-[#6E6A64] hover:text-[#171615]'
                  }`}
                >
                  03 Deck
                </button>
              </div>
            </div>

            {/* Primary Screenshot Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group">
              <img
                src={current.image}
                alt="SA Command production interface"
                width={1897}
                height={986}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#171615]/80 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-[#FAF8F5] border border-white/10">
                {current.badge}
              </div>
            </div>

            {/* Editorial Caption Bar */}
            <div className="px-3.5 py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
              <span className="truncate pr-2">{current.caption}</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">PROD ARTIFACT</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Editorial pull quote */}
            <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “Operations infrastructure for an active production company.”
            </p>

            {/* Context & Architecture Ledger */}
            <div className="space-y-3.5 mt-3.5 pt-3.5 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-1">
                  01 // PROBLEM &amp; OPERATIONAL CONTEXT
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Operations were fractured across disconnected spreadsheets, unstructured WhatsApp call-sheets, manual paper ledgers, and verbal equipment commitments. The lack of single truth caused crew collisions and lost financial context.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                  02 // ARCHITECTURE &amp; EXECUTION
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Engineered SA Command: a private platform unifying crew scheduling, double-entry finance, GST billing, and an offline local-AI core (EVE). Built Spring Boot / PostgreSQL backend and React / Tauri 2 desktop client with concurrency-safe gear reservations.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Invariants & Stack */}
          <div className="mt-4 pt-3.5 border-t border-[#171615]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-[#64131C] font-bold block text-[10px]">BACKEND &amp; CLIENT:</span>
                <span className="text-[#171615]">Java 21 · Spring Boot · PostgreSQL 16 · Tauri 2 · React · Expo</span>
              </div>
              <div>
                <span className="text-[#64131C] font-bold block text-[10px]">GOVERNANCE &amp; INVARIANTS:</span>
                <span className="text-[#171615]">EVE Local AI · 2-Stage Qwen Reranker · 30m Veil Sessions · WebSockets</span>
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Concurrency-safe gear lock · 30m cryptographic session grants
              </span>
              <a
                href="https://github.com/sufibuildwith-py/sa-controlcentre"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Inspect Codebase</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   CASE 02: SENTINEL
   ========================================================================= */
const SentinelCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'console' | 'architecture'>('console')

  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            02
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            SENTINEL
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          GOVERNED REVENUE RECOVERY · RAZORPAY TEST MODE · 2026
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 xl:gap-10 items-stretch mt-4 sm:mt-5 flex-1">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
          <div className="rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-sm flex flex-col h-full justify-between">
            {/* Editorial Chrome & Tab Switcher */}
            <div className="px-3.5 py-2 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[10px] text-[#6E6A64] tracking-wider uppercase hidden sm:inline">
                  sentinel.recovery // INCIDENT #7B47C4EE
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('console')}
                  className={`px-2.5 py-0.5 rounded transition-all ${
                    activeTab === 'console'
                      ? 'bg-[#171615] text-white font-bold'
                      : 'bg-white/60 text-[#6E6A64] hover:text-[#171615]'
                  }`}
                >
                  01 Incident Console
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('architecture')}
                  className={`px-2.5 py-0.5 rounded transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-[#171615] text-white font-bold'
                      : 'bg-white/60 text-[#6E6A64] hover:text-[#171615]'
                  }`}
                >
                  02 Truth Boundary Flow
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            {activeTab === 'console' ? (
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group">
                <img
                  src="/projects/sentinel-console.webp"
                  alt="Sentinel live revenue recovery incident console"
                  width={1887}
                  height={997}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono uppercase tracking-widest">
                  POLICY: APPROVED · RECOVERED
                </div>
              </div>
            ) : (
              /* Native SVG Architectural Truth Boundary Diagram */
              <div className="aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#FAF8F5] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden">
                {/* Layer 1: AI Reasoning */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#171615]/10 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#6E6A64] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      STAGE 01 // AI INVESTIGATION &amp; HYPOTHESIS
                    </span>
                    <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      GEMINI 1.5 + HISTORICAL RAG
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#171615]">
                    Correlates telemetry clusters → Analyzes failure codes → Proposes bounded recovery plan.
                  </p>
                </div>

                {/* Truth Boundary Dividing Gate */}
                <div className="relative my-1.5 sm:my-2 py-1 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-[#64131C]/40" />
                  </div>
                  <div className="relative px-3 py-1 rounded-full bg-[#64131C] text-[#FAF8F5] font-mono text-[9px] uppercase tracking-widest font-black shadow-sm flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>TRUTH BOUNDARY // DETERMINISTIC SAFETY GOVERNOR</span>
                  </div>
                </div>

                {/* Layer 2: Deterministic Policy Gates */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center font-mono text-[10px]">
                  <div className="p-1.5 sm:p-2 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block">GATE 01</span>
                    <span className="text-[9px] text-[#6E6A64]">Idempotency Lock</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block">GATE 02</span>
                    <span className="text-[9px] text-[#6E6A64]">Max ₹ Threshold</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block">GATE 03</span>
                    <span className="text-[9px] text-[#6E6A64]">State Transition</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block">GATE 04</span>
                    <span className="text-[9px] text-[#6E6A64]">Blast Radius Rate</span>
                  </div>
                </div>

                {/* Layer 3: Execution & Signed Reconciliation */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#171615]/10 shadow-2xs mt-1 sm:mt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#6E6A64] font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      STAGE 03 // EXECUTION &amp; RECONCILIATION
                    </span>
                    <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      EXACTLY-ONCE JOURNAL
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#171615]">
                    Razorpay Test API link generation → Raw-Byte HMAC signature verification → Immutable ledger settlement.
                  </p>
                </div>
              </div>
            )}

            {/* Editorial Caption Bar */}
            <div className="px-3.5 py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
              <span className="truncate pr-2">
                {activeTab === 'console'
                  ? 'Fig 2.1 — Live Incident 7B47C4EE recovery execution with verified evidence ledger.'
                  : 'Fig 2.2 — Architectural Truth Boundary separating generative reasoning from financial execution.'}
              </span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">GOVERNED SPEC</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Central Typographic Centerpiece */}
            <div className="my-2.5 sm:my-3.5 py-2.5 border-y border-[#171615]/10 flex flex-col items-center text-center">
              <div className="font-black text-xs sm:text-sm md:text-base uppercase tracking-wider text-[#171615] leading-snug space-y-0.5">
                <div>AI PROPOSES.</div>
                <div className="text-[#6E6A64]">EVIDENCE SUPPORTS.</div>
                <div className="text-[#64131C]">POLICY DECIDES.</div>
                <div className="text-[#6E6A64]">TOOLS EXECUTE.</div>
                <div>OUTCOMES TEACH.</div>
              </div>
            </div>

            {/* Context & Architecture Split */}
            <div className="space-y-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: PAYMENT FAILURE LEAKAGE
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Payment failure clusters leak SaaS revenue. Unattended retries create duplicate charges and trigger chargeback penalties. Raw generative AI cannot be safely granted financial execution authority.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: GOVERNED SAFETY GATES
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Gemini agents investigate failure clusters using historical RAG evidence, while an independent deterministic policy governor enforces 8/8 safety gates before executing idempotent Razorpay test transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Deterministic Verification Ledger */}
          <div className="mt-3.5 pt-3 border-t border-[#171615]/10">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center text-xs font-mono">
              <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">10,000+</span>
                <span className="text-[9px] text-[#6E6A64]">BENCHMARKS</span>
              </div>
              <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-emerald-800 block text-xs sm:text-sm">8 / 8</span>
                <span className="text-[9px] text-[#6E6A64]">SAFETY GATES</span>
              </div>
              <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">IDEMPOTENT</span>
                <span className="text-[9px] text-[#6E6A64]">PAYMENT LINKS</span>
              </div>
              <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">RAW HMAC</span>
                <span className="text-[9px] text-[#6E6A64]">SIGNED HOOKS</span>
              </div>
              <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8 col-span-3 sm:col-span-1">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">EXACTLY-1</span>
                <span className="text-[9px] text-[#6E6A64]">RECONCILED</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-mono text-emerald-800 font-medium">
                ✓ 10,000+ deterministic cases · Zero duplicate payments
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/sufibuildwith-py/Sentinel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F5F2EA] border border-[#171615]/10 text-[#171615] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
                <a
                  href="https://sentinelxops.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   CASE 03: GUIDEIN
   ========================================================================= */
const GuideInCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            03
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            GUIDEIN
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          CHANGE INTELLIGENCE CONTROL PLANE · 2024 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 xl:gap-10 items-stretch mt-4 sm:mt-5 flex-1">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
          <div className="rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-sm flex flex-col h-full justify-between">
            {/* Chrome Bar */}
            <div className="px-3.5 py-2 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  guidein.controlplane // SYSTEM GRAPH v18.4
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-white text-[9px] font-mono uppercase tracking-widest text-[#64131C] font-bold border border-[#171615]/10">
                100% RECALL PROVEN
              </div>
            </div>

            {/* Native SVG / Editorial System Graph Visual */}
            <div className="aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#FAF8F5] p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden">
              {/* Pipeline Step Sequence */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 text-center font-mono text-[10px]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[9px]">INGRESS</span>
                  <span className="font-bold text-[#171615]">GitHub Hook</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[9px]">HMAC GATE</span>
                  <span className="font-bold text-[#64131C]">Raw-Byte Verify</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[9px]">PERSISTENCE</span>
                  <span className="font-bold text-[#171615]">Outbox &amp; RLS</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[9px]">TOPOLOGY</span>
                  <span className="font-bold text-[#171615]">System Graph</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 border border-emerald-300 shadow-2xs col-span-3 sm:col-span-1">
                  <span className="text-emerald-700 block text-[9px]">DECISION</span>
                  <span className="font-bold text-emerald-900">Safe To Ship</span>
                </div>
              </div>

              {/* Central Graph Network Visual */}
              <div className="my-2 p-3 sm:p-3.5 rounded-xl bg-white border border-[#171615]/10 relative shadow-2xs flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2 border-b border-[#171615]/8 pb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#64131C] font-bold flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5" />
                    DETERMINISTIC DEPENDENCY BLAST-RADIUS ENGINE
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    BLAST RADIUS: CONSTRAINED
                  </span>
                </div>

                {/* Connected Entity Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono text-[#171615]">
                  <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[9px]">SERVICE NODE</span>
                    <span className="font-bold">auth-router.ts</span>
                    <span className="text-emerald-700 block text-[9px] mt-0.5">✓ 0 side-effects</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[9px]">API CONTRACT</span>
                    <span className="font-bold">/v1/charge-token</span>
                    <span className="text-emerald-700 block text-[9px] mt-0.5">✓ Backward-compat</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[9px]">SCHEMA</span>
                    <span className="font-bold">V18_outbox</span>
                    <span className="text-emerald-700 block text-[9px] mt-0.5">✓ RLS verified</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[9px]">EDGE INTEGRITY</span>
                    <span className="font-bold">2,132 Edges</span>
                    <span className="text-emerald-700 block text-[9px] mt-0.5">✓ 100% Recall</span>
                  </div>
                </div>
              </div>

              {/* Bottom Invariant Banner */}
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#171615]">
                  <strong className="text-[#64131C]">INVARIANT:</strong> PostgreSQL 18 FORCE RLS prevents cross-tenant graph leakage.
                </span>
                <span className="text-[#6E6A64] hidden sm:inline">ZERO EVENT LOSS OUTBOX</span>
              </div>
            </div>

            {/* Caption Bar */}
            <div className="px-3.5 py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
              <span className="truncate pr-2">Fig 3.1 — Deterministic dependency graph mapping code symbol blast radius before production release.</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">CONTROL PLANE</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Large Editorial Statement */}
            <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “Evidence-governed control plane for deciding software change safety.”
            </p>

            {/* Verified Metrics Display Block */}
            <div className="grid grid-cols-3 gap-2 my-3 sm:my-3.5 py-2.5 border-y border-[#171615]/10 text-center">
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-[#171615] block tracking-tight">
                  189 / 189
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  TESTS PASSED
                </span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-[#64131C] block tracking-tight">
                  2,132
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  EXPECTED EDGES
                </span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-emerald-800 block tracking-tight">
                  100%
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  EDGE RECALL
                </span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-emerald-800 block tracking-tight">
                  0
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  FALSE EDGES
                </span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-[#171615] block tracking-tight">
                  50,000
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  NODES TESTED
                </span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-xl font-black text-[#171615] block tracking-tight">
                  250,000
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  GRAPH EDGES
                </span>
              </div>
            </div>

            {/* Context & Architecture */}
            <div className="space-y-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: BLIND CODE SHIPMENTS
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  High-risk code changes ship without clear proof of downstream impact. Teams lack deterministic visibility into what services, endpoints, or relational schemas will break before deployment.
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: DETERMINISTIC GRAPH
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Ingests GitHub webhook events via raw-byte HMAC verification, executes via transactional outbox, and constructs a deterministic System Graph with PostgreSQL 18 Row Level Security (FORCE RLS).
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-4 pt-3 border-t border-[#171615]/10 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-mono text-emerald-800 font-medium">
              ✓ Validated scalability to 50k nodes &amp; 250k edges · 0 false edges
            </span>
            <a
              href="https://github.com/sufibuildwith-py/GuideIn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect Repository</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   CASE 04: OFFLINE DOCUMENT ADVISOR
   ========================================================================= */
const OfflineDocumentAdvisorCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            04
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            OFFLINE DOC ADVISOR
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          IDEAL WEB SOLUTIONS · DESKTOP TOOLING · AUG 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 xl:gap-10 items-stretch mt-4 sm:mt-5 flex-1">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
          <div className="rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-sm flex flex-col h-full justify-between">
            {/* Chrome Bar */}
            <div className="px-3.5 py-2 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  doc-advisor.desktop // LOCAL RUNTIME
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-bold border border-emerald-300">
                100% AIR-GAPPED
              </div>
            </div>

            {/* Visual Document Pipeline Monograph */}
            <div className="aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#FAF8F5] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden">
              {/* Document Index Cards */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-1.5 text-center">
                  SUPPORTED IDENTITY SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-center text-xs">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block">AADHAAR</span>
                    <span className="text-[9px] text-[#6E6A64]">UIDAI QR &amp; Pattern</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block">PAN</span>
                    <span className="text-[9px] text-[#6E6A64]">Alphanumeric Regex</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block">VOTER ID</span>
                    <span className="text-[9px] text-[#6E6A64]">EPIC Validation</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block">PASSPORT</span>
                    <span className="text-[9px] text-[#64131C] font-bold">MRZ ICAO 9303</span>
                  </div>
                </div>
              </div>

              {/* Offline Execution Pipeline Flow */}
              <div className="my-1.5 sm:my-2 p-2.5 sm:p-3 rounded-xl bg-white border border-[#171615]/10 shadow-2xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#64131C] font-bold block mb-1.5">
                  DESKTOP OCR PROCESSING PIPELINE //
                </span>
                <div className="flex items-center justify-between flex-wrap gap-1 text-[10px] font-mono text-[#171615]">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">PDF Rasterization</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">Sharp Deskew</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8 font-bold">Tesseract Eng/Hin</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">Discrepancy Check</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">XLSX Export</span>
                </div>
              </div>

              {/* Key Invariant Callout */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#171615]/10 shadow-2xs">
                <div className="flex items-center justify-between font-mono text-[10px] mb-0.5">
                  <span className="font-bold text-[#64131C]">KEY RELIABILITY STORY //</span>
                  <span className="text-[#6E6A64]">ZERO EMPLOYEE PC PREREQUISITES</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#171615] font-black">
                  <span>NO NODE.JS</span>
                  <span className="text-[#64131C]">·</span>
                  <span>NO NPM</span>
                  <span className="text-[#64131C]">·</span>
                  <span>NO INTERNET</span>
                  <span className="text-[#64131C]">·</span>
                  <span className="text-emerald-800">100% AIR-GAPPED</span>
                </div>
                <p className="text-[11px] text-[#6E6A64] mt-0.5 leading-snug">
                  Packaged native workers overcome path failures in client Windows installers, eliminating external runtime dependencies.
                </p>
              </div>
            </div>

            {/* Caption Bar */}
            <div className="px-3.5 py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
              <span className="truncate pr-2">Fig 4.1 — Self-contained bilingual OCR extraction pipeline with local discrepancy verification.</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">LOCAL RUNTIME</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Large Editorial Statement */}
            <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “100% offline identity verification desktop tooling for high-volume operations.”
            </p>

            {/* Context & Architecture */}
            <div className="space-y-3 mt-3.5 pt-3 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: MANUAL WHATSAPP VERIFICATION
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Client employees manually verified thousands of identity documents received over WhatsApp. Cloud OCR introduced latency, recurring API costs, and severe customer privacy liability.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: SELF-CONTAINED LOCAL OCR
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Shipped an offline Windows desktop app bundling English/Hindi models, PDF rasterization, document-specific parsers, and MRZ passport extraction. Overcame packaged-app worker-path failures for a self-contained runtime.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Technical Evidence */}
          <div className="mt-4 pt-3.5 border-t border-[#171615]/10">
            <div className="text-xs font-mono text-[#171615] flex flex-wrap gap-2">
              <span className="text-[#64131C] font-bold">STACK:</span>
              <span>Electron · TypeScript · Node.js · Tesseract.js · Sharp · PDF.js · ExcelJS</span>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Production deployed at Ideal Web Solutions · Zero cloud API dependence
              </span>
              <a
                href="https://github.com/sufibuildwith-py/OCR---Offline-Docs-Application"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   CASE 05: LAPTOP CARE (SECONDARY COMMERCIAL CASE STUDY MONOGRAPH)
   ========================================================================= */
const LaptopCareShowcase: React.FC = () => {
  return (
    <div className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-9 lg:p-11 shadow-[0_20px_50px_-15px_rgba(23,22,21,0.06)] overflow-hidden">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 sm:pb-5 border-b border-[#171615]/10">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            05
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            LAPTOP CARE
          </h3>
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          HARDWARE DIAGNOSTIC LAB PLATFORM · KANPUR &amp; PRAYAGRAJ · OCT 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering (Mobile: Image First -> Text; Desktop: Text Left -> Image Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mt-6 sm:mt-8 items-center">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-sm flex flex-col">
            {/* macOS Chrome Header */}
            <div className="px-3.5 py-2 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  laptopcare.service // HARDWARE LAB ONLINE
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-white text-[9px] font-mono uppercase tracking-widest text-[#171615] font-bold border border-[#171615]/10">
                LIVE PRODUCTION
              </div>
            </div>

            {/* Platform Screenshot */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group">
              <img
                src="/projects/laptopcare-platform.webp"
                alt="Laptop Care live production diagnostic platform"
                width={1905}
                height={983}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#171615]/80 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-[#FAF8F5] border border-white/10">
                3D DIAGNOSTIC INTAKE
              </div>
            </div>

            {/* Editorial Caption Bar */}
            <div className="px-3.5 py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[11px] font-mono text-[#6E6A64]">
              <span className="truncate pr-2">
                Fig 5.1 — Laptop Care 3D hardware diagnostic intake and live customer repair tracking platform.
              </span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">COMMERCIAL DEPLOY</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <p className="text-base sm:text-xl font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “High-performance hardware diagnostic lab &amp; customer repair tracking ledger.”
            </p>

            <div className="space-y-4 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-1">
                  01 // PROBLEM: OPAQUE HARDWARE SERVICE
                </span>
                <p className="text-xs sm:text-sm text-[#171615] leading-relaxed">
                  Independent diagnostic labs in Kanpur and Prayagraj process hundreds of motherboard and chip-level repairs monthly. Customers suffer from ambiguous diagnostic quotes, lost repair tickets, and lack of component provenance.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                  02 // ARCHITECTURE: 60-120 FPS DIRECT-DOM PLATFORM
                </span>
                <p className="text-xs sm:text-sm text-[#171615] leading-relaxed">
                  Engineered and deployed a production web platform featuring 3D hardware diagnostics, interactive reels, and zero-rerender DOM physics. Custom GSAP ticker and RAF direct-DOM physics engines eliminate React state re-renders for fluid 60-120 FPS performance.
                </p>
              </div>
            </div>
          </div>

          {/* Performance & Metrics Badges */}
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#171615]/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs mb-3.5">
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-sm">60-120</span>
                <span className="text-[10px] text-[#6E6A64]">FPS MOTION</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-emerald-800 block text-sm">0</span>
                <span className="text-[10px] text-[#6E6A64]">RERENDERS</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-sm">100%</span>
                <span className="text-[10px] text-[#6E6A64]">RESPONSIVE</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#64131C] block text-sm">2 CITIES</span>
                <span className="text-[10px] text-[#6E6A64]">LABS ACTIVE</span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#171615] flex flex-wrap gap-2">
              <span className="text-[#64131C] font-bold">STACK:</span>
              <span>React 19 · TypeScript · Vite · Tailwind CSS · GSAP · Framer Motion · Lenis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepairCasesSection
