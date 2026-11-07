import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import SlingButton from './SlingButton'

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function ConnectCta() {
  const { isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  const handleSend = () => {
    window.location.href = 'mailto:bhagavathg1382008@gmail.com'
  }

  // Theme-aware palette according to ink-wash specifications
  const padColor = isDark ? '#F2F0E9' : '#171717'
  const iconColor = isDark ? '#171717' : '#F7F6F2'
  const accentColor = isDark ? '#F2F0E9' : '#171717'
  const wellColor = isDark ? '#222222' : '#ECEAE4'
  const bandColor = isDark ? '#777777' : '#8A857A'

  return (
    <motion.section
      id="connect-cta"
      aria-label="Connect CTA"
      variants={shouldReduceMotion ? reducedVariants : ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px', amount: 0.2 }}
      className="py-16 sm:py-24 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center border-t border-[#383838]/40 dark:border-[#383838]/40 light:border-[#DCD8CE]/60"
    >
      {/* Small Section Tag */}
      <p className="text-xs font-medium tracking-[0.28em] uppercase text-[#A3A3A3] mb-3">
        LET'S CONNECT
      </p>

      {/* Supporting Text Heading */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F2F0E9] tracking-tight leading-tight mb-8 max-w-lg">
        Have an idea? Let's make it happen.
      </h3>

      {/* Interactive SlingButton */}
      <div className="flex flex-col items-center justify-center">
        <SlingButton
          onSend={handleSend}
          padColor={padColor}
          iconColor={iconColor}
          accentColor={accentColor}
          wellColor={wellColor}
          bandColor={bandColor}
          size={56}
          strokeWidth={3}
          armAt={56}
          maxPull={160}
          launchSpeed={1800}
          recoil={0.15}
          flight={100}
          particles={10}
          spread={50}
          axis="any"
          tapSends={true}
          ariaLabel="Email Bhagavath"
        />

        <p className="text-[11px] sm:text-xs text-[#A3A3A3]/70 tracking-wider uppercase mt-5 select-none pointer-events-none">
          Pull &amp; release or tap to email
        </p>
      </div>
    </motion.section>
  )
}

