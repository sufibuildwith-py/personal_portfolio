import React from 'react'
import { Terminal, CheckCircle2 } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'

interface ToolchainRow {
  number: string
  primary: string
  secondary: string
  category: string
  role: string
  invariants: string
}

const TOOLCHAIN_ITEMS: ToolchainRow[] = [
  {
    number: '01',
    primary: 'JAVA 21',
    secondary: 'SPRING BOOT 3',
    category: 'BACKEND ARCHITECTURE',
    role: 'Enterprise services, security filters, transactional outbox, and idempotent APIs.',
    invariants: 'Zero Dual-Write Failures · Strict Webhook Verification',
  },
  {
    number: '02',
    primary: 'POSTGRESQL 18',
    secondary: 'TYPESCRIPT',
    category: 'PERSISTENCE & SCHEMAS',
    role: 'Double-entry financial ledgers, Row Level Security (FORCE RLS), and Flyway migrations.',
    invariants: 'Strict Multi-Tenant Isolation · Tamper-Evident Ledgers',
  },
  {
    number: '03',
    primary: 'REACT 19',
    secondary: 'NEXT.JS 14',
    category: 'CLIENT CONTROL PLANES',
    role: 'High-performance control surfaces, server components, and direct-DOM compositor motion.',
    invariants: '60-120 FPS Compositor Physics · Zero State Thrash',
  },
  {
    number: '04',
    primary: 'PYTHON',
    secondary: 'DOCKER',
    category: 'AI & INFRASTRUCTURE',
    role: 'Agentic reasoning evaluation harnesses, reproducible containers, and multi-arch deployments.',
    invariants: '10k+ Automated Benchmarks · Reproducible Isolation',
  },
  {
    number: '05',
    primary: 'TAURI 2',
    secondary: 'ELECTRON',
    category: 'DESKTOP RUNTIMES',
    role: 'Packaged offline desktop applications, bundled machine learning models, and native IPC.',
    invariants: '100% Offline Capability · Self-Contained Installers',
  },
  {
    number: '06',
    primary: 'WEBSOCKETS',
    secondary: 'STOMP PROTOCOL',
    category: 'STREAMING & TELEMETRY',
    role: 'Bi-directional messaging, consent-based crew telemetry, and instant lock release.',
    invariants: 'Low-Latency Distribution · Automated Reconnection',
  },
  {
    number: '07',
    primary: 'LOCAL AI / EVE',
    secondary: 'QWEN RERANKER',
    category: 'INTELLIGENCE LAYER',
    role: '2-stage semantic reranking, grounded retrieval, and deterministic policy governors.',
    invariants: 'AI Proposes · Deterministic Engines Decide',
  },
  {
    number: '08',
    primary: 'REDIS',
    secondary: 'CACHING LEDGER',
    category: 'DISTRIBUTED DATA',
    role: 'Ephemeral leases, token-bucket rate limiters, and high-throughput session state.',
    invariants: 'Sub-millisecond Access · Distributed Locks',
  },
  {
    number: '09',
    primary: 'C++',
    secondary: 'CORE CS',
    category: 'SYSTEMS FOUNDATIONS',
    role: 'Algorithmic complexity, memory management, operating system primitives, and network protocols.',
    invariants: 'Deterministic Resource Bounds · Algorithmic Rigor',
  },
]

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="stack"
      className="relative w-full bg-[#F5F2EA] text-[#171615] py-20 sm:py-28 overflow-hidden border-t border-[#171615]/10 select-none"
      aria-label="Core Engineering Toolchain and Production Ecosystem"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#171615]/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#64131C] mb-3 font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>07 // TOOLCHAIN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#171615] leading-[1.06]">
              CORE TECHNOLOGIES.{' '}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                production tested.
              </span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-xs sm:text-sm text-[#6E6A64] font-normal leading-relaxed">
              Every technology is selected for determinism, verifiable type safety, and real-world operational resilience under production failure modes.
            </p>
            <div className="mt-3 flex items-center lg:justify-end gap-2 text-[11px] font-mono text-[#64131C] font-semibold">
              <span>9 PRODUCTION PLATFORMS</span>
              <span className="text-[#171615]/20">·</span>
              <span>ZERO VAPORWARE</span>
            </div>
          </div>
        </div>

        {/* Editorial Typography Catalogue (Directly on Canvas with Hairline Rules) */}
        <div className="divide-y divide-[#171615]/10">
          {TOOLCHAIN_ITEMS.map((item, idx) => (
            <FadeIn
              key={item.number}
              delay={idx * 0.04}
              y={15}
              className="group py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline hover:bg-[#FAF8F5]/80 transition-colors duration-200 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl"
            >
              {/* Col 1: Index Number */}
              <div className="md:col-span-1 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#64131C] tracking-wider">
                  {item.number}
                </span>
                <span className="md:hidden font-mono text-[10px] uppercase tracking-widest text-[#6E6A64]">
                  {item.category}
                </span>
              </div>

              {/* Col 2: Typographic Pair (JAVA | SPRING BOOT) */}
              <div className="md:col-span-5 flex flex-col">
                <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-[#171615] group-hover:text-[#64131C] transition-colors">
                    {item.primary}
                  </h3>
                  <span className="text-lg sm:text-xl font-light text-[#171615]/30">|</span>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-tight text-[#6E6A64] group-hover:text-[#171615] transition-colors">
                    {item.secondary}
                  </h4>
                </div>
                <span className="hidden md:block mt-1 font-mono text-[10px] uppercase tracking-widest text-[#64131C] font-semibold">
                  {item.category}
                </span>
              </div>

              {/* Col 3: Role & Production Scope */}
              <div className="md:col-span-4">
                <p className="text-xs sm:text-sm text-[#171615] font-normal leading-relaxed">
                  {item.role}
                </p>
              </div>

              {/* Col 4: Verified Invariant Badge */}
              <div className="md:col-span-2 flex md:justify-end items-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#171615]/8 text-[10px] font-mono text-[#6E6A64] group-hover:border-[#64131C]/20 transition-colors shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.invariants}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Ledger Colophon */}
        <div className="mt-12 pt-6 border-t border-[#171615]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6A64]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>ALL TECHNOLOGIES VERIFIED IN LIVE PRODUCTION OR AUTOMATED HARNESSES</span>
          </div>
          <div>
            <span>DETERMINISTIC EVALUATION · TYPE SAFETY · IMMUTABLE TRUTH</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
