import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/useTheme'

export default function AmbientSpotlight() {
  const { isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  // Initialize pointer support lazily without triggering cascading renders
  const [isPointerFine, setIsPointerFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })

  // Track cursor coordinates
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const targetOpacity = useMotionValue(0)

  // High-inertia damped spring physics for an organic liquid follow
  const springX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 0.6 })
  const springOpacity = useSpring(targetOpacity, { stiffness: 200, damping: 25 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      targetOpacity.set(1)
    }

    const handleMouseLeave = () => {
      targetOpacity.set(0)
    }

    const handleMouseEnter = () => {
      targetOpacity.set(1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, targetOpacity])

  // Disable on mobile/touch screens or when reduced motion is preferred
  if (!isPointerFine || shouldReduceMotion) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          opacity: springOpacity,
        }}
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none will-change-transform"
      >
        <div
          className={`w-full h-full rounded-full transition-opacity duration-500 ${
            isDark
              ? 'bg-[radial-gradient(circle,rgba(200,196,184,0.045)_0%,rgba(200,196,184,0.015)_40%,transparent_70%)]'
              : 'bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.25)_40%,transparent_70%)]'
          }`}
        />
      </motion.div>
    </div>
  )
}
