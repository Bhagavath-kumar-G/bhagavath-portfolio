import { useRef, useState, type KeyboardEvent } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { useTheme } from '../context/useTheme'

export default function HangingLampCord() {
  const { isDark, toggleTheme } = useTheme()
  const [isPulling, setIsPulling] = useState(false)
  const isDraggingRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  // Single source of truth for the vertical pull displacement
  const y = useMotionValue(0)

  // Anchor and layout geometry (all in px, sharing the exact same coordinate system)
  // Bracket is at y = 0..8, cord starts at y = 8
  // Bead is positioned at top = 76px, with height = 26px
  // The cord line ends at y = 78 + y, penetrating 2px into the bead top cap
  const cordY2 = useTransform(y, (latestY) => (shouldReduceMotion ? 78 : 78 + latestY))

  const playClickAnimation = () => {
    toggleTheme()

    if (shouldReduceMotion) {
      y.set(0)
      setIsPulling(false)
      return
    }

    animate(y, [0, 26, -5, 2, 0], {
      duration: 0.5,
      times: [0, 0.28, 0.6, 0.82, 1],
      ease: [0.25, 1, 0.5, 1],
    }).then(() => {
      setIsPulling(false)
    })
  }

  const handleDragStart = () => {
    isDraggingRef.current = true
    setIsPulling(true)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged past 16px threshold, switch theme
    if (info.offset.y > 16) {
      toggleTheme()
    }

    setIsPulling(false)

    // Suppress trailing click event after drag
    setTimeout(() => {
      isDraggingRef.current = false
    }, 80)
  }

  const handleClick = () => {
    if (isDraggingRef.current) return
    setIsPulling(true)
    playClickAnimation()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsPulling(true)
      playClickAnimation()
    }
  }

  return (
    <div
      className="fixed top-0 right-20 sm:right-24 md:right-12 lg:right-16 z-50 pointer-events-auto select-none"
      style={{ width: 32, height: 180 }}
      aria-label="Interactive Lamp Pull-Cord Theme Switcher"
    >
      {/* Ceiling Mount Bracket: centered at x = 16, height 8px */}
      <div
        className="absolute top-0 left-2 w-4 h-2 bg-[#383838] dark:bg-[#383838] light:bg-[#DCD8CE] rounded-b-sm border-x border-b border-[#383838]/60 light:border-[#DCD8CE] shadow-sm pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Canvas for the cord line: x = 16 is exact center of the bracket and bead */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <motion.line
          x1="16"
          y1="8"
          x2="16"
          y2={cordY2}
          className="stroke-[#A3A3A3]/70 dark:stroke-[#A3A3A3]/60 light:stroke-[#8A857A]/60 transition-colors"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Weighted Pendant Finial / Pull Bead Button */}
      <motion.button
        type="button"
        drag="y"
        dragSnapToOrigin={true}
        dragConstraints={{ top: 0, bottom: 42 }}
        dragElastic={0.2}
        style={{
          y,
          top: 76,
          left: 9,
          width: 14,
          height: 26,
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        className="group absolute cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8C4B8] light:focus-visible:ring-[#8A857A] rounded-full z-10 flex items-center justify-center bg-[#C8C4B8] dark:bg-[#C8C4B8] light:bg-[#8A857A] border border-[#383838]/40 dark:border-[#383838]/40 light:border-[#DCD8CE] shadow-md transition-colors hover:bg-[#F2F0E9] dark:hover:bg-[#F2F0E9] light:hover:bg-[#171717] before:absolute before:-inset-2.5 before:content-['']"
        aria-label={`Current theme is ${isDark ? 'dark' : 'light'}. Pull cord to switch to ${
          isDark ? 'light' : 'dark'
        } mode.`}
        title={`Click or drag to switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Bead Cylinder tactile central ring */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#171717] dark:bg-[#171717] light:bg-[#F7F6F2] opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Subtle Tooltip Tag on hover/focus */}
        <span
          className="absolute top-9 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-[10px] font-mono tracking-widest uppercase py-1 px-2.5 rounded bg-[#222222] dark:bg-[#222222] light:bg-[#ECEAE4] text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] border border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] shadow-lg"
          aria-hidden="true"
        >
          {isPulling ? 'RELEASE' : isDark ? 'PULL LIGHT' : 'PULL DARK'}
        </span>
      </motion.button>
    </div>
  )
}
