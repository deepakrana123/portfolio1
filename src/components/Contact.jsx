import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MessageSquare, Send, MapPin, Clock, CheckCircle, Loader, ArrowRight } from 'lucide-react'
import { fadeUp, slideLeft, slideRight } from '../lib/animations'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'devendra@dev.io',
    href: 'mailto:devendra@dev.io',
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India · Remote Friendly',
    href: null,
    gradient: 'from-cyan-500 to-indigo-600',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    gradient: 'from-emerald-500 to-cyan-600',
  },
]

const socials = [
  { icon: GithubIcon,   href: 'https://github.com',   label: 'GitHub'   },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterXIcon, href: 'https://twitter.com',  label: 'Twitter'  },
]

const EASE = [0.23, 1, 0.32, 1]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1800))
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormState({ name: '', email: '', subject: '', message: '' })
    }, 3500)
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      <div
        className="absolute top-1/2 left-0 w-[480px] h-[480px] rounded-full opacity-[0.14] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.1] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-xl" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="section-header"
        >
          <span className="section-label glass-strong border border-emerald-500/20 text-emerald-400">
            Get In Touch
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Build{' '}
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-slate-500 text-base leading-[1.75] max-w-[440px] mx-auto mt-4">
            Open to senior / lead roles, freelance projects, and interesting collaborations
          </p>
        </motion.div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left — contact info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            className="lg:col-span-2 space-y-4"
          >
            {/* Availability card */}
            <div className="glass-strong neon-border rounded-3xl p-7 border border-indigo-500/[0.14]">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                <span className="text-emerald-400 font-semibold text-sm">Available for Work</span>
              </div>
              <p className="text-slate-400 text-[0.875rem] leading-[1.8]">
                Currently open to{' '}
                <span className="text-slate-200 font-medium">Senior Full Stack</span> and{' '}
                <span className="text-slate-200 font-medium">Lead Engineer</span> positions at innovative companies.
              </p>
            </div>

            {/* Contact info rows */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href, gradient }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.09, ease: EASE }}
                  className="glass-card neon-border rounded-2xl px-5 py-4 flex items-center gap-4"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-md`}>
                    <Icon size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] text-slate-600 tracking-[0.12em] uppercase mb-1 font-semibold">{label}</p>
                    {href ? (
                      <a href={href} className="text-[0.875rem] text-slate-200 font-medium hover:text-indigo-400 transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[0.875rem] text-slate-200 font-medium">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card neon-border rounded-2xl px-6 py-5">
              <p className="text-[0.6rem] text-slate-600 tracking-[0.12em] uppercase mb-4 font-semibold">Find me on</p>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors duration-200 border border-white/[0.05]"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.3}
            className="lg:col-span-3"
          >
            <div className="glass-card neon-border rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-indigo-500/[0.06] to-transparent rounded-3xl pointer-events-none" />

              {/* Form header */}
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-bold text-slate-100 leading-none mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Send a Message
                  </h4>
                  <p className="text-slate-600 text-xs">I'll get back to you within 24 hours</p>
                </div>
              </div>

              {/* Success state */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: EASE }}
                  className="flex flex-col items-center justify-center py-16 gap-5"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/[0.12] flex items-center justify-center">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <h4
                    className="text-lg font-bold text-slate-100"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-slate-400 text-sm text-center leading-[1.75] max-w-[280px]">
                    Thanks for reaching out. I'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.65rem] text-slate-600 tracking-[0.12em] uppercase mb-2.5 font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] text-slate-600 tracking-[0.12em] uppercase mb-2.5 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[0.65rem] text-slate-600 tracking-[0.12em] uppercase mb-2.5 font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      placeholder="Senior Engineer Role at Your Company"
                      className="input-field"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[0.65rem] text-slate-600 tracking-[0.12em] uppercase mb-2.5 font-semibold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about the role, project, or opportunity..."
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02, y: status === 'loading' ? 0 : -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={14} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                        <ArrowRight size={13} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
