import React from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Terminal } from 'lucide-react'
import { PERSONAL_BRAND } from '../data/portfolioData'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#171615] text-[#FAF8F5] border-t border-[#171615] py-16 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Row: Brand & Quick Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#64131C] flex items-center justify-center text-[#FAF8F5] text-xs font-bold shadow-md">
                <span>SK</span>
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-[#FAF8F5]">
                Sufiyan<span className="text-[#64131C] font-black">.</span>Khan
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF8F5]/70 font-normal leading-relaxed max-w-sm">
              AI/ML Engineer working across backend systems, full-stack control planes, and forward-deployed engineering. Moving from schema to local AI to production.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#FAF8F5]/50 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>{PERSONAL_BRAND.education}</span>
            </div>
          </div>

          {/* System Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#64131C] font-bold mb-2">
              Engineered Systems
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#FAF8F5]/75 font-normal">
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/sa-controlcentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>SA Command (Operations OS &amp; EVE Local AI)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/Sentinel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Sentinel (Governed Multi-Agent Recovery)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/GuideIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GuideIn (Change Intelligence Control Plane)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/OCR---Offline-Docs-Application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Offline Windows OCR (Ideal Web Solutions)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/SufiOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Sufiyan OS (macOS-Inspired Web System)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sufibuildwith-py/Lpcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Laptop Care (Motion &amp; Physics Engineering)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Communication (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#64131C] font-bold mb-2">
              Direct Contact
            </span>
            <div className="flex flex-col gap-3 text-xs text-[#FAF8F5]/75 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#64131C] shrink-0 mt-0.5" />
                <span>{PERSONAL_BRAND.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#64131C] shrink-0" />
                <a
                  href={`mailto:${PERSONAL_BRAND.email}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {PERSONAL_BRAND.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${PERSONAL_BRAND.phone.replace(/\s+/g, '')}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {PERSONAL_BRAND.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#FAF8F5]/10">
                <a
                  href={PERSONAL_BRAND.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors text-xs font-mono"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-[#FAF8F5]/30">·</span>
                <a
                  href={PERSONAL_BRAND.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors text-xs font-mono"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#FAF8F5]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FAF8F5]/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#FAF8F5]/40" />
            <span>&copy; {new Date().getFullYear()} SUFIYAN KHAN. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#FAF8F5]/40">“Agents reason. Deterministic guardrails decide.”</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
