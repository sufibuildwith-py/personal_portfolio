import React from 'react'
import { Terminal } from 'lucide-react'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'

interface ToolchainItem {
  number: string
  primary: string
  secondary: string
  category: string
  role: string
  invariants: string
}

const ROW_1_ITEMS: ToolchainItem[] = [
  {
    number: '01',
    primary: 'JAVA 21',
    secondary: 'SPRING BOOT 3',
    category: 'BACKEND ARCHITECTURE',
    role: 'Enterprise services, transactional outbox, and idempotent APIs.',
    invariants: 'Zero Dual-Write Failures · Strict Webhook Verification',
  },
  {
    number: '02',
    primary: 'POSTGRESQL 18',
    secondary: 'TYPESCRIPT',
    category: 'PERSISTENCE & SCHEMAS',
    role: 'Double-entry financial ledgers, Row Level Security (FORCE RLS), and Flyway.',
    invariants: 'Strict Multi-Tenant Isolation · Tamper-Evident Ledgers',
  },
  {
    number: '03',
    primary: 'REACT 19',
    secondary: 'NEXT.JS 14',
    category: 'CLIENT CONTROL PLANES',
    role: 'High-performance control surfaces, server components, and direct-DOM motion.',
    invariants: '60-120 FPS Compositor Physics · Zero State Thrash',
  },
  {
    number: '04',
    primary: 'PYTHON',
    secondary: 'DOCKER',
    category: 'AI & INFRASTRUCTURE',
    role: 'Agentic reasoning evaluation harnesses, reproducible containers.',
    invariants: '10k+ Automated Benchmarks · Reproducible Isolation',
  },
  {
    number: '05',
    primary: 'TAURI 2',
    secondary: 'ELECTRON',
    category: 'DESKTOP RUNTIMES',
    role: 'Packaged offline desktop apps, bundled ML models, and native IPC.',
    invariants: '100% Offline Capability · Self-Contained Installers',
  },
]

const ROW_2_ITEMS: ToolchainItem[] = [
  {
    number: '06',
    primary: 'WEBSOCKETS',
    secondary: 'STOMP PROTOCOL',
    category: 'STREAMING & TELEMETRY',
    role: 'Bi-directional messaging, consent-based crew telemetry, instant lock.',
    invariants: 'Low-Latency Distribution · Automated Reconnection',
  },
  {
    number: '07',
    primary: 'LOCAL AI / EVE',
    secondary: 'QWEN RERANKER',
    category: 'INTELLIGENCE LAYER',
    role: '2-stage semantic reranking, grounded retrieval, policy governors.',
    invariants: 'AI Proposes · Deterministic Policy Gates Decide',
  },
  {
    number: '08',
    primary: 'REDIS',
    secondary: 'CACHING LEDGER',
    category: 'DISTRIBUTED DATA',
    role: 'Ephemeral leases, token-bucket rate limiters, session state.',
    invariants: 'Sub-millisecond Access · Distributed Locks',
  },
  {
    number: '09',
    primary: 'C++',
    secondary: 'CORE CS',
    category: 'SYSTEMS FOUNDATIONS',
    role: 'Algorithmic complexity, memory management, OS primitives, networks.',
    invariants: 'Deterministic Resource Bounds · Algorithmic Rigor',
  },
]

