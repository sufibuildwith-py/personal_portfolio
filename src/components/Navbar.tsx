import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react'
import { PERSONAL_BRAND } from '../data/portfolioData'

interface NavbarProps {
  onOpenContact: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Anatomy', href: '#anatomy' },
    { name: 'Disciplines', href: '#disciplines' },
    { name: 'Systems', href: '#systems' },
    { name: 'Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 ${
            isScrolled
              ? 'bg-[#FAF8F5]/90 border border-[#171615]/10 shadow-[0_8px_30px_rgb(23,22,21,0.06)] backdrop-blur-xl'
              : 'bg-[#FAF8F5]/70 border border-[#171615]/8 backdrop-blur-md'
          }`}
        >
          {/* Identity & Status Tag */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#171615] flex items-center justify-center text-[#F5F2EA] text-xs font-bold transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <span>SK</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold uppercase tracking-tight text-[#171615] text-sm sm:text-base leading-none transition-colors">
                Sufiyan<span className="text-[#64131C] font-black">.</span>Khan
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#6E6A64] mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse inline-block" />
                <span>Available · Kanpur, India</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.16em] text-[#6E6A64] hover:text-[#171615] transition-colors duration-200 font-semibold"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action: Contact Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/80 border border-[#171615]/10 flex items-center justify-center text-[#171615] hover:text-[#64131C]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden bg-[#FAF8F5]/95 border border-[#171615]/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-[#171615]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#171615]/10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#6E6A64]">
                  Engineering Portfolio
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse inline-block" />
                  Available for Hire
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base uppercase font-semibold tracking-wide text-[#171615] hover:text-[#64131C] py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-[#171615]/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenContact()
                  }}
                  className="w-full py-3 rounded-full bg-[#171615] text-[#FAF8F5] font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#64131C] transition-colors"
                >
                  <span>Discuss an Engineering Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#6E6A64] font-mono pt-1">
                  <span>{PERSONAL_BRAND.location}</span>
                  <a
                    href={`mailto:${PERSONAL_BRAND.email}`}
                    className="flex items-center gap-1 text-[#64131C] font-semibold"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
