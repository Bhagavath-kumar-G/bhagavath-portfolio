import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projectsData, type Project } from '../data/projectsData'

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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
  visible: { opacity: 1, y: 0 },
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const framerReducedMotion = useReducedMotion()

  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const shouldReduceMotion = Boolean(framerReducedMotion || prefersReduced)

  const [isPointerFine, setIsPointerFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(any-pointer: fine)').matches ||
      window.matchMedia('(pointer: fine)').matches
    )
  })

  useEffect(() => {
    const mqAny = window.matchMedia('(any-pointer: fine)')
    const mqPrimary = window.matchMedia('(pointer: fine)')
    const handlePointerChange = () => {
      setIsPointerFine(mqAny.matches || mqPrimary.matches)
    }
    mqAny.addEventListener('change', handlePointerChange)
    mqPrimary.addEventListener('change', handlePointerChange)
    return () => {
      mqAny.removeEventListener('change', handlePointerChange)
      mqPrimary.removeEventListener('change', handlePointerChange)
    }
  }, [])

  // Relative cursor coordinates inside the card for localized border illumination
  const spotX = useMotionValue(-1000)
  const spotY = useMotionValue(-1000)

  // Dynamic radial spotlight that tracks the cursor on the card surface
  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${spotX}px ${spotY}px, var(--card-spotlight), transparent 70%)`

  // Clearly noticeable but restrained 3D perspective tilt (max ±2deg)
  const rotateXTarget = useMotionValue(0)
  const rotateYTarget = useMotionValue(0)

  // Responsive spring with low mass and balanced damping for snappy, organic cursor tracking
  const rotateX = useSpring(rotateXTarget, { stiffness: 320, damping: 25, mass: 0.25 })
  const rotateY = useSpring(rotateYTarget, { stiffness: 320, damping: 25, mass: 0.25 })

  // Reset rotation if reduced-motion or coarse pointer is active
  useEffect(() => {
    if (shouldReduceMotion || !isPointerFine) {
      rotateXTarget.set(0)
      rotateYTarget.set(0)
    }
  }, [shouldReduceMotion, isPointerFine, rotateXTarget, rotateYTarget])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isPointerFine || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    spotX.set(relX)
    spotY.set(relY)

    // Normalized coordinates from card center clamped between -1 and 1
    const normX = Math.max(-1, Math.min(1, (relX - centerX) / centerX))
    const normY = Math.max(-1, Math.min(1, (relY - centerY) / centerY))

    // Noticeable but restrained ±2deg tilt (Option A: card face angles smoothly toward cursor)
    const MAX_TILT = 2
    rotateXTarget.set(-normY * MAX_TILT)
    rotateYTarget.set(normX * -MAX_TILT)
  }

  const handlePointerLeave = () => {
    spotX.set(-1000)
    spotY.set(-1000)
    rotateXTarget.set(0)
    rotateYTarget.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      variants={shouldReduceMotion ? reducedVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-50px', amount: 0.15 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.article
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        className="relative flex flex-col justify-between h-full bg-[#222222]/30 dark:bg-[#222222]/30 light:bg-[#ECEAE4] border border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] p-6 sm:p-8 rounded-none hover:border-[#C8C4B8]/60 dark:hover:border-[#C8C4B8]/60 light:hover:border-[#8A857A]/60 transition-colors duration-300 group overflow-hidden will-change-transform"
      >
        {/* Interactive Cursor-Tracking Surface Illumination */}
        {isPointerFine && !shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: spotlightBg }}
            aria-hidden="true"
          />
        )}

        {/* Card Content (Elevated above spotlight) */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Project Thumbnail with Consistent Visual Identity & Subtle Parallax Scale */}
            <div className="aspect-[16/10] overflow-hidden border border-[#383838] dark:border-[#383838] light:border-[#DCD8CE] bg-[#171717] dark:bg-[#171717] light:bg-[#ECEAE4] mb-6 relative">
              <motion.img
                src={project.imageUrl}
                alt={`${project.title} Interface Visualisation`}
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
              {/* Subtle ink-tint vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-transparent to-transparent opacity-60 dark:opacity-60 light:opacity-20 pointer-events-none transition-opacity" />
            </div>

            {/* Metadata Row */}
            <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-3">
              <span className="font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#6B6964]">{project.number}</span>
              <span className="text-[#C8C4B8] dark:text-[#C8C4B8] light:text-[#8A857A] font-medium">{project.category}</span>
            </div>

            {/* Project Title */}
            <h3 className="text-2xl font-medium text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] tracking-tight group-hover:text-[#C8C4B8] dark:group-hover:text-[#C8C4B8] light:group-hover:text-[#8A857A] transition-colors mb-3">
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="text-sm sm:text-base text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#6B6964] leading-relaxed mb-6 font-normal">
              {project.description}
            </p>
          </div>

          <div>
            {/* Technology Tags with Interactive Hover Accent */}
            <div
              className="flex flex-wrap gap-2 pt-4 border-t border-[#383838]/40 dark:border-[#383838]/40 light:border-[#DCD8CE] mb-6"
              aria-label="Technologies used"
            >
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#6B6964] bg-[#171717] dark:bg-[#171717] light:bg-[#ECEAE4] border border-[#383838]/70 dark:border-[#383838]/70 light:border-[#DCD8CE] transition-colors duration-200 group-hover:border-[#C8C4B8]/40 dark:group-hover:border-[#C8C4B8]/40 light:group-hover:border-[#8A857A]/50"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* External Links */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] hover:text-[#C8C4B8] dark:hover:text-[#C8C4B8] light:hover:text-[#8A857A] transition-colors group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8C4B8]"
                aria-label={`Visit live demo for ${project.title}`}
              >
                <span>Explore Live Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      aria-label="Featured Projects Gallery"
      className="py-24 sm:py-32 border-t border-[#383838]/60 relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          variants={shouldReduceMotion ? reducedVariants : itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#A3A3A3] mb-4">
            02 / SELECTED WORK
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F0E9] leading-tight max-w-3xl">
            Projects built with purpose and craft.
          </h2>
          <p className="text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed mt-4 max-w-2xl">
            A curated collection of work exploring artificial intelligence, civic-tech systems, and modern full-stack web applications.
          </p>
        </motion.div>

        {/* 4-Project Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
