import { motion, useReducedMotion, type Variants } from 'framer-motion'

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
}

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

const areasOfInterest = [
  'Full-stack Development',
  'Artificial Intelligence',
  'Problem Solving',
  'Product Building',
]

const currentlyExploring = [
  'React',
  'TypeScript',
  'Python',
  'Backend Development',
  'AI Integration',
]

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const activeItemVariants = shouldReduceMotion ? reducedVariants : itemVariants

  return (
    <section
      id="about"
      aria-label="About Bhagavath Kumar"
      className="py-24 sm:py-32 border-t border-[#383838]/60 relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header & Editorial Narrative Block */}
        <motion.div
          variants={shouldReduceMotion ? reducedVariants : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.15 }}
        >
          {/* Section Header */}
          <motion.div variants={activeItemVariants} className="mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#A3A3A3] mb-4">
              A LITTLE ABOUT ME
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F0E9] leading-tight max-w-3xl">
              Curiosity drives everything I build.
            </h2>
          </motion.div>

          {/* Editorial Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 sm:mb-20">
            {/* Introduction Lead */}
            <motion.div variants={activeItemVariants} className="lg:col-span-5">
              <p className="text-lg sm:text-xl text-[#F2F0E9]/95 font-light leading-relaxed">
                I am Bhagavath Kumar, a first-year Computer Science and Engineering student at{' '}
                <span className="text-[#F2F0E9] font-normal underline decoration-[#383838] underline-offset-4">
                  Sri Sairam Engineering College
                </span>.
              </p>
            </motion.div>

            {/* Personal Journey */}
            <motion.div variants={activeItemVariants} className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed">
              <p>
                I enjoy exploring software development, experimenting with AI, and turning practical ideas into digital products.
              </p>
              <p>
                My learning philosophy is rooted in action—building hands-on projects, collaborating with teammates, and participating in hackathons to tackle authentic engineering challenges.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Structured Content Grid: Areas of Interest & Currently Exploring */}
        <motion.div
          variants={shouldReduceMotion ? reducedVariants : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pt-10 border-t border-[#383838]/60"
        >
          {/* Areas of Interest */}
          <motion.div variants={activeItemVariants} className="md:col-span-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#A3A3A3] font-medium mb-6">
              AREAS OF INTEREST
            </h3>
            <ul className="space-y-3" role="list">
              {areasOfInterest.map((area, index) => (
                <motion.li
                  key={area}
                  variants={activeItemVariants}
                  className="flex items-center gap-4 py-3 border-b border-[#383838]/40 text-base text-[#F2F0E9] font-medium tracking-wide transition-colors hover:text-[#C8C4B8]"
                >
                  <span className="text-xs font-mono text-[#A3A3A3] w-6">
                    0{index + 1}
                  </span>
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Currently Exploring (Clean typographic list, no colorful cards) */}
          <motion.div variants={activeItemVariants} className="md:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#A3A3A3] font-medium mb-6">
                CURRENTLY EXPLORING
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-3.5 text-sm sm:text-base" role="list">
                {currentlyExploring.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2.5 text-[#F2F0E9]/90 py-1.5 transition-colors hover:text-[#C8C4B8]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8C4B8]" aria-hidden="true" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Quotation / Statement */}
            <blockquote className="mt-10 sm:mt-12 pt-6 border-t border-[#383838]/40">
              <p className="text-sm sm:text-base text-[#A3A3A3] italic font-light leading-relaxed">
                "The most effective way to understand complex systems is to assemble them from the ground up."
              </p>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
