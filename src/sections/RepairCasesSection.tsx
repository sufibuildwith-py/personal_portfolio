import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  Github,
  ExternalLink,
  Code2,
  ShieldCheck,
  Lock,
  Workflow,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'

export const RepairCasesSection: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Track scroll progression specifically through the sticky card track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  /* =========================================================================
     TRANSFORMATION RANGES FOR 5 CONTINUOUS OVERLAPPING CARDS
     4 Transitions across [0, 1]:
     Card 0: Already settled at start -> recedes as Card 1 arrives
     Card 1: Enters [0.04, 0.22] -> settles -> recedes as Card 2 arrives
     Card 2: Enters [0.28, 0.46] -> settles -> recedes as Card 3 arrives
     Card 3: Enters [0.52, 0.70] -> settles -> recedes as Card 4 arrives
     Card 4: Enters [0.76, 0.94] -> settles on top of the stack
     ========================================================================= */

  /* =========================================================================
     TRANSFORMATION RANGES FOR 5 CONTINUOUS OVERLAPPING CARDS
     4 Transitions across [0, 1]:
     Card 0: Settled at start -> recedes as Card 1 arrives -> recedes further -> fades once 3 layers deep
     Card 1: Hidden -> Enters [0.04, 0.24] -> settles -> recedes as Card 2 arrives -> recedes further -> fades
     Card 2: Hidden -> Enters [0.28, 0.48] -> settles -> recedes as Card 3 arrives -> recedes further
     Card 3: Hidden -> Enters [0.52, 0.72] -> settles -> recedes as Card 4 arrives
     Card 4: Hidden -> Enters [0.76, 0.96] -> settles on top of the stack through 1.0
     * Rule: Visible cards maintain 100% solid opacity (no ghosting/translucency).
     * Rule: Incoming cards have opacity: 0 before entry range so they never peek at the bottom.
     ========================================================================= */

  // Card 0 (SA Command) - Base layer
  const card0Y = useTransform(
    scrollYProgress,
    [0, 0.04, 0.24, 0.28, 0.48, 0.52, 0.62],
    ['0%', '0%', '-3.5%', '-3.5%', '-7%', '-7%', '-10%']
  )
  const card0Scale = useTransform(
    scrollYProgress,
    [0, 0.04, 0.24, 0.28, 0.48, 0.52, 0.62],
    [1, 1, 0.97, 0.97, 0.94, 0.94, 0.91]
  )
  const card0Opacity = useTransform(
    scrollYProgress,
    [0, 0.52, 0.62],
    [1, 1, 0]
  )
  const card0PointerEvents = useTransform(scrollYProgress, (p) => (p < 0.20 ? 'auto' : 'none'))

  // Card 1 (Sentinel)
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.04, 0.24, 0.28, 0.48, 0.52, 0.72, 0.76, 0.86],
    ['100%', '100%', '0%', '0%', '-3.5%', '-3.5%', '-7%', '-7%', '-10%']
  )
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.04, 0.24, 0.28, 0.48, 0.52, 0.72, 0.76, 0.86],
    [1, 1, 1, 1, 0.97, 0.97, 0.94, 0.94, 0.91]
  )
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.039, 0.06, 0.76, 0.86],
    [0, 0, 1, 1, 0]
  )
  const card1PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.20 && p < 0.44 ? 'auto' : 'none'))

  // Card 2 (GuideIn)
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.28, 0.48, 0.52, 0.72, 0.76, 0.96],
    ['100%', '100%', '0%', '0%', '-3.5%', '-3.5%', '-7%']
  )
  const card2Scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.48, 0.52, 0.72, 0.76, 0.96],
    [1, 1, 1, 1, 0.97, 0.97, 0.94]
  )
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.279, 0.30, 1],
    [0, 0, 1, 1]
  )
  const card2PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.44 && p < 0.68 ? 'auto' : 'none'))

  // Card 3 (Offline Document Advisor)
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.52, 0.72, 0.76, 0.96],
    ['100%', '100%', '0%', '0%', '-3.5%']
  )
  const card3Scale = useTransform(
    scrollYProgress,
    [0, 0.52, 0.72, 0.76, 0.96],
    [1, 1, 1, 1, 0.97]
  )
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.519, 0.54, 1],
    [0, 0, 1, 1]
  )
  const card3PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.68 && p < 0.92 ? 'auto' : 'none'))

  // Card 4 (Laptop Care)
  const card4Y = useTransform(
    scrollYProgress,
    [0, 0.76, 0.96, 1],
    ['100%', '100%', '0%', '0%']
  )
  const card4Scale = useTransform(
    scrollYProgress,
    [0, 0.76, 0.96, 1],
    [1, 1, 1, 1]
  )
  const card4Opacity = useTransform(
    scrollYProgress,
    [0, 0.759, 0.78, 1],
    [0, 0, 1, 1]
  )
  const card4PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.92 ? 'auto' : 'none'))

  return (
    <section
      id="systems"
      className="relative w-full bg-[#F5F2EA] text-[#171615] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 md:px-10 lg:px-12 pt-20 sm:pt-28 pb-16 sm:pb-24 border-t border-[#171615]/10"
      aria-label="Engineered Systems and Production Case Studies"
    >
      {/* Editorial Section Header */}
      <div className="max-w-6xl mx-auto mb-10 sm:mb-14 text-center">
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

      {/* =========================================================================
          REDUCED MOTION FALLBACK: Clean readable stacked list
          ========================================================================= */}
      {prefersReducedMotion ? (
        <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-12">
          <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-sm">
            <SACommandCard />
          </div>
          <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-sm">
            <SentinelCard />
          </div>
          <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-sm">
            <GuideInCard />
          </div>
          <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-sm">
            <OfflineDocumentAdvisorCard />
          </div>
          <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[#171615]/10 bg-white text-[#171615] p-5 sm:p-7 md:p-8 lg:p-9 shadow-sm">
            <LaptopCareCard onOpenContact={onOpenContact} />
          </div>
        </div>
      ) : (
        /* =========================================================================
           CONTINUOUS STICKY-STACK ARCHITECTURE (DESKTOP + MOBILE)
           Single tall scroll track pinning a sticky viewport frame with 5 cards
           ========================================================================= */
        <div
          ref={trackRef}
          className="relative w-full h-[360vh] sm:h-[400vh] lg:h-[420vh]"
        >
          {/* Sticky Presentation Frame pinned below the navbar */}
          <div className="sticky top-[72px] sm:top-20 md:top-24 w-full flex items-center justify-center pointer-events-none">
            {/* Card Canvas: exact common container bounding box */}
            <div className="relative w-full max-w-7xl mx-auto h-[min(84svh,780px)] min-h-[500px]">
              {/* CARD 01: SA COMMAND (Base layer, z-index 10) */}
              <motion.div
                style={{
                  y: card0Y,
                  scale: card0Scale,
                  opacity: card0Opacity,
                  pointerEvents: card0PointerEvents,
                  zIndex: 10,
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-4 sm:p-6 md:p-8 lg:p-9 shadow-[0_25px_60px_-15px_rgba(23,22,21,0.08)] origin-top overflow-hidden flex flex-col justify-between"
              >
                <SACommandCard />
              </motion.div>

              {/* CARD 02: SENTINEL (Enters from below, z-index 20) */}
              <motion.div
                style={{
                  y: card1Y,
                  scale: card1Scale,
                  opacity: card1Opacity,
                  pointerEvents: card1PointerEvents,
                  zIndex: 20,
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-4 sm:p-6 md:p-8 lg:p-9 shadow-[0_25px_60px_-15px_rgba(23,22,21,0.08)] origin-top overflow-hidden flex flex-col justify-between"
              >
                <SentinelCard />
              </motion.div>

              {/* CARD 03: GUIDEIN (Enters from below, z-index 30) */}
              <motion.div
                style={{
                  y: card2Y,
                  scale: card2Scale,
                  opacity: card2Opacity,
                  pointerEvents: card2PointerEvents,
                  zIndex: 30,
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-4 sm:p-6 md:p-8 lg:p-9 shadow-[0_25px_60px_-15px_rgba(23,22,21,0.08)] origin-top overflow-hidden flex flex-col justify-between"
              >
                <GuideInCard />
              </motion.div>

              {/* CARD 04: OFFLINE DOCUMENT ADVISOR (Enters from below, z-index 40) */}
              <motion.div
                style={{
                  y: card3Y,
                  scale: card3Scale,
                  opacity: card3Opacity,
                  pointerEvents: card3PointerEvents,
                  zIndex: 40,
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-4 sm:p-6 md:p-8 lg:p-9 shadow-[0_25px_60px_-15px_rgba(23,22,21,0.08)] origin-top overflow-hidden flex flex-col justify-between"
              >
                <OfflineDocumentAdvisorCard />
              </motion.div>

              {/* CARD 05: LAPTOP CARE (Final stack crown, z-index 50) */}
              <motion.div
                style={{
                  y: card4Y,
                  scale: card4Scale,
                  opacity: card4Opacity,
                  pointerEvents: card4PointerEvents,
                  zIndex: 50,
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[30px] md:rounded-[34px] border border-[#171615]/10 bg-white text-[#171615] p-4 sm:p-6 md:p-8 lg:p-9 shadow-[0_25px_60px_-15px_rgba(23,22,21,0.08)] origin-top overflow-hidden flex flex-col justify-between"
              >
                <LaptopCareCard onOpenContact={onOpenContact} />
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
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
    <div className="flex flex-col justify-between h-full w-full overflow-y-auto lg:overflow-hidden pr-0.5">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            01
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            SA COMMAND
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          OPERATIONS INFRASTRUCTURE · SA PRODUCTIONS / VARANASI · SEP 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering (Mobile: Image First -> Text; Desktop: Text Left -> Image Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch mt-3 sm:mt-5 flex-1 min-h-0">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center min-h-0">
          <div className="rounded-xl sm:rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-2xs flex flex-col h-full justify-between">
            {/* macOS Editorial Window Chrome */}
            <div className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-[#6E6A64] tracking-wider uppercase hidden sm:inline">
                  sa-command.internal // STOMP: CONNECTED
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveView('arena')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
            <div className="relative aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group flex-1 min-h-[140px] sm:min-h-[220px]">
              <img
                src={current.image}
                alt="SA Command production interface"
                width={1897}
                height={986}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-[#171615]/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#FAF8F5] border border-white/10">
                {current.badge}
              </div>
            </div>

            {/* Editorial Caption Bar */}
            <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6E6A64] shrink-0">
              <span className="truncate pr-2">{current.caption}</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">PROD ARTIFACT</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Editorial pull quote */}
            <p className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “Operations infrastructure for an active production company.”
            </p>

            {/* Context & Architecture Ledger */}
            <div className="space-y-2.5 sm:space-y-3.5 mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3.5 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5 sm:mb-1">
                  01 // PROBLEM &amp; OPERATIONAL CONTEXT
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Operations were fractured across disconnected spreadsheets, unstructured WhatsApp call-sheets, manual paper ledgers, and verbal equipment commitments. The lack of single truth caused crew collisions and lost financial context.
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5 sm:mb-1">
                  02 // ARCHITECTURE &amp; EXECUTION
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Engineered SA Command: a private platform unifying crew scheduling, double-entry finance, GST billing, and an offline local-AI core (EVE). Built Spring Boot / PostgreSQL backend and React / Tauri 2 desktop client with concurrency-safe gear reservations.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Invariants & Stack */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-[#171615]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
              <div>
                <span className="text-[#64131C] font-bold block text-[9px] sm:text-[10px]">BACKEND &amp; CLIENT:</span>
                <span className="text-[#171615]">Java 21 · Spring Boot · PostgreSQL 16 · Tauri 2 · React · Expo</span>
              </div>
              <div>
                <span className="text-[#64131C] font-bold block text-[9px] sm:text-[10px]">GOVERNANCE &amp; INVARIANTS:</span>
                <span className="text-[#171615]">EVE Local AI · 2-Stage Qwen Reranker · 30m Veil Sessions · WebSockets</span>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Concurrency-safe gear lock · 30m cryptographic session grants
              </span>
              <a
                href="https://github.com/sufibuildwith-py/sa-controlcentre"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
    <div className="flex flex-col justify-between h-full w-full overflow-y-auto lg:overflow-hidden pr-0.5">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            02
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            SENTINEL
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          GOVERNED REVENUE RECOVERY · RAZORPAY TEST MODE · 2026
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch mt-3 sm:mt-5 flex-1 min-h-0">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center min-h-0">
          <div className="rounded-xl sm:rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-2xs flex flex-col h-full justify-between">
            {/* Editorial Chrome & Tab Switcher */}
            <div className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-[#6E6A64] tracking-wider uppercase hidden sm:inline">
                  sentinel.recovery // INCIDENT #7B47C4EE
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('console')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
              <div className="relative aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group flex-1 min-h-[140px] sm:min-h-[220px]">
                <img
                  src="/projects/sentinel-console.webp"
                  alt="Sentinel live revenue recovery incident console"
                  width={1887}
                  height={997}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest">
                  POLICY: APPROVED · RECOVERED
                </div>
              </div>
            ) : (
              /* Native SVG Architectural Truth Boundary Diagram */
              <div className="aspect-[16/9.5] w-full bg-[#FAF8F5] p-2.5 sm:p-4 flex flex-col justify-between overflow-hidden flex-1 min-h-[180px]">
                {/* Layer 1: AI Reasoning */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono mb-0.5">
                    <span className="text-[#6E6A64] font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-700" />
                      STAGE 01 // AI INVESTIGATION &amp; HYPOTHESIS
                    </span>
                    <span className="text-amber-800 bg-amber-50 px-1 py-0.5 rounded border border-amber-200 text-[8px] sm:text-[9px]">
                      GEMINI 1.5 + RAG
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#171615]">
                    Correlates telemetry clusters → Analyzes failure codes → Proposes bounded recovery plan.
                  </p>
                </div>

                {/* Truth Boundary Dividing Gate */}
                <div className="relative my-1 sm:my-1.5 py-0.5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-[#64131C]/40" />
                  </div>
                  <div className="relative px-2.5 py-0.5 rounded-full bg-[#64131C] text-[#FAF8F5] font-mono text-[8px] sm:text-[9px] uppercase tracking-widest font-black shadow-sm flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>TRUTH BOUNDARY // DETERMINISTIC SAFETY GOVERNOR</span>
                  </div>
                </div>

                {/* Layer 2: Deterministic Policy Gates */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5 text-center font-mono text-[9px] sm:text-[10px]">
                  <div className="p-1 sm:p-1.5 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block text-[8px] sm:text-[9px]">GATE 01</span>
                    <span className="text-[8px] text-[#6E6A64]">Idempotency</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block text-[8px] sm:text-[9px]">GATE 02</span>
                    <span className="text-[8px] text-[#6E6A64]">Max ₹ Cap</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block text-[8px] sm:text-[9px]">GATE 03</span>
                    <span className="text-[8px] text-[#6E6A64]">State Lock</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-white border border-[#171615]/10">
                    <span className="font-bold text-[#64131C] block text-[8px] sm:text-[9px]">GATE 04</span>
                    <span className="text-[8px] text-[#6E6A64]">Blast Radius</span>
                  </div>
                </div>

                {/* Layer 3: Execution & Signed Reconciliation */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs mt-1">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono mb-0.5">
                    <span className="text-[#6E6A64] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-700" />
                      STAGE 03 // EXECUTION &amp; RECONCILIATION
                    </span>
                    <span className="text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 text-[8px] sm:text-[9px]">
                      EXACTLY-ONCE
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#171615]">
                    Razorpay Test API link generation → Raw-Byte HMAC signature verification → Immutable ledger settlement.
                  </p>
                </div>
              </div>
            )}

            {/* Editorial Caption Bar */}
            <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6E6A64] shrink-0">
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
            <div className="my-2 sm:my-3 py-1.5 sm:py-2 border-y border-[#171615]/10 flex flex-col items-center text-center">
              <div className="font-black text-xs sm:text-sm md:text-base uppercase tracking-wider text-[#171615] leading-snug space-y-0.5">
                <div>AI PROPOSES.</div>
                <div className="text-[#6E6A64]">EVIDENCE SUPPORTS.</div>
                <div className="text-[#64131C]">POLICY DECIDES.</div>
                <div className="text-[#6E6A64]">TOOLS EXECUTE.</div>
                <div>OUTCOMES TEACH.</div>
              </div>
            </div>

            {/* Context & Architecture Split */}
            <div className="space-y-2 sm:space-y-2.5">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: PAYMENT FAILURE LEAKAGE
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Payment failure clusters leak SaaS revenue. Unattended retries create duplicate charges and trigger chargeback penalties. Raw generative AI cannot be safely granted financial execution authority.
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: GOVERNED SAFETY GATES
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Gemini agents investigate failure clusters using historical RAG evidence, while an independent deterministic policy governor enforces 8/8 safety gates before executing idempotent Razorpay test transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Deterministic Verification Ledger */}
          <div className="mt-3 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#171615]/10">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-1.5 text-center text-xs font-mono">
              <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">10,000+</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">BENCHMARKS</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-emerald-800 block text-xs sm:text-sm">8 / 8</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">SAFETY GATES</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">IDEMPOTENT</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">LINKS</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">RAW HMAC</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">SIGNED HOOKS</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8 col-span-3 sm:col-span-1">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">EXACTLY-1</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">RECONCILED</span>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 pt-1.5 sm:pt-2 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 font-medium">
                ✓ 10,000+ deterministic cases · Zero duplicate payments
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/sufibuildwith-py/Sentinel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F5F2EA] border border-[#171615]/10 text-[#171615] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
                <a
                  href="https://sentinelxops.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
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
    <div className="flex flex-col justify-between h-full w-full overflow-y-auto lg:overflow-hidden pr-0.5">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            03
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            GUIDEIN
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          CHANGE INTELLIGENCE CONTROL PLANE · 2024 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch mt-3 sm:mt-5 flex-1 min-h-0">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center min-h-0">
          <div className="rounded-xl sm:rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-2xs flex flex-col h-full justify-between">
            {/* Chrome Bar */}
            <div className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  guidein.controlplane // SYSTEM GRAPH v18.4
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-white text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#64131C] font-bold border border-[#171615]/10">
                100% RECALL PROVEN
              </div>
            </div>

            {/* Native SVG / Editorial System Graph Visual */}
            <div className="aspect-[16/9.5] w-full bg-[#FAF8F5] p-2.5 sm:p-4 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[180px]">
              {/* Pipeline Step Sequence */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2 text-center font-mono text-[9px] sm:text-[10px]">
                <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[8px] sm:text-[9px]">INGRESS</span>
                  <span className="font-bold text-[#171615]">GitHub Hook</span>
                </div>
                <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[8px] sm:text-[9px]">HMAC GATE</span>
                  <span className="font-bold text-[#64131C]">Raw-Byte Verify</span>
                </div>
                <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[8px] sm:text-[9px]">PERSISTENCE</span>
                  <span className="font-bold text-[#171615]">Outbox &amp; RLS</span>
                </div>
                <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                  <span className="text-[#6E6A64] block text-[8px] sm:text-[9px]">TOPOLOGY</span>
                  <span className="font-bold text-[#171615]">System Graph</span>
                </div>
                <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 shadow-2xs col-span-3 sm:col-span-1">
                  <span className="text-emerald-700 block text-[8px] sm:text-[9px]">DECISION</span>
                  <span className="font-bold text-emerald-900">Safe To Ship</span>
                </div>
              </div>

              {/* Central Graph Network Visual */}
              <div className="my-1.5 p-2 sm:p-3 rounded-xl bg-white border border-[#171615]/10 relative shadow-2xs flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1.5 border-b border-[#171615]/8 pb-1">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#64131C] font-bold flex items-center gap-1">
                    <Workflow className="w-3 h-3" />
                    DETERMINISTIC DEPENDENCY BLAST-RADIUS ENGINE
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    BLAST RADIUS: LOW
                  </span>
                </div>

                {/* Connected Entity Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-mono text-[#171615]">
                  <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[8px]">SERVICE</span>
                    <span className="font-bold">auth-router.ts</span>
                    <span className="text-emerald-700 block text-[8px] mt-0.5">✓ Safe</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[8px]">API CONTRACT</span>
                    <span className="font-bold">/v1/charge-token</span>
                    <span className="text-emerald-700 block text-[8px] mt-0.5">✓ Verified</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[8px]">SCHEMA</span>
                    <span className="font-bold">V18_outbox</span>
                    <span className="text-emerald-700 block text-[8px] mt-0.5">✓ Force RLS</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded bg-[#FAF8F5] border border-[#171615]/8">
                    <span className="text-[#6E6A64] block text-[8px]">INTEGRITY</span>
                    <span className="font-bold">2,132 Edges</span>
                    <span className="text-emerald-700 block text-[8px] mt-0.5">✓ 100% Recall</span>
                  </div>
                </div>
              </div>

              {/* Bottom Invariant Banner */}
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#FAF8F5] border border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                <span className="text-[#171615]">
                  <strong className="text-[#64131C]">INVARIANT:</strong> PostgreSQL 18 FORCE RLS prevents cross-tenant graph leakage.
                </span>
                <span className="text-[#6E6A64] hidden sm:inline">ZERO EVENT LOSS OUTBOX</span>
              </div>
            </div>

            {/* Caption Bar */}
            <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6E6A64] shrink-0">
              <span className="truncate pr-2">Fig 3.1 — Deterministic dependency graph mapping code symbol blast radius before production release.</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">CONTROL PLANE</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Large Editorial Statement */}
            <p className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “Evidence-governed control plane for deciding software change safety.”
            </p>

            {/* Verified Metrics Display Block */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-2.5 sm:my-3 py-2 sm:py-2.5 border-y border-[#171615]/10 text-center">
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-[#171615] block tracking-tight">
                  189 / 189
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  TESTS PASSED
                </span>
              </div>
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-[#64131C] block tracking-tight">
                  2,132
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  EXPECTED EDGES
                </span>
              </div>
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-emerald-800 block tracking-tight">
                  100%
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  EDGE RECALL
                </span>
              </div>
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-emerald-800 block tracking-tight">
                  0
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  FALSE EDGES
                </span>
              </div>
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-[#171615] block tracking-tight">
                  50,000
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  NODES TESTED
                </span>
              </div>
              <div>
                <span className="font-mono text-sm sm:text-lg font-black text-[#171615] block tracking-tight">
                  250,000
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#6E6A64] block">
                  GRAPH EDGES
                </span>
              </div>
            </div>

            {/* Context & Architecture */}
            <div className="space-y-2 sm:space-y-2.5">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: BLIND CODE SHIPMENTS
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  High-risk code changes ship without clear proof of downstream impact. Teams lack deterministic visibility into what services, endpoints, or relational schemas will break before deployment.
                </p>
              </div>
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: DETERMINISTIC GRAPH
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Ingests GitHub webhook events via raw-byte HMAC verification, executes via transactional outbox, and constructs a deterministic System Graph with PostgreSQL 18 Row Level Security (FORCE RLS).
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#171615]/10 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 font-medium">
              ✓ Validated scalability to 50k nodes &amp; 250k edges · 0 false edges
            </span>
            <a
              href="https://github.com/sufibuildwith-py/GuideIn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
    <div className="flex flex-col justify-between h-full w-full overflow-y-auto lg:overflow-hidden pr-0.5">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            04
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            OFFLINE DOC ADVISOR
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          IDEAL WEB SOLUTIONS · DESKTOP TOOLING · AUG 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch mt-3 sm:mt-5 flex-1 min-h-0">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center min-h-0">
          <div className="rounded-xl sm:rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-2xs flex flex-col h-full justify-between">
            {/* Chrome Bar */}
            <div className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  doc-advisor.desktop // LOCAL RUNTIME
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-emerald-50 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-bold border border-emerald-300">
                100% AIR-GAPPED
              </div>
            </div>

            {/* Visual Document Pipeline Monograph */}
            <div className="aspect-[16/9.5] w-full bg-[#FAF8F5] p-2.5 sm:p-4 flex flex-col justify-between overflow-hidden flex-1 min-h-[180px]">
              {/* Document Index Cards */}
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-1 text-center">
                  SUPPORTED IDENTITY SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5 font-mono text-center text-xs">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block text-[10px] sm:text-xs">AADHAAR</span>
                    <span className="text-[8px] text-[#6E6A64]">UIDAI QR &amp; Pattern</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block text-[10px] sm:text-xs">PAN</span>
                    <span className="text-[8px] text-[#6E6A64]">Alphanumeric Regex</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block text-[10px] sm:text-xs">VOTER ID</span>
                    <span className="text-[8px] text-[#6E6A64]">EPIC Validation</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-white border border-[#171615]/10 shadow-2xs">
                    <span className="font-black text-[#171615] block text-[10px] sm:text-xs">PASSPORT</span>
                    <span className="text-[8px] text-[#64131C] font-bold">MRZ ICAO 9303</span>
                  </div>
                </div>
              </div>

              {/* Offline Execution Pipeline Flow */}
              <div className="my-1 sm:my-1.5 p-1.5 sm:p-2.5 rounded-xl bg-white border border-[#171615]/10 shadow-2xs">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#64131C] font-bold block mb-1">
                  DESKTOP OCR PROCESSING PIPELINE //
                </span>
                <div className="flex items-center justify-between flex-wrap gap-1 text-[9px] sm:text-[10px] font-mono text-[#171615]">
                  <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">Rasterization</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">Sharp Deskew</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8 font-bold">Tesseract</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#171615]/8">Discrepancy</span>
                  <span className="text-[#64131C]">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">ExcelJS</span>
                </div>
              </div>

              {/* Key Invariant Callout */}
              <div className="p-1.5 sm:p-2.5 rounded-xl bg-white border border-[#171615]/10 shadow-2xs">
                <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] mb-0.5">
                  <span className="font-bold text-[#64131C]">KEY RELIABILITY STORY //</span>
                  <span className="text-[#6E6A64]">ZERO CLIENT PREREQUISITES</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs text-[#171615] font-black">
                  <span>NO NODE.JS</span>
                  <span className="text-[#64131C]">·</span>
                  <span>NO NPM</span>
                  <span className="text-[#64131C]">·</span>
                  <span>NO INTERNET</span>
                  <span className="text-[#64131C]">·</span>
                  <span className="text-emerald-800">100% AIR-GAPPED</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#6E6A64] mt-0.5 leading-snug">
                  Packaged native workers overcome path failures in client Windows installers, eliminating external runtime dependencies.
                </p>
              </div>
            </div>

            {/* Caption Bar */}
            <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6E6A64] shrink-0">
              <span className="truncate pr-2">Fig 4.1 — Self-contained bilingual OCR extraction pipeline with local discrepancy verification.</span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">LOCAL RUNTIME</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Large Editorial Statement */}
            <p className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “100% offline identity verification desktop tooling for high-volume operations.”
            </p>

            {/* Context & Architecture */}
            <div className="space-y-2.5 sm:space-y-3 mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: MANUAL WHATSAPP VERIFICATION
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Client employees manually verified thousands of identity documents received over WhatsApp. Cloud OCR introduced latency, recurring API costs, and severe customer privacy liability.
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: SELF-CONTAINED LOCAL OCR
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Shipped an offline Windows desktop app bundling English/Hindi models, PDF rasterization, document-specific parsers, and MRZ passport extraction. Overcame packaged-app worker-path failures for a self-contained runtime.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Technical Evidence */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-[#171615]/10">
            <div className="text-[10px] sm:text-xs font-mono text-[#171615] flex flex-wrap gap-1.5 sm:gap-2">
              <span className="text-[#64131C] font-bold">STACK:</span>
              <span>Electron · TypeScript · Node.js · Tesseract.js · Sharp · PDF.js · ExcelJS</span>
            </div>

            <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-[#171615]/8 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 font-medium">
                ✓ Production deployed at Ideal Web Solutions · Zero cloud API dependence
              </span>
              <a
                href="https://github.com/sufibuildwith-py/OCR---Offline-Docs-Application"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
   CASE 05: LAPTOP CARE (INTEGRATED INTO 5-CARD CONTINUOUS STACK)
   ========================================================================= */
const LaptopCareCard: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  return (
    <div className="flex flex-col justify-between h-full w-full overflow-y-auto lg:overflow-hidden pr-0.5">
      {/* 1. Header: Project Number + Title + Domain Badge */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-[#171615]/10 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-2xl sm:text-4xl font-black text-[#64131C] tracking-tighter">
            05
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#171615]">
            LAPTOP CARE
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6E6A64]">
          HARDWARE DIAGNOSTIC LAB PLATFORM · KANPUR &amp; PRAYAGRAJ · OCT 2026 — PRESENT
        </span>
      </div>

      {/* Main Grid: Responsive Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch mt-3 sm:mt-5 flex-1 min-h-0">
        {/* PRIMARY VISUAL ARTIFACT (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center min-h-0">
          <div className="rounded-xl sm:rounded-2xl border border-[#171615]/10 bg-[#FAF8F5] overflow-hidden shadow-2xs flex flex-col h-full justify-between">
            {/* macOS Chrome Header */}
            <div className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 bg-[#F0EDE4] border-b border-[#171615]/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#171615]/20 inline-block" />
                <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-[#6E6A64] tracking-wider uppercase">
                  laptopcare.service // HARDWARE LAB ONLINE
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-white text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#171615] font-bold border border-[#171615]/10">
                LIVE PRODUCTION
              </div>
            </div>

            {/* Platform Screenshot */}
            <div className="relative aspect-[16/9.5] w-full bg-[#171615] overflow-hidden group flex-1 min-h-[140px] sm:min-h-[220px]">
              <img
                src="/projects/laptopcare-platform.webp"
                alt="Laptop Care live production diagnostic platform"
                width={1905}
                height={983}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-[#171615]/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#FAF8F5] border border-white/10">
                3D DIAGNOSTIC INTAKE
              </div>
            </div>

            {/* Editorial Caption Bar */}
            <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-[#171615]/8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6E6A64] shrink-0">
              <span className="truncate pr-2">
                Fig 5.1 — Laptop Care 3D hardware diagnostic intake and live customer repair tracking platform.
              </span>
              <span className="text-[#64131C] font-bold whitespace-nowrap">COMMERCIAL DEPLOY</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE & SPECIFICATIONS (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “High-performance hardware diagnostic lab &amp; customer repair tracking ledger.”
            </p>

            <div className="space-y-2.5 sm:space-y-3.5 mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3.5 border-t border-[#171615]/8">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64] font-bold block mb-0.5">
                  01 // PROBLEM: OPAQUE HARDWARE SERVICE
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Independent diagnostic labs in Kanpur and Prayagraj process hundreds of motherboard and chip-level repairs monthly. Customers suffer from ambiguous diagnostic quotes, lost repair tickets, and lack of component provenance.
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-bold block mb-0.5">
                  02 // ARCHITECTURE: 60-120 FPS DIRECT-DOM PLATFORM
                </span>
                <p className="text-xs text-[#171615] leading-relaxed">
                  Engineered and deployed a production web platform featuring 3D hardware diagnostics, interactive reels, and zero-rerender DOM physics. Custom GSAP ticker and RAF direct-DOM physics engines eliminate React state re-renders for fluid 60-120 FPS performance.
                </p>
              </div>
            </div>
          </div>

          {/* Performance & Metrics Badges */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-[#171615]/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center font-mono text-xs mb-2.5 sm:mb-3">
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">60-120</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">FPS MOTION</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-emerald-800 block text-xs sm:text-sm">0</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">RERENDERS</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#171615] block text-xs sm:text-sm">100%</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">RESPONSIVE</span>
              </div>
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF8F5] border border-[#171615]/8">
                <span className="font-black text-[#64131C] block text-xs sm:text-sm">2 CITIES</span>
                <span className="text-[8px] sm:text-[9px] text-[#6E6A64]">LABS ACTIVE</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#171615]/8">
              <div className="text-[10px] sm:text-[11px] font-mono text-[#171615] flex flex-wrap gap-1">
                <span className="text-[#64131C] font-bold">STACK:</span>
                <span>React 19 · TypeScript · Vite · Tailwind · GSAP · Lenis</span>
              </div>

              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Discuss System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepairCasesSection
