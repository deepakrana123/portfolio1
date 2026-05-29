import { motion } from 'framer-motion'
import { Download, Sparkles, ArrowRight } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import { useMagnetic } from '../hooks/useMagnetic'

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

const socialLinks = [
  { icon: GithubIcon,   href: 'https://github.com',   label: 'GitHub'   },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterXIcon, href: 'https://twitter.com',  label: 'Twitter'  },
]

const stats = [
  { value: '4+',  label: 'Years Exp.',   color: 'from-indigo-400 to-violet-400' },
  { value: '50+', label: 'Projects',     color: 'from-violet-400 to-pink-400'   },
  { value: '15+', label: 'Technologies', color: 'from-cyan-400 to-indigo-400'   },
  { value: '99%', label: 'Satisfaction', color: 'from-emerald-400 to-cyan-400'  },
]

const EASE = [0.23, 1, 0.32, 1]
const anim = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE },
})

export default function Hero() {
  const ctaRef = useMagnetic(0.28)
  const cvRef  = useMagnetic(0.28)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* 3D Canvas — right half on desktop */}
      <div className="absolute inset-0 md:left-[46%]">
        <HeroCanvas />
      </div>

      {/* Left gradient mask */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[60%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #050810 0%, #050810 40%, rgba(5,8,16,0.92) 58%, rgba(5,8,16,0.4) 78%, transparent 100%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050810 0%, transparent 100%)' }}
      />

      {/* ── Main content — truly centered in viewport ── */}
      <div className="relative z-10 container-xl w-full">
        {/*
          pt-24 pushes content below the fixed navbar (≈72px) with extra breathing room.
          The section is min-h-screen flex items-center, so the remaining space
          is distributed equally above and below — giving true vertical centering.
        */}
        <div className="max-w-[580px] pt-24 pb-12 md:pt-28 md:pb-16">

          {/* 1 ── Availability badge */}
          <motion.div {...anim(0)} className="mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-3 glass-strong rounded-full text-sm font-medium text-indigo-300 border border-indigo-500/20 leading-none">
              <Sparkles size={12} className="text-indigo-400 shrink-0" />
              Available for new opportunities
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0 mr-4" />
            </span>
          </motion.div>

          {/* 2 ── Main heading */}
          <motion.div {...anim(0.1)} className="mb-6">
            <h1
              className="font-black text-slate-50"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.06,
                letterSpacing: '-0.035em',
              }}
            >
              Hi, I'm{' '}
              <span className="shimmer-text">Devendra</span>
            </h1>
          </motion.div>

          {/* 3 ── Role subtitle */}
          <motion.div
            {...anim(0.2)}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-8"
          >
            <span
              className="text-xl md:text-2xl font-semibold text-gradient leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Full Stack Developer
            </span>
            <span className="text-slate-700 text-xl leading-none select-none">·</span>
            <span className="text-lg md:text-xl text-slate-400 font-medium leading-snug">
              Python &amp; React Expert
            </span>
          </motion.div>

          {/* 4 ── Description */}
          <motion.p
            {...anim(0.3)}
            className="text-slate-400 text-[0.9375rem] leading-[1.85] mb-10 max-w-[500px]"
          >
            Crafting high-performance web applications with{' '}
            <span className="text-indigo-400 font-medium">Python backends</span> and{' '}
            <span className="text-cyan-400 font-medium">React frontends</span>.
            Passionate about scalable architecture, clean code, and exceptional user experiences.
          </motion.p>

          {/* 5 ── CTA buttons */}
          <motion.div {...anim(0.4)} className="flex flex-wrap gap-4 mb-10">
            <motion.a
              ref={ctaRef}
              href="#projects"
              className="btn-primary group"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
            <motion.a
              ref={cvRef}
              href="/resume.pdf"
              className="btn-secondary group"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </motion.div>

          {/* 6 ── Social links */}
          <motion.div {...anim(0.5)} className="flex items-center gap-4 mb-12" style={{
            marginTop:"8px",
            marginBottom:"8px"
          }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 glass-card neon-border rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors duration-200"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon />
              </motion.a>
            ))}
            <div className="h-px w-10 bg-gradient-to-r from-slate-600 to-transparent ml-1" />
            <span className="text-slate-500 text-xs leading-none tracking-[0.14em] uppercase font-medium">
              Follow me
            </span>
          </motion.div>

          {/* 7 ── Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.55, ease: EASE }}
                whileHover={{ y: -3 }}
                className="glass-card neon-border rounded-2xl px-3 py-5 text-center cursor-default"
              >
                <div
                  className={`text-[1.5rem] font-black leading-none mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.6rem] text-slate-500 font-semibold leading-none tracking-[0.1em] uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
      >
        <span className="text-slate-700 text-[0.6rem] leading-none tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-slate-800 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-indigo-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
