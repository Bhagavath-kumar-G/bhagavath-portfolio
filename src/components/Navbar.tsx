import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion, LayoutGroup } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavItem {
  name: string
  href: string
  id: string
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Journey', href: '#journey', id: 'journey' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const SECTION_IDS = ['home', 'about', 'projects', 'journey', 'contact']

interface MagneticNavItemProps {
  name: string
  href: string
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

function MagneticNavItem({ name, href, isActive, onClick }: MagneticNavItemProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth magnetic follow and elastic release
  const springX = useSpring(x, { stiffness: 350, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 350, damping: 20, mass: 0.4 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.25
    const deltaY = (e.clientY - centerY) * 0.25

    // Clamped subtle magnetic range (±5px horizontal, ±3.5px vertical)
    x.set(Math.max(-5, Math.min(5, deltaX)))
    y.set(Math.max(-3.5, Math.min(3.5, deltaY)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-current={isActive ? 'location' : undefined}
      className={`relative text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 py-1.5 px-3 rounded-full group inline-flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8C4B8] dark:focus-visible:ring-[#C8C4B8] light:focus-visible:ring-[#8A857A] ${
        isActive
          ? 'text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] font-semibold'
          : 'text-[#A3A3A3] hover:text-[#F2F0E9] dark:hover:text-[#F2F0E9] light:hover:text-[#171717]'
      }`}
    >
      {/* RubberSegment-inspired sliding active background indicator */}
      {isActive && (
        <motion.span
          layoutId="active-nav-indicator"
          className="absolute inset-0 rounded-full bg-[#222222]/50 border border-[#383838]/70 -z-10 shadow-xs pointer-events-none"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                  mass: 0.8,
                }
          }
        />
      )}

      <span className="relative z-10">{name}</span>

      {/* Subtle hover micro-indicator dot for inactive items */}
      {!isActive && (
        <motion.span
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-1 h-1 rounded-full bg-[#C8C4B8] dark:bg-[#C8C4B8] light:bg-[#8A857A] absolute -bottom-0.5"
          aria-hidden="true"
        />
      )}
    </motion.a>
  )
}

function MagneticLogo({ onClick }: { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 350, damping: 22, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 350, damping: 22, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.16
    const deltaY = (e.clientY - centerY) * 0.16

    x.set(Math.max(-4, Math.min(4, deltaX)))
    y.set(Math.max(-2.5, Math.min(2.5, deltaY)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href="#home"
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-wider uppercase text-[#F2F0E9] hover:text-[#C8C4B8] dark:hover:text-[#C8C4B8] light:hover:text-[#8A857A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8C4B8] rounded-sm"
      aria-label="Bhagavath Kumar — Home"
    >
      <span>BHAGAVATH KUMAR</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C8C4B8] dark:bg-[#C8C4B8] light:bg-[#8A857A] opacity-70 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScrollBackground = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScrollBackground, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollBackground)
  }, [])

  // Viewport-based active section detection
  useEffect(() => {
    const detectActiveSection = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Edge Case 1: Page top
      if (scrollY < 80) {
        setActiveSection('home')
        return
      }

      // Edge Case 2: Page bottom (Contact / CTA reached)
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection('contact')
        return
      }

      // Consistent reference threshold below the fixed navbar
      const refY = 140
      let candidate = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= refY) {
          candidate = id
        }
      }
      setActiveSection(candidate)
    }

    let ticking = false
    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    detectActiveSection()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  // Smooth scroll handler preserving native anchor destinations & history
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    const targetId = href.replace('#', '')
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
      window.history.pushState(null, '', href)
      return
    }

    const element = document.getElementById(targetId)
    if (element) {
      const targetTop = element.getBoundingClientRect().top + window.scrollY - 70
      requestAnimationFrame(() => {
        window.scrollTo({ top: Math.max(0, targetTop), behavior: shouldReduceMotion ? 'auto' : 'smooth' })
        window.history.pushState(null, '', href)
      })
    }
  }

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#171717]/90 dark:bg-[#171717]/90 light:bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] py-4 shadow-xs'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:pr-24 lg:pr-28 flex items-center justify-between">
        {/* Editorial Text Logo with magnetic feel */}
        <MagneticLogo onClick={(e) => handleNavClick(e, '#home')} />

        {/* Desktop Navigation with RubberSegment-inspired sliding indicator */}
        <LayoutGroup id="desktop-navbar">
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <MagneticNavItem
                key={item.id}
                name={item.name}
                href={item.href}
                isActive={activeSection === item.id}
                onClick={(e) => handleNavClick(e, item.href)}
              />
            ))}
          </nav>
        </LayoutGroup>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md text-[#A3A3A3] hover:text-[#F2F0E9] dark:hover:text-[#F2F0E9] light:hover:text-[#171717] hover:bg-[#222222] dark:hover:bg-[#222222] light:hover:bg-[#ECEAE4] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C8C4B8]"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </motion.button>
      </div>

      {/* Mobile Navigation Drawer with Active Highlighting */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] bg-[#171717]/95 dark:bg-[#171717]/95 light:bg-[#F7F6F2]/95 backdrop-blur-lg overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="px-6 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`text-base tracking-wide py-2.5 px-3 rounded-md transition-all flex items-center justify-between border-b border-[#222222] dark:border-[#222222] light:border-[#ECEAE4] ${
                      isActive
                        ? 'text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] font-semibold bg-[#222222]/50 dark:bg-[#222222]/50 light:bg-[#ECEAE4]/80'
                        : 'text-[#A3A3A3] hover:text-[#F2F0E9] dark:hover:text-[#F2F0E9] light:hover:text-[#171717]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#C8C4B8] dark:bg-[#C8C4B8] light:bg-[#8A857A]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
