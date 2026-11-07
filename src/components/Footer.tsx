import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: CUBIC_EASE,
    },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <motion.footer
      variants={shouldReduceMotion ? reducedVariants : footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-20px', amount: 0.1 }}
      className="border-t border-[#383838]/60 bg-transparent py-12 text-[#A3A3A3]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity and Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-medium text-[#F2F0E9] tracking-wider uppercase">
            BHAGAVATH KUMAR
          </p>
          <p className="text-xs text-[#A3A3A3]">
            &copy; {new Date().getFullYear()} Bhagavath Kumar. All rights reserved.
          </p>
        </div>

        {/* Center: Craft Note */}
        <div className="text-center">
          <p className="text-xs text-[#A3A3A3] max-w-md font-normal leading-relaxed">
            Designed with an ink-wash aesthetic &bull; Built with React, TypeScript &amp; Tailwind CSS v4.
          </p>
        </div>

        {/* Right: Back to Top Action */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A3A3A3] hover:text-[#F2F0E9] transition-all py-1.5 px-3 border border-[#383838] bg-[#222222]/40 hover:border-[#C8C4B8]/60 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8C4B8]"
            aria-label="Scroll back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#F2F0E9] group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.footer>
  )
}

