import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  onOpenContact: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  // Phase state: 'loading' = initial quiet editorial boot sequence, 'ready' = main lockup active
  const [introState, setIntroState] = useState<'loading' | 'ready'>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return 'ready'
      if (sessionStorage.getItem('sufiyan_intro_seen')) return 'ready'
    }
    return 'loading'
  })

  const containerRef = useRef<HTMLElement>(null)

  // MotionValue-driven pointer tracking: 0 React re-renders on mouse movement
  const mouseNormX = useMotionValue(0)
  const mouseNormY = useMotionValue(0)

  // Spring physics tuned for calm, heavy, deliberate luxury feel: stiffness: 85, damping: 22, mass: 1.0
  const springNormX = useSpring(mouseNormX, { stiffness: 85, damping: 22, mass: 1.0 })
  const springNormY = useSpring(mouseNormY, { stiffness: 85, damping: 22, mass: 1.0 })

  // Very subtle 3D magnetic transforms (restrained, tactile, zero jitter)
  const tiltX = useTransform(springNormY, (y) => y * -2.5)
  const tiltY = useTransform(springNormX, (x) => x * 3.0)
  const translateX = useTransform(springNormX, (x) => x * 6)
  const translateY = useTransform(springNormY, (y) => y * 4)

  // Scroll parallax transforms for when user scrolls past hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const subjectScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const subjectOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Complete intro handler
  const completeIntro = () => {
    sessionStorage.setItem('sufiyan_intro_seen', 'true')
    setIntroState('ready')
  }

  // Auto-complete intro sequence after 2.2 seconds
  useEffect(() => {
    if (introState === 'loading') {
      const timer = setTimeout(() => {
        completeIntro()
      }, 2200)

      return () => clearTimeout(timer)
    }
  }, [introState])

  // Desktop-only mousemove tracking (only on fine pointer screens >= 1024px)
  useEffect(() => {
    if (introState !== 'ready') return
    if (typeof window === 'undefined') return

    const isFinePointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024
    if (!isFinePointer) return

    let isHeroVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting
        if (!isHeroVisible) {
          mouseNormX.set(0)
          mouseNormY.set(0)
        }
      },
      { rootMargin: '100px 0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible) return
      const { innerWidth, innerHeight } = window
      const normX = (e.clientX / innerWidth) * 2 - 1
      const normY = (e.clientY / innerHeight) * 2 - 1
      mouseNormX.set(normX)
      mouseNormY.set(normY)
    }

    const handleMouseLeave = () => {
      mouseNormX.set(0)
      mouseNormY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [introState, mouseNormX, mouseNormY])

  return (
    <>
      {/* =========================================================================
          PHASE 01: CINEMATIC OPENING / LOADING SEQUENCE
          "I build AI systems that survive contact with reality.
           Agents reason. Deterministic guardrails decide."
          Clean, minimal, editorial ivory-and-ink initialization.
          ========================================================================= */}
      <AnimatePresence>
        {introState === 'loading' && (
          <motion.div
            key="cinematic-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.01,
              filter: 'blur(6px)',
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            }}
            onClick={completeIntro}
            className="fixed inset-0 z-50 bg-[#F5F2EA] text-[#171615] flex flex-col items-center justify-center px-6 sm:px-10 text-center select-none cursor-pointer overflow-hidden"
            aria-label="Sufiyan Khan Initializing"
          >
            {/* Subtle warm paper glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[450px] bg-[#64131C]/5 rounded-full blur-[140px] pointer-events-none" />

            {/* Subtle initialization label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#171615]/10 text-[10px] font-mono tracking-[0.22em] uppercase text-[#6E6A64] mb-8 sm:mb-10 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#64131C] animate-ping" />
              <span>SYSTEM INITIALIZING // SUFIYAN KHAN</span>
            </motion.div>

            {/* The Brand Quote (Editorial Typography) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-4xl"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615] leading-[1.18]">
                “I build AI systems that survive{' '}
                <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                  contact with reality.
                </span>{' '}
                <br className="hidden sm:inline" />
                <span className="text-lg sm:text-2xl md:text-3xl text-[#6E6A64] font-medium tracking-normal mt-2 block">
                  Agents reason. Deterministic guardrails decide.
                </span>
              </h2>
            </motion.div>

            {/* Hairline progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative z-10 mt-10 sm:mt-14 w-36 sm:w-52 h-[1.5px] bg-[#171615]/10 overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#64131C] via-[#171615] to-[#6E6A64]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="relative z-10 mt-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6A64]/60"
            >
              Click anywhere to enter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          HERO ROOT SECTION
          Art-directed at every viewport: Desktop (>= 1200px), Tablet (768–1199px), Mobile (320–767px)
          Guarantees zero horizontal overflow, safe margins, and editorial proportion
          ========================================================================= */}
      <section
        ref={containerRef}
        id="hero"
        className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-x-hidden overflow-y-hidden bg-[#F5F2EA] text-[#171615] select-none pt-16 sm:pt-20 pb-[env(safe-area-inset-bottom)]"
      >
        {/* Ambient Warm Texture & Paper Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-[#FAF8F5] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-[#64131C]/3 rounded-full blur-[130px]" />
          <div className="absolute inset-0 bg-paper-noise opacity-60" />
        </div>

        {/* =========================================================================
            DESKTOP COMPOSITION (>= 1200px)
            Controlled max-width composition container (1400–1500px)
            Safe visual margins on both sides, safe vertical zones
            ========================================================================= */}
        <div className="hidden xl:flex relative flex-1 w-full max-w-[1460px] mx-auto px-6 sm:px-10 lg:px-12 flex-col justify-between overflow-hidden">
          {/* TOP ZONE: Metadata with 10–15% improved editorial legibility */}
          <div className="relative z-30 w-full pt-4 flex items-center justify-between font-mono text-xs sm:text-[12px] tracking-[0.14em] text-[#57534E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>ESTD. 2026 · KANPUR, INDIA</span>
            </div>
            <div className="flex items-center gap-4 uppercase tracking-[0.14em]">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="text-[#171615]/20">/</span>
              <span>BACKEND CONTROL PLANES</span>
              <span className="text-[#171615]/20">/</span>
              <span>GOVERNED AI</span>
            </div>
          </div>

          {/* CENTERPIECE: UNIFIED SUFIYAN [Image] KHAN LOCKUP
              Locks the portrait directly between the words.
              Head & shoulders sit in the aperture overlapping a bit of N and K.
              Body extends downward naturally, fully integrated with the typography. */}
          <div className="relative w-full flex items-center justify-center select-none pt-12 xl:pt-16 my-auto">
            <div className="relative flex items-center justify-center select-none whitespace-nowrap">
              {/* Word 1: SUFIYAN */}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(5.2rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-[#171615] leading-none select-none z-10"
              >
                SUFIYAN
              </motion.span>

              {/* Optical Gap: Sized slightly narrower than the shoulders (~160px) so portrait overlaps a bit of N and K */}
              <div className="w-[130px] lg:w-[155px] xl:w-[175px] shrink-0 pointer-events-none" />

              {/* Word 2: KHAN */}
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(5.2rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-[#171615] leading-none select-none z-10"
              >
                KHAN
              </motion.span>

              {/* CENTERPIECE: TAILORED PORTRAIT
                  Locked to the wordmark: Head rises slightly above the letters, shoulders overlap a bit of N and K, body extends downward */}
              <div className="absolute top-[-40px] xl:top-[-50px] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                <motion.div
                  style={{
                    scale: subjectScale,
                    opacity: subjectOpacity,
                    perspective: 1200,
                    rotateX: tiltX,
                    rotateY: tiltY,
                    x: translateX,
                    y: translateY,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto relative flex flex-col items-center cursor-grab active:cursor-grabbing"
                >
                  {/* Subtle ground pedestal shadow */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 sm:w-64 h-4 bg-[#171615]/20 rounded-full blur-md pointer-events-none" />

                  <picture>
                    <source srcSet="/sufiyan-cutout.webp" type="image/webp" />
                    <img
                      src="/sufiyan-cutout.png"
                      alt="Sufiyan Khan — Forward-Deployed Engineering"
                      className="h-[56vh] xl:h-[62vh] max-h-[580px] min-h-[460px] w-auto max-w-[440px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(23,22,21,0.22)]"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </picture>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BOTTOM ZONE: Left Thesis Column + Right Proof Highlights Column */}
          {/* Left Column: Thesis & Actions (Lifted 20–30px upward for generous bottom breathing room) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              bottom: 'clamp(6.25rem, 10vh, 8.5rem)',
              left: 'clamp(1.5rem, 4vw, 4.5rem)',
              width: 'min(360px, 25vw)',
            }}
            className="absolute z-30 text-left flex flex-col items-start gap-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-[#171615]/10 text-[10px] font-mono tracking-widest uppercase text-[#6E6A64] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#64131C]" />
              <span>AI / ML · Backend · Forward-Deployed</span>
            </div>

            <h2 className="text-xl xl:text-2xl font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “I build AI systems that survive{' '}
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                contact with reality.
              </span>”
            </h2>

            <p className="text-xs xl:text-sm text-[#6E6A64] font-normal leading-relaxed">
              From schema design to production deployment. Deterministic boundaries, resilient backends, and governed AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#systems"
                className="px-6 py-2.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span>Explore Systems</span>
                <span>→</span>
              </a>
              <button
                onClick={onOpenContact}
                className="px-6 py-2.5 rounded-full bg-white/85 hover:bg-white border border-[#171615]/10 text-[#171615] text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs active:scale-95"
              >
                Inquire / Contact
              </button>
            </div>
          </motion.div>

          {/* Right Column: Production Highlights (Lifted 20–30px upward in vertical alignment with left column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              bottom: 'clamp(6.25rem, 10vh, 8.5rem)',
              right: 'clamp(1.5rem, 4vw, 4.5rem)',
              width: 'min(320px, 22vw)',
            }}
            className="absolute z-30 flex flex-col items-end text-right gap-2.5 font-mono"
          >
            <span className="text-[10px] uppercase tracking-widest text-[#64131C] font-bold">
              00 // PRODUCTION HIGHLIGHTS
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-[#171615]">
              <div>
                <span className="font-bold">SA COMMAND</span>
                <span className="text-[#6E6A64]"> · Operations OS</span>
              </div>
              <div>
                <span className="font-bold">SENTINEL</span>
                <span className="text-[#6E6A64]"> · 10k+ Benchmarks</span>
              </div>
              <div>
                <span className="font-bold">GUIDEIN</span>
                <span className="text-[#6E6A64]"> · 189/189 Tests</span>
              </div>
              <div>
                <span className="font-bold">OFFLINE OCR</span>
                <span className="text-[#6E6A64]"> · Zero Cloud Runtime</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#171615]/10 text-[10px] text-[#6E6A64] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>OPEN FOR PRODUCTION ENGAGEMENTS</span>
            </div>
          </motion.div>

          {/* Bottom Metadata Bar within safe margins */}
          <div
            style={{
              bottom: 'clamp(1.25rem, 2.5vh, 2.25rem)',
              left: 'clamp(1.5rem, 4vw, 3.5rem)',
              right: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
            className="absolute z-30 flex items-center justify-between text-xs font-mono text-[#6E6A64]"
          >
            <span>DETERMINISTIC GUARDRAILS</span>
            <a
              href="#marquee"
              className="flex items-center gap-2 hover:text-[#171615] transition-colors duration-300"
            >
              <span>SCROLL TO INSPECT ARCHITECTURE</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#64131C]" />
            </a>
            <span>PROVENANCE &amp; AUDIT</span>
          </div>
        </div>

        {/* =========================================================================
            TABLET COMPOSITION (768px – 1199px)
            Balanced 2-level composition: Reduced scale, zero collisions
            ========================================================================= */}
        <div className="hidden md:flex xl:hidden relative flex-1 w-full max-w-[1000px] mx-auto px-6 sm:px-8 flex-col justify-between overflow-hidden">
          {/* Top Metadata */}
          <div className="w-full pt-4 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#6E6A64] z-30">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>ESTD. 2026 · KANPUR, INDIA</span>
            </div>
            <div className="flex items-center gap-3 uppercase tracking-wider">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="text-[#171615]/20">/</span>
              <span>GOVERNED AI</span>
            </div>
          </div>

          {/* Unified SUFIYAN [Image] KHAN Lockup on Tablet */}
          <div className="relative w-full flex items-center justify-center select-none pt-8 my-auto">
            <div className="relative flex items-center justify-center select-none whitespace-nowrap">
              <span className="text-[clamp(3.8rem,7.5vw,5.5rem)] font-black uppercase tracking-tight text-[#171615] leading-none select-none z-10">
                SUFIYAN
              </span>
              <div className="w-[100px] md:w-[125px] shrink-0 pointer-events-none" />
              <span className="text-[clamp(3.8rem,7.5vw,5.5rem)] font-black uppercase tracking-tight text-[#171615] leading-none select-none z-10">
                KHAN
              </span>

              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 h-4 bg-[#171615]/20 rounded-full blur-md pointer-events-none" />
                  <picture>
                    <source srcSet="/sufiyan-cutout.webp" type="image/webp" />
                    <img
                      src="/sufiyan-cutout.png"
                      alt="Sufiyan Khan"
                      className="h-[48vh] max-h-[460px] w-auto max-w-[340px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_16px_30px_rgba(23,22,21,0.2)]"
                      loading="eager"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Region: Thesis + Actions + Compact Proof Strip */}
          <div className="w-full z-30 mb-8 flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-[#171615]/10 text-[10px] font-mono tracking-widest uppercase text-[#6E6A64]">
              <Sparkles className="w-3.5 h-3.5 text-[#64131C]" />
              <span>AI / ML · Backend · Forward-Deployed</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#171615] max-w-lg leading-snug">
              “I build AI systems that survive{' '}
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                contact with reality.
              </span>”
            </h2>

            <div className="flex items-center gap-3">
              <a
                href="#systems"
                className="px-5 py-2.5 rounded-full bg-[#171615] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-95"
              >
                Explore Systems →
              </a>
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 rounded-full bg-white border border-[#171615]/10 text-[#171615] text-xs font-semibold uppercase tracking-wider shadow-2xs active:scale-95"
              >
                Inquire / Contact
              </button>
            </div>

            {/* Compact Proof Strip */}
            <div className="mt-2 text-[10px] font-mono text-[#6E6A64] flex items-center gap-3">
              <span className="text-[#64131C] font-semibold">00 // PROOF:</span>
              <span>SA COMMAND</span>
              <span>·</span>
              <span>SENTINEL</span>
              <span>·</span>
              <span>GUIDEIN</span>
              <span>·</span>
              <span>OFFLINE OCR</span>
            </div>
          </div>

          {/* Bottom Scroll Strip */}
          <div className="w-full pb-4 flex items-center justify-between text-xs font-mono text-[#6E6A64] z-30">
            <span>DETERMINISTIC GUARDRAILS</span>
            <a
              href="#marquee"
              className="flex items-center gap-1.5 hover:text-[#171615] transition-colors"
            >
              <span>SCROLL TO INSPECT ARCHITECTURE</span>
              <ArrowDown className="w-3 h-3 text-[#64131C] animate-bounce" />
            </a>
            <span>PROVENANCE &amp; AUDIT</span>
          </div>
        </div>

        {/* =========================================================================
            MOBILE COMPOSITION (320px – 767px)
            Vertical editorial cover in natural document flow.
            Zero collisions, zero clipped text, zero horizontal overflow.
            ========================================================================= */}
        <div className="flex md:hidden flex-col items-center text-center px-5 pt-3 pb-6 z-20 w-full min-h-[100svh] justify-between">
          {/* Top Status & Eyebrow */}
          <div className="w-full flex flex-col items-center gap-2 pt-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#6E6A64]">
              ESTD. 2026 · KANPUR, INDIA
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#171615]/10 text-[9px] font-mono tracking-widest uppercase text-[#6E6A64] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#64131C]" />
              <span>AI / ML · Backend · Forward-Deployed</span>
            </div>
          </div>

          {/* Vertical Editorial Cover: 2-Line Wordmark + Intersecting Portrait */}
          <div className="relative w-full flex flex-col items-center justify-center my-auto py-1">
            {/* 2-Line Editorial Wordmark */}
            <div className="flex flex-col items-center select-none leading-[0.88] tracking-tight">
              <span className="text-[clamp(3rem,14vw,4.5rem)] font-black uppercase text-[#171615]">
                SUFIYAN
              </span>
              <span className="text-[clamp(3rem,14vw,4.5rem)] font-black uppercase text-[#171615]">
                KHAN
              </span>
            </div>

            {/* Naturally Intersecting Portrait */}
            <div className="relative -mt-10 sm:-mt-14 w-full flex justify-center pointer-events-none">
              <picture>
                <source srcSet="/sufiyan-cutout.webp" type="image/webp" />
                <img
                  src="/sufiyan-cutout.png"
                  alt="Sufiyan Khan"
                  className="w-[72vw] max-w-[270px] h-auto object-contain object-bottom drop-shadow-[0_16px_28px_rgba(23,22,21,0.22)] select-none pointer-events-none"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* Supporting Content Flow in Document Order (Zero Overlap!) */}
          <div className="w-full max-w-sm flex flex-col items-center text-center gap-3">
            {/* Thesis */}
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#171615] leading-snug">
              “I build AI systems that survive{' '}
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                contact with reality.
              </span>”
            </h2>

            {/* Supporting description */}
            <p className="text-xs text-[#6E6A64] font-normal leading-relaxed max-w-xs">
              From schema design to production deployment. Deterministic boundaries, resilient backends, and governed AI.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href="#systems"
                className="px-5 py-2.5 rounded-full bg-[#171615] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-95"
              >
                Explore Systems →
              </a>
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 rounded-full bg-white border border-[#171615]/10 text-[#171615] text-xs font-semibold uppercase tracking-wider shadow-2xs active:scale-95"
              >
                Inquire / Contact
              </button>
            </div>

            {/* Compact Production Highlights Strip */}
            <div className="mt-2 pt-2.5 border-t border-[#171615]/10 w-full flex flex-col gap-1 text-[10px] font-mono text-[#6E6A64]">
              <span className="text-[#64131C] font-bold uppercase tracking-wider">
                00 // PRODUCTION HIGHLIGHTS
              </span>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[#171615]">
                <span>SA COMMAND</span>
                <span>·</span>
                <span>SENTINEL</span>
                <span>·</span>
                <span>GUIDEIN</span>
                <span>·</span>
                <span>OFFLINE OCR</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-0.5 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>OPEN FOR PRODUCTION ENGAGEMENTS</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-1 text-[10px] font-mono text-[#6E6A64] flex items-center gap-1">
              <span>SCROLL TO INSPECT ARCHITECTURE</span>
              <ArrowDown className="w-3 h-3 text-[#64131C] animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
