export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
}

export const projectsData: Project[] = [
  {
    id: 'teamforge',
    number: '01',
    title: 'TeamForge',
    category: 'AI / Team Collaboration',
    description:
      'An intelligent team formation and collaboration platform engineered to match complementary skill sets, align project objectives, and streamline team assembly for hackathons and engineering sprints.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AI Matching'],
    imageUrl: '/assets/projects/teamforge.svg',
  },
  {
    id: 'aquabots',
    number: '02',
    title: 'AquaBots',
    category: 'Civic Tech / IoT & Disaster Response',
    description:
      'A smart panchayat drainage management and flood-response platform. Integrates citizen grievance logging with IoT telemetry, AI-assisted hazard classification, spatial duplicate detection, and live operational analytics.',
    technologies: ['React 19', 'TypeScript', 'Leaflet', 'Node.js', 'MongoDB', 'i18next'],
    imageUrl: '/assets/projects/aquabots.svg',
  },
  {
    id: 'smart-somangalam',
    number: '03',
    title: 'Smart Somangalam',
    category: 'Civic Tech / Rural Governance',
    description:
      'A civic-tech dashboard and citizen service interface engineered for Somangalam Village Panchayat (Meri Panchayat – Gramathon 2026). Facilitates emergency triage, public safety alerts, women’s SHG livelihoods, and transparent Gram Sabha democracy.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide React'],
    imageUrl: '/assets/projects/smart-somangalam.svg',
  },
  {
    id: 'resumeiq',
    number: '04',
    title: 'ResumeIQ',
    category: 'AI / Resume Intelligence',
    description:
      'ResumeIQ is an AI-powered resume analysis project designed to extract useful information from resumes and support intelligent resume evaluation.',
    technologies: ['React 19', 'Express.js', 'Google Gemini AI', 'MongoDB', 'PDF-Parse'],
    imageUrl: '/assets/projects/resumeiq.svg',
    liveUrl: 'https://0-to-shipped-resume-parser-hugu.vercel.app/',
  },
]

