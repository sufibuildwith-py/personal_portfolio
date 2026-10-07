import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const INTEREST_CHIPS = [
  'AI & Agentic Systems',
  'Backend Control Plane',
  'PostgreSQL & Ledgers',
  'Offline Desktop Tooling',
  'System Graph & Change Impact',
  'Forward-Deployed Contract',
  'Full-Stack Architecture',
  'Codebase Review & Hardening',
]

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    organization: '',
    selectedInterests: [] as string[],
    description: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleInterest = (chip: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(chip)
        ? prev.selectedInterests.filter((p) => p !== chip)
        : [...prev.selectedInterests, chip],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Dynamically load confetti only when triggered, saving initial JS payload
    import('canvas-confetti')
      .then((m) => {
        const confetti = m.default
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#64131C', '#171615', '#6E6A64', '#FAF8F5'],
        })
      })
      .catch(() => {})

    setTimeout(() => {
      const msg = encodeURIComponent(
        `Hello Sufiyan,\n\nI'm reaching out regarding an engineering project / inquiry.\n\n` +
          `• Name: ${formData.name}\n` +
          `• Contact: ${formData.contact}\n` +
          `• Organization: ${formData.organization || 'Independent'}\n` +
          `• Focus Areas: ${formData.selectedInterests.join(', ') || 'General Engineering Inquiry'}\n` +
          `• Scope / Details: ${formData.description || 'None'}`
      )
      // Open WhatsApp securely
      window.open(`https://wa.me/918299625564?text=${msg}`, '_blank', 'noopener,noreferrer')

      setIsSubmitted(false)
      onClose()
    }, 1800)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171615]/65 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-[#171615]/10 p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-auto text-[#171615] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#171615]/10 flex items-center justify-center text-[#6E6A64] hover:text-[#171615] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#171615]">
                Inquiry Initialized
              </h3>
              <p className="text-sm text-[#6E6A64] max-w-md font-normal leading-relaxed">
                Connecting you directly with Sufiyan Khan. Opening direct channel (+91 8299625564)...
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Forward-Deployed Engineering Desk</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171615]">
                  Discuss a System
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6A64] font-normal mt-1">
                  Tell me what you are building. Let&apos;s discuss architecture, data models, and deployment boundaries.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6E6A64] mb-1.5 font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171615]/10 text-[#171615] placeholder:text-[#6E6A64]/40 text-sm focus:outline-none focus:border-[#64131C] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6E6A64] mb-1.5 font-semibold">
                      Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="alex@domain.com or phone"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171615]/10 text-[#171615] placeholder:text-[#6E6A64]/40 text-sm focus:outline-none focus:border-[#64131C] transition-colors"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6E6A64] mb-1.5 font-semibold">
                    Company / Organization / Project
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise Ops or Stealth Project"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171615]/10 text-[#171615] placeholder:text-[#6E6A64]/40 text-sm focus:outline-none focus:border-[#64131C] transition-colors"
                  />
                </div>

                {/* Focus Area Chips */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6E6A64] mb-2 font-semibold">
                    Focus Areas (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {INTEREST_CHIPS.map((chip) => {
                      const isSelected = formData.selectedInterests.includes(chip)
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleInterest(chip)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                            isSelected
                              ? 'bg-[#171615] border-[#171615] text-[#FAF8F5] font-semibold shadow-sm'
                              : 'bg-white border-[#171615]/10 text-[#6E6A64] hover:border-[#171615]/30 hover:text-[#171615]'
                          }`}
                        >
                          {chip}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6E6A64] mb-1.5 font-semibold">
                    System Requirements / Scope (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the system, constraints, or timeline..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171615]/10 text-[#171615] placeholder:text-[#6E6A64]/40 text-sm focus:outline-none focus:border-[#64131C] transition-colors resize-none"
                  />
                </div>

                {/* Assurance Banner */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#171615]/8 text-[11px] text-[#6E6A64]">
                  <AlertCircle className="w-4 h-4 text-[#64131C] shrink-0" />
                  <span>
                    Direct technical consultation. No sales intermediaries. Straight from architecture to implementation.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#171615] hover:bg-[#64131C] text-[#FAF8F5] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm active:scale-[0.99] mt-1"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ContactModal
