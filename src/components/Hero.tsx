import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useTheme } from '../context/useTheme'
import HalftoneReveal from './HalftoneReveal'

// Editorial cubic bezier easing curve (rapid initial rise, gentle deceleration)
const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

// Masked line reveal variant (slides up from behind overflow boundary)
const lineRevealVariants: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: CUBIC_EASE,
    },
  },
}

// Staggered fade-rise variant for body narrative and actions
const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: CUBIC_EASE,
    },
  },
}

// Cinematic bottom-to-top unmasking variant for portrait
const portraitMaskVariants: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.95,
      delay: 0.35,
      ease: CUBIC_EASE,
    },
  },
}

interface MagneticCtaProps {
  children: ReactNode
  href: string
  className: string
}

function MagneticCta({ children, href, className }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 350, damping: 22, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 350, damping: 22, mass: 0.5 })

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.18
    const deltaY = (e.clientY - centerY) * 0.18

    x.set(Math.max(-4, Math.min(4, deltaX)))
    y.set(Math.max(-3, Math.min(3, deltaY)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const { isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const inkColor = isDark ? '#F2F0E9' : '#171717'
  const paperColor = isDark ? '#171717' : '#F7F6F2'

  // Subtle desktop scroll parallax (clamped to 6px maximum)
  const portraitParallax = useTransform(scrollY, [0, 500], [0, 6])

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 1024
  })

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeLineVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : lineRevealVariants

  const activeFadeVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : fadeRiseVariants

  const activePortraitVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
        visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
      }
    : portraitMaskVariants

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 sm:pt-40 sm:pb-16 max-w-6xl mx-auto px-6 sm:px-8 w-full"
    >
      {/* Editorial Split Composition: Left Typography + Right Portrait Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center my-auto w-full">
        {/* Left Column (7 cols): Editorial Typography, Narrative & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Editorial Sub-Heading (Masked line reveal) */}
          <div className="overflow-hidden mb-4 sm:mb-6">
            <motion.p
              variants={activeLineVariants}
              className="text-xs sm:text-sm font-medium tracking-[0.28em] uppercase text-[#A3A3A3]"
            >
              HELLO, I'M
            </motion.p>
          </div>

          {/* Hero Headline / Name (Masked line-by-line reveal with generous descender clearance) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F2F0E9] leading-[1.05] mb-6 sm:mb-8 flex flex-wrap gap-x-4 sm:gap-x-6">
            <span className="inline-block overflow-hidden pb-1 sm:pb-2">
              <motion.span variants={activeLineVariants} className="inline-block">
                BHAGAVATH
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-1 sm:pb-2">
              <motion.span variants={activeLineVariants} className="inline-block">
                KUMAR
              </motion.span>
            </span>
          </h1>

          {/* Main Tagline (Masked line reveal) */}
          <div className="overflow-hidden pb-1 mb-6">
            <motion.h2
              variants={activeLineVariants}
              className="text-xl sm:text-2xl md:text-3xl font-light text-[#F2F0E9]/90 tracking-tight leading-snug"
            >
              A Curious Mind Turning Ideas into Code.
            </motion.h2>
          </div>

          {/* Supporting Narrative Paragraph */}
          <motion.p
            variants={activeFadeVariants}
            className="text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed max-w-xl mb-10 sm:mb-12"
          >
            First-year Computer Science student interested in software development,
            artificial intelligence, and building useful digital products.
          </motion.p>

          {/* Call to Action Group */}
          <motion.div
            variants={activeFadeVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <MagneticCta
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F2F0E9] text-[#171717] font-medium text-sm tracking-wide hover:bg-[#C8C4B8] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8C4B8] focus:ring-offset-2 focus:ring-offset-[#171717] group"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </MagneticCta>

            <MagneticCta
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#383838] bg-[#222222]/50 hover:bg-[#222222] hover:border-[#C8C4B8]/60 text-[#F2F0E9] font-medium text-sm tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8C4B8] focus:ring-offset-2 focus:ring-offset-[#171717]"
            >
              <span>Get in Touch</span>
            </MagneticCta>
          </motion.div>
        </motion.div>

        {/* Right Column (5 cols): Editorial Portrait Frame in 4:5 Aspect Ratio */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <motion.div
            variants={activePortraitVariants}
            initial="hidden"
            animate="visible"
            style={{
              y: shouldReduceMotion || !isDesktop ? 0 : portraitParallax,
            }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px] aspect-[4/5] overflow-hidden border border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] bg-[#222222]/30 dark:bg-[#222222]/30 light:bg-[#ECEAE4] transition-colors duration-300 group shadow-sm"
          >
            <HalftoneReveal
              src="/assets/bhagavath-portrait.jpg"
              alt="Portrait of Bhagavath Kumar — Computer Science student and software developer"
              mode="mono"
              shape="dot"
              cellSize={6}
              angle={45}
              dotScale={0.75}
              contrast={1.4}
              revealRadius={150}
              softness={0.6}
              linger={1.0}
              clickBurst={!shouldReduceMotion}
              intro={!shouldReduceMotion}
              wander={false}
              inkColor={inkColor}
              paperColor={paperColor}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Subtle Editorial Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.65, ease: CUBIC_EASE }}
        className="pt-12 sm:pt-16"
      >
        <a
          href="#about"
          aria-label="Scroll down to explore"
          className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#A3A3A3] hover:text-[#F2F0E9] transition-colors duration-200"
        >
          <span>SCROLL</span>
          <span className="w-8 group-hover:w-12 h-[1px] bg-[#383838] group-hover:bg-[#C8C4B8] transition-all duration-300" />
          <ArrowDown className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#F2F0E9] group-hover:translate-y-1 transition-all duration-300" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  )
}
