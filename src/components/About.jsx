import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, MapPin, Coffee, Rocket, Heart, Code, ArrowRight } from 'lucide-react'
import { fadeUp, slideLeft, slideRight } from '../lib/animations'

const traits = [
  { icon: Code,   label: 'Clean Code Advocate', color: 'text-indigo-400', bg: 'bg-indigo-500/[0.07]',  border: 'border-indigo-500/[0.12]' },
  { icon: Rocket, label: 'Performance Obsessed', color: 'text-violet-400', bg: 'bg-violet-500/[0.07]',  border: 'border-violet-500/[0.12]' },
  { icon: Heart,  label: 'Open Source Lover',    color: 'text-pink-400',   bg: 'bg-pink-500/[0.07]',    border: 'border-pink-500/[0.12]'   },
  { icon: Coffee, label: 'Continuous Learner',   color: 'text-cyan-400',   bg: 'bg-cyan-500/[0.07]',    border: 'border-cyan-500/[0.12]'   },
]

const highlights = [
  { number: '4+',   text: 'Years of professional experience building production-grade systems', color: 'text-gradient' },
  { number: '50+',  text: 'Projects delivered across startups and enterprise clients',          color: 'text-gradient-cyan' },
  { number: '10M+', text: "Users served through applications I've built and maintained",        color: 'text-gradient-warm' },
]

const EASE = [0.23, 1, 0.32, 1]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    /* Remove overflow-hidden so floating cards don't get clipped */
    <section id="about" className="relative section-pad">
      <div className="absolute inset-0 grid-bg opacity-[0.1]" />
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full opacity-[0.15] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
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
          <span className="section-label glass-strong border border-indigo-500/20 text-indigo-400">
            About Me
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Developer{' '}
            <span className="text-gradient">Behind the Code</span>
          </h2>
          <p className="text-slate-500 text-base leading-[1.75] max-w-[480px] mx-auto mt-4">
            Turning complex problems into elegant, scalable solutions
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        {/*
          px-6 on the grid wrapper gives the floating cards room to breathe
          without being clipped. gap-12 lg:gap-20 gives proper column separation.
        */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-2 sm:px-6 lg:px-8">

          {/* ── Left — Profile card ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            /* py-8 gives the floating accent cards vertical room */
            className="relative py-8"
          >
            <div className="glass-card neon-border rounded-3xl p-8 md:p-10 relative card-lift">
              {/* Corner tints */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-indigo-500/[0.07] to-transparent rounded-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-500/[0.05] to-transparent rounded-3xl pointer-events-none" />

              {/* Avatar */}
              <div className="relative w-20 h-20 mb-7">
                <div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-indigo-500/20"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  D
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-400 rounded-lg flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Name & role */}
              <h3
                className="text-lg font-bold leading-tight text-slate-100 mb-1.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Devendra
              </h3>
              <p className="text-indigo-400 font-medium text-sm leading-snug mb-3">
                Senior Full Stack Developer
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-sm leading-none mb-8">
                <MapPin size={12} />
                <span>India · Remote Friendly</span>
              </div>

              {/* Trait pills */}
              <div className="grid grid-cols-2 gap-2.5">
                {traits.map(({ icon: Icon, label, color, bg, border }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 ${bg} border ${border} rounded-xl px-3 py-3`}
                  >
                    <Icon size={12} className={`${color} shrink-0`} />
                    <span className="text-xs text-slate-400 font-medium leading-none">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating accent — top right, inside the py-8 wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 glass-strong rounded-2xl px-4 py-3 border border-indigo-500/20 shadow-lg hidden sm:block z-10"
            >
              <div className="text-[0.6rem] text-slate-600 leading-none tracking-[0.12em] uppercase mb-1.5 font-semibold">
                Current Stack
              </div>
              <div
                className="text-sm font-bold leading-none text-gradient"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Python · React · AWS
              </div>
            </motion.div>

            {/* Floating accent — bottom left, inside the py-8 wrapper */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-0 left-0 glass-strong rounded-2xl px-4 py-3 border border-violet-500/20 shadow-lg hidden sm:block z-10"
            >
              <div className="text-[0.6rem] text-slate-600 leading-none tracking-[0.12em] uppercase mb-1.5 font-semibold">
                Open to
              </div>
              <div
                className="text-sm font-bold leading-none text-violet-400"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Senior / Lead Roles
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right — Text content ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.3}
            className="py-4"
          >
            <h3
              className="text-slate-100 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Building the future,{' '}
              <span className="text-gradient">one commit at a time</span>
            </h3>

            <p className="text-slate-400 text-[0.9375rem] leading-[1.85] mb-6 max-w-[520px]">
              I'm a full-stack developer with{' '}
              <span className="text-indigo-400 font-medium">4+ years of experience</span> crafting
              scalable web applications. My expertise spans Python-based backends (FastAPI, Django)
              and modern React frontends, with a strong focus on performance and developer experience.
            </p>
            <p className="text-slate-400 text-[0.9375rem] leading-[1.85] mb-10 max-w-[520px]">
              I've worked with startups and enterprise teams, shipping features used by millions.
              I care deeply about{' '}
              <span className="text-violet-400 font-medium">clean architecture</span>,
              test coverage, and building systems that scale gracefully under pressure.
            </p>

            {/* Highlight cards */}
            <div className="space-y-3.5 mb-10"style={{
              marginTop:"5px"
            }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.65, ease: EASE }}
                  className="flex items-start gap-5 glass-card neon-border rounded-2xl px-6 py-5"
                   style={{
                    marginTop:"4px"
                   }}>
                  <div
                    className={`text-xl font-black leading-none ${item.color} shrink-0 pt-0.5 min-w-[3rem]`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.number}
                  </div>
                  <p className="text-slate-400 text-sm leading-[1.75]">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="btn-primary inline-flex group"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop:"2px"
              }}
            >
              <User size={14} />
              Let's Connect
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