export const BrandsSection: React.FC = () => {
  // Row 1: 01 -> 05 moves LEFT -> RIGHT (direction: 'right')
  const topReel = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 22,
    speedMobile: 18,
    gapFallback: 16,
  })

  // Row 2: 06 <- 09 moves RIGHT -> LEFT (direction: 'left')
  const bottomReel = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 22,
    speedMobile: 18,
    gapFallback: 16,
  })

  // Duplicate items within a set to ensure continuous coverage on wide screens
  const topItems = [...ROW_1_ITEMS, ...ROW_1_ITEMS]
  const bottomItems = [...ROW_2_ITEMS, ...ROW_2_ITEMS]

  const renderToolchainCard = (item: ToolchainItem, idx: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${item.number}-${idx}`}
      className="w-[280px] sm:w-[340px] md:w-[390px] lg:w-[420px] shrink-0"
    >
      <div className="h-full rounded-xl sm:rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#171615]/10 hover:border-[#64131C]/30 p-3 sm:p-3.5 md:p-4 shadow-2xs transition-colors duration-200 flex flex-col justify-between select-none">
        {/* Top Row: Index, Primary | Secondary, Category Badge */}
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="font-mono text-xs sm:text-sm font-black text-[#64131C] shrink-0 tracking-tight">
              {item.number}
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#171615] truncate">
              {item.primary}
            </span>
            <span className="text-[11px] sm:text-xs text-[#171615]/25">|</span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-tight text-[#6E6A64] truncate">
              {item.secondary}
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#64131C] font-semibold shrink-0">
            {item.category.split(' ')[0]}
          </span>
        </div>

        {/* Bottom Row: Role & Invariant Dot */}
        <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6E6A64] font-mono leading-tight">
          <p className="truncate text-[#171615]/80 font-sans text-[11px] sm:text-xs">
            {item.role}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
            title={item.invariants}
          />
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="stack"
      className="relative w-full bg-[#F5F2EA] text-[#171615] py-14 sm:py-20 overflow-hidden border-t border-[#171615]/10 select-none"
      aria-label="Core Engineering Toolchain and Production Ecosystem"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-6 sm:mb-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-[#171615]/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#64131C] mb-2 font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>07 // TOOLCHAIN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615] leading-[1.06]">
              CORE TECHNOLOGIES.{' '}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                production tested.
              </span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-xs sm:text-sm text-[#6E6A64] font-normal leading-relaxed">
              Every technology is selected for determinism, verifiable type safety, and real-world operational resilience.
            </p>
            <div className="mt-2 flex items-center lg:justify-end gap-2 text-[10px] sm:text-[11px] font-mono text-[#64131C] font-semibold">
              <span>01 → 05 CORE RUNTIMES</span>
              <span className="text-[#171615]/20">·</span>
              <span>06 ← 09 TELEMETRY &amp; SYSTEMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 1: 01 -> 05 (Flows continuously LEFT -> RIGHT)
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
        aria-label="Core Runtimes: Java, PostgreSQL, React, Python, Tauri (Left to Right)"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F5F2EA] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F5F2EA] to-transparent z-10" />

        <div
          ref={topReel.trackRef}
          className="flex gap-3 sm:gap-3.5 will-change-transform w-max items-stretch"
        >
          <div className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((item, idx) => renderToolchainCard(item, idx, 'top-set0'))}
          </div>
          <div ref={topReel.singleSetRef} className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch">
            {topItems.map((item, idx) => renderToolchainCard(item, idx, 'top-set1'))}
          </div>
          <div className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((item, idx) => renderToolchainCard(item, idx, 'top-set2'))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: 06 <- 09 (Flows continuously RIGHT -> LEFT)
          ========================================================================= */}
      <div
        ref={bottomReel.viewportRef}
        onPointerDown={bottomReel.handlePointerDown}
        onPointerMove={bottomReel.handlePointerMove}
        onPointerUp={bottomReel.handlePointerUp}
        onPointerCancel={bottomReel.handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden py-1 sm:py-1.5 mt-2.5 sm:mt-3 ${
          bottomReel.isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Streaming & Systems: WebSockets, Local AI, Redis, C++ (Right to Left)"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F5F2EA] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F5F2EA] to-transparent z-10" />

        <div
          ref={bottomReel.trackRef}
          className="flex gap-3 sm:gap-3.5 will-change-transform w-max items-stretch"
        >
          <div className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((item, idx) => renderToolchainCard(item, idx, 'bottom-set0'))}
          </div>
          <div ref={bottomReel.singleSetRef} className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch">
            {bottomItems.map((item, idx) => renderToolchainCard(item, idx, 'bottom-set1'))}
          </div>
          <div className="flex gap-3 sm:gap-3.5 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((item, idx) => renderToolchainCard(item, idx, 'bottom-set2'))}
          </div>
        </div>
      </div>

      {/* Bottom Colophon Strip */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mt-6 sm:mt-8 pt-4 border-t border-[#171615]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#6E6A64]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>ALL TECHNOLOGIES VERIFIED IN LIVE PRODUCTION OR AUTOMATED HARNESSES</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#64131C] font-semibold">
          <span>↔ DRAG REELS TO INSPECT</span>
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
