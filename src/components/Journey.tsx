import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface JourneyEntry {
  number: string
  tag: string
  title: string
  context: string
  description: string
  highlights: string[]
}

const journeyEntries: JourneyEntry[] = [
  {
    number: '01',
    tag: 'COMPUTER SCIENCE JOURNEY',
    title: 'First-Year CSE Undergraduate',
    context: 'Sri Sairam Engineering College',
    description:
      'Pursuing a Bachelor of Engineering in Computer Science and Engineering with a steadfast commitment to mastering core computing fundamentals, algorithmic problem solving, and disciplined software architecture.',
    highlights: [
      'Focusing on Data Structures, Algorithms, and Object-Oriented Programming',
      'Actively exploring modern web development and system design patterns outside the classroom',
      'Engaging in collaborative peer learning and technical discussion circles',
    ],
  },
  {
    number: '02',
    tag: 'BUILDING & INNOVATION',
    title: 'Hands-on Project Development',
    context: 'TeamForge, AquaBots, ResumeIQ & Smart Somangalam',
    description:
      'Guided by a philosophy of learning through building. Developing end-to-end applications across civic-tech, automated document parsing, IoT disaster response, and team assembly platforms.',
    highlights: [
      'Built ResumeIQ: AI-powered resume intelligence system utilizing Google Gemini AI and Express.js',
      'Engineered AquaBots: Civic drainage telemetry and flood-response management platform',
      'Designed TeamForge: Algorithmic skill-matching platform for high-velocity hackathons',
      'Prototyped Smart Somangalam: Comprehensive rural governance and citizen service portal',
    ],
  },
  {
    number: '03',
    tag: 'HACKATHONS & COLLABORATION',
    title: 'Competitive Sprints & Hackathons',
    context: 'Gramathon 2026, Orion 2026, NASA Space Apps 2026',
    description:
      'Actively participating in engineering hackathons that demand rapid ideation, cross-functional teamwork, and delivering working prototypes under tight real-world constraints.',
    highlights: [
      'First Prize Winner at MERI PANCHAYAT — GRAMATHON 2026 for Smart Somangalam (rural civic-tech portal)',
      'Participated in NASA Space Apps Challenge 2026 exploring space science and data challenges',
      'Collaborated in Orion 2026 hackathon sprint focusing on intelligent collaborative workflows',
    ],
  },
  {
    number: '04',
    tag: 'CONTINUOUS LEARNING',
    title: 'Workshops & Self-Directed Growth',
    context: 'NPTEL, Coursera & Technical AI Programmes',
    description:
      'Complementing university coursework through rigorous online learning programmes, specialized technical workshops, and deliberate practice in modern technologies.',
    highlights: [
      'Active learning across NPTEL and Coursera courses in computer science and programming',
      'Participating in hands-on workshops on full-stack web architectures and modern AI tooling',
      'Consistent daily practice in coding, problem solving, and building practical utilities',
    ],
  },
]

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
}

export default function Journey() {
  const shouldReduceMotion = useReducedMotion()
  const activeItemVariants = shouldReduceMotion ? reducedVariants : itemVariants

  return (
    <section
      id="journey"
      aria-label="My Journey"
      className="py-24 sm:py-32 border-t border-[#383838]/60 relative"
    >
      {/* Anchor alias to support existing #experience navigation */}
      <div id="experience" aria-hidden="true" className="absolute -top-24" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div>
          {/* Section Header */}
          <motion.div
            variants={activeItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-50px', amount: 0.2 }}
            className="mb-14 sm:mb-20"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#A3A3A3] mb-4">
              THE JOURNEY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F0E9] leading-tight max-w-3xl">
              Learning. Building. Growing.
            </h2>
            <p className="text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed mt-4 max-w-2xl">
              A chronological view of my academic journey, hackathons, and practical software engineering milestones.
            </p>
          </motion.div>

          {/* Elegant Vertical Editorial Timeline */}
          <div className="relative border-l border-[#383838] pl-6 sm:pl-10 ml-2 sm:ml-4 space-y-14 sm:space-y-20">
            {journeyEntries.map((entry) => (
              <motion.article
                key={entry.number}
                variants={activeItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-50px', amount: 0.15 }}
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <span
                  className="w-3 h-3 rounded-full bg-[#171717] border-2 border-[#C8C4B8] absolute -left-[31px] sm:-left-[47px] top-1.5 transition-all duration-300 group-hover:bg-[#C8C4B8] group-hover:scale-125"
                  aria-hidden="true"
                />

                {/* Number & Category Tag Header */}
                <div className="flex items-center gap-3 text-xs tracking-wider uppercase mb-2">
                  <span className="font-mono text-[#C8C4B8] font-semibold">{entry.number}</span>
                  <span className="text-[#383838]">&bull;</span>
                  <span className="font-medium text-[#A3A3A3] tracking-[0.2em]">{entry.tag}</span>
                </div>

                {/* Entry Title */}
                <h3 className="text-xl sm:text-2xl font-medium text-[#F2F0E9] tracking-tight group-hover:text-[#C8C4B8] transition-colors">
                  {entry.title}
                </h3>

                {/* Context / Institution */}
                <p className="text-sm sm:text-base text-[#A3A3A3] font-normal mt-0.5 mb-4">
                  {entry.context}
                </p>

                {/* Narrative Summary */}
                <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-3xl mb-5 font-normal">
                  {entry.description}
                </p>

                {/* Verified Highlights List */}
                <ul className="space-y-2.5 pt-4 border-t border-[#383838]/40 max-w-3xl" role="list">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F2F0E9]/85 font-normal leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8C4B8] mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

