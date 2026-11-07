import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Mail, Copy, Check, ExternalLink, MapPin, Send, AlertCircle } from 'lucide-react'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.06,
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const activeItemVariants = shouldReduceMotion ? reducedVariants : itemVariants

  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const emailAddress = 'bhagavathg1382008@gmail.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName) {
      errs.name = 'Please provide your name.'
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmedEmail) {
      errs.email = 'Please provide your email address.'
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!trimmedMessage) {
      errs.message = 'Please provide a message.'
    } else if (trimmedMessage.length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    )
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      aria-label="Contact Bhagavath Kumar"
      className="py-24 sm:py-32 border-t border-[#383838]/60 relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={shouldReduceMotion ? reducedVariants : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.15 }}
        >
          {/* Section Header */}
          <motion.div variants={activeItemVariants} className="mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#A3A3A3] mb-4">
              04 / GET IN TOUCH
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F0E9] leading-tight max-w-3xl">
              Let's build something thoughtful together.
            </h2>
            <p className="text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed mt-4 max-w-2xl">
              Whether you have a hackathon inquiry, an interesting project idea, or just want to discuss software and AI, I'd love to connect.
            </p>
          </motion.div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Direct Channels (5 cols) */}
            <motion.div variants={activeItemVariants} className="lg:col-span-5 space-y-8">
              {/* Email Direct Card */}
              <div className="p-6 sm:p-8 bg-[#222222]/40 border border-[#383838]">
                <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#A3A3A3] font-medium mb-3">
                  <Mail className="w-4 h-4 text-[#C8C4B8]" aria-hidden="true" />
                  <span>DIRECT EMAIL</span>
                </div>

                <a
                  href={`mailto:${emailAddress}`}
                  className="block text-base sm:text-lg font-medium text-[#F2F0E9] hover:text-[#C8C4B8] transition-colors break-all mb-4"
                >
                  {emailAddress}
                </a>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-[#383838]/40">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wider uppercase border border-[#383838] bg-[#171717] hover:border-[#C8C4B8]/60 text-[#F2F0E9] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8C4B8]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8C4B8]" aria-hidden="true" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#A3A3A3]" aria-hidden="true" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wider uppercase border border-[#383838] bg-[#171717] hover:border-[#C8C4B8]/60 text-[#F2F0E9] transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-1 focus:ring-[#C8C4B8]"
                  >
                    <span>OPEN CLIENT</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A3A3A3]" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Location & Academic Status */}
              <div className="p-6 bg-[#222222]/20 border border-[#383838] space-y-3">
                <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#A3A3A3]">
                  <MapPin className="w-4 h-4 text-[#C8C4B8]" aria-hidden="true" />
                  <span>LOCATION &amp; ACADEMICS</span>
                </div>
                <p className="text-sm text-[#F2F0E9] font-normal">
                  Chennai, Tamil Nadu, India
                </p>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  First-year Computer Science &amp; Engineering student at Sri Sairam Engineering College. Open to hackathons, open-source projects, and technical collaborations.
                </p>
              </div>

              {/* Profiles & Code (GitHub & LinkedIn only, X/Twitter skipped) */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3] font-medium mb-4">
                  PROFILES &amp; CODE
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://github.com/Bhagavath-kumar-G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-[#222222]/30 border border-[#383838] hover:border-[#C8C4B8]/60 text-[#F2F0E9] transition-all hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center gap-3">
                      <GithubIcon className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#F2F0E9] transition-colors" />
                      <span className="text-sm font-medium">GitHub / Bhagavath-kumar-G</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#C8C4B8] transition-colors" aria-hidden="true" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/bhagavath-kumar-g/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-[#222222]/30 border border-[#383838] hover:border-[#C8C4B8]/60 text-[#F2F0E9] transition-all hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center gap-3">
                      <LinkedinIcon className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#F2F0E9] transition-colors" />
                      <span className="text-sm font-medium">LinkedIn / bhagavath-kumar-g</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#C8C4B8] transition-colors" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Minimalist Contact Form (7 cols) */}
            <motion.div variants={activeItemVariants} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-8 sm:p-10 bg-[#222222]/30 border border-[#383838] space-y-6"
              >
                <div>
                  <h3 className="text-xl font-medium text-[#F2F0E9] tracking-tight mb-1">
                    Send a Message
                  </h3>
                  <p className="text-sm text-[#A3A3A3] font-normal">
                    Fill out the form below to initiate an email directly to my inbox via your preferred mail client.
                  </p>
                </div>

                {submitted && (
                  <div className="p-4 bg-[#171717] border border-[#C8C4B8]/50 text-xs text-[#F2F0E9] leading-relaxed">
                    Message prepared! Your email client has been triggered with the details. If your client didn't launch automatically, write directly to <span className="text-[#C8C4B8]">{emailAddress}</span>.
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-medium">
                    Your Name <span className="text-[#C8C4B8]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 bg-[#171717] border ${
                      errors.name ? 'border-rose-400/80' : 'border-[#383838]'
                    } text-[#F2F0E9] placeholder-[#A3A3A3]/50 text-sm font-normal focus:outline-none focus:border-[#C8C4B8] transition-colors`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="flex items-center gap-1.5 text-xs text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-medium">
                    Your Email <span className="text-[#C8C4B8]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 bg-[#171717] border ${
                      errors.email ? 'border-rose-400/80' : 'border-[#383838]'
                    } text-[#F2F0E9] placeholder-[#A3A3A3]/50 text-sm font-normal focus:outline-none focus:border-[#C8C4B8] transition-colors`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="flex items-center gap-1.5 text-xs text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-medium">
                    Message <span className="text-[#C8C4B8]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or collaboration inquiry..."
                    className={`w-full px-4 py-3 bg-[#171717] border ${
                      errors.message ? 'border-rose-400/80' : 'border-[#383838]'
                    } text-[#F2F0E9] placeholder-[#A3A3A3]/50 text-sm font-normal focus:outline-none focus:border-[#C8C4B8] transition-colors resize-y`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="flex items-center gap-1.5 text-xs text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2F0E9] hover:bg-[#C8C4B8] text-[#171717] font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C8C4B8] focus:ring-offset-2 focus:ring-offset-[#171717]"
                >
                  <span>Transmit Message</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
