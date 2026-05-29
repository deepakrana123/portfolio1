import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsCanvas from './SkillsCanvas'
import { fadeUp, slideLeft, slideRight } from '../lib/animations'

const skillCategories = [
  {
    title: 'Backend',
    color: 'from-indigo-500 to-blue-500',
    border: 'border-indigo-500/[0.12]',
    accent: 'bg-indigo-500',
    skills: [
      { name: 'Python',         level: 95 },
      { name: 'FastAPI',        level: 90 },
      { name: 'Django',         level: 88 },
      { name: 'Node.js',        level: 80 },
      { name: 'REST / GraphQL', level: 92 },
    ],
  },
  {
    title: 'Frontend',
    color: 'from-cyan-500 to-indigo-500',
    border: 'border-cyan-500/[0.12]',
    accent: 'bg-cyan-500',
    skills: [
      { name: 'React / Next.js',  level: 93 },
      { name: 'TypeScript',       level: 88 },
      { name: 'TailwindCSS',      level: 95 },
      { name: 'Three.js / WebGL', level: 72 },
      { name: 'Framer Motion',    level: 85 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/[0.12]',
    accent: 'bg-violet-500',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)',  level: 85 },
      { name: 'Docker / Kubernetes',    level: 82 },
      { name: 'CI/CD (GitHub Actions)', level: 88 },
      { name: 'Nginx / Linux',          level: 80 },
      { name: 'Terraform',              level: 70 },
    ],
  },
  {
    title: 'Databases',
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/[0.12]',
    accent: 'bg-emerald-500',
    skills: [
      { name: 'PostgreSQL',       level: 90 },
      { name: 'MongoDB',          level: 82 },
      { name: 'Redis',            level: 85 },
      { name: 'Elasticsearch',    level: 75 },
      { name: 'SQLAlchemy / ORM', level: 88 },
    ],
  },
]

const EASE = [0.23, 1, 0.32, 1]

/* ── Single skill row ── */
function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="last:mb-0">
      {/* Label row */}
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-[0.9375rem] text-slate-200 font-medium leading-none tracking-wide">
          {name}
        </span>
        <span className="text-[0.8rem] text-slate-400 font-mono tabular-nums leading-none">
          {level}%
        </span>
      </div>

      {/* Track */}
      <div className="h-[4px] bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, delay, ease: EASE }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
        >
          {/* Dot cap */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-[8px] bg-white rounded-full shadow-md" />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Skill category card ── */
function SkillCard({ cat, ci, animDelay, isInView, animateFrom = 'bottom' }) {
  const motionProps =
    animateFrom === 'right'
      ? {
          initial: { opacity: 0, x: 32 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.75, delay: animDelay, ease: EASE },
        }
      : {
          initial: { opacity: 0, y: 28 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.75, delay: animDelay, ease: EASE },
        }

  return (
    <motion.div
      {...motionProps}
      className={`glass-card rounded-3xl border ${cat.border} card-lift h-full`}
      style={{
        padding: '2rem 2.25rem 2.25rem',
        boxShadow: '0 0 0 1px rgba(99,102,241,0.12), 0 4px 28px rgba(0,0,0,0.25)',
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-7">
        {/* Accent dot */}
        <span className={`w-2.5 h-2.5 rounded-full ${cat.accent} opacity-90 shrink-0`} />
        <h3
          className="text-xl font-semibold leading-none text-slate-100"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.015em' }}
        >
          {cat.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-6" />

      {/* Skill bars */}
      <div>
        {cat.skills.map((skill, si) => (
          <div key={skill.name}>
            <SkillBar
              name={skill.name}
              level={skill.level}
              color={cat.color}
              delay={animDelay + 0.08 + si * 0.07}
            />
            {si < cat.skills.length - 1 && (
              <div className="h-px bg-white/[0.06] my-5" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Section ── */
export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative section-pad overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-[0.1]" />
      <div
        className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
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
          <span className="section-label glass-strong border border-violet-500/20 text-violet-400">
            Technical Skills
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My <span className="text-gradient">Tech Arsenal</span>
          </h2>
          <p className="text-slate-500 text-base leading-[1.8] max-w-[420px] mx-auto mt-5">
            A full-stack toolkit built over 4+ years of shipping production software
          </p>
        </motion.div>

        {/* ── Row 1: 3D canvas + top 2 skill cards ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start mb-8 lg:mb-10">

          {/* 3D Sphere */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.15}
            className="h-[460px] md:h-[520px] relative"
          >
            {/* Canvas container — extra padding so sphere breathes */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(10,15,30,0.5)',
                backdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 4px 32px rgba(0,0,0,0.3)',
              }}
            >
              <SkillsCanvas />
            </div>

            {/* Hint label */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.6rem] text-slate-700 leading-none tracking-[0.18em] uppercase whitespace-nowrap font-medium pointer-events-none">
              Interactive 3D · Hover to explore
            </p>
          </motion.div>

          {/* Top 2 skill cards stacked */}
          <div className="flex flex-col gap-6 lg:gap-7">
            {skillCategories.slice(0, 2).map((cat, ci) => (
              <SkillCard
                key={cat.title}
                cat={cat}
                ci={ci}
                animDelay={0.2 + ci * 0.12}
                isInView={isInView}
                animateFrom="right"
              />
            ))}
          </div>
        </div>

        {/* ── Row 2: bottom 2 skill cards side by side ── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.slice(2).map((cat, ci) => (
            <SkillCard
              key={cat.title}
              cat={cat}
              ci={ci}
              animDelay={0.45 + ci * 0.12}
              isInView={isInView}
              animateFrom="bottom"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
