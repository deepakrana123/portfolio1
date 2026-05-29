import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ChevronRight, Award, GraduationCap } from 'lucide-react'
import { fadeUp, slideRight } from '../lib/animations'

const experiences = [
  {
    id: 1,
    role: 'Senior Full Stack Engineer',
    company: 'TechNova Inc.',
    period: 'Jan 2023 – Present',
    duration: '1.5 yrs',
    location: 'San Francisco, CA (Remote)',
    gradient: 'from-indigo-500 to-violet-600',
    border: 'border-indigo-500/[0.14]',
    achievements: [
      'Led migration of monolithic Django app to FastAPI microservices, reducing latency by 60%',
      'Built real-time analytics pipeline processing 2M+ events/day using Celery + Redis',
      'Mentored 3 junior developers and established code review standards',
      'Architected multi-tenant SaaS platform serving 500+ enterprise clients',
    ],
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'DataStream Labs',
    period: 'Mar 2021 – Dec 2022',
    duration: '1.8 yrs',
    location: 'New York, NY (Hybrid)',
    gradient: 'from-cyan-500 to-indigo-600',
    border: 'border-cyan-500/[0.14]',
    achievements: [
      'Developed customer-facing dashboard with React + D3.js serving 50k+ daily active users',
      'Designed and implemented RESTful APIs with Django REST Framework',
      'Reduced database query time by 45% through query optimization and indexing strategies',
      'Integrated third-party payment systems (Stripe, PayPal) processing $2M+ monthly',
    ],
    tech: ['Python', 'Django', 'React', 'PostgreSQL', 'Celery', 'Docker', 'GCP'],
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'CloudBase Solutions',
    period: 'Jun 2020 – Feb 2021',
    duration: '9 mos',
    location: 'Austin, TX',
    gradient: 'from-emerald-500 to-cyan-600',
    border: 'border-emerald-500/[0.14]',
    achievements: [
      'Built RESTful microservices with Python/Flask for cloud infrastructure management',
      'Implemented automated testing suite achieving 85% code coverage',
      'Developed CLI tools for DevOps automation, saving 10+ hours/week of manual work',
      'Contributed to open-source Kubernetes operator used by 200+ organizations',
    ],
    tech: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Kubernetes', 'Terraform', 'AWS'],
  },
  {
    id: 4,
    role: 'Junior Web Developer',
    company: 'Pixel Craft Agency',
    period: 'Jan 2020 – May 2020',
    duration: '5 mos',
    location: 'Remote',
    gradient: 'from-orange-500 to-pink-600',
    border: 'border-orange-500/[0.14]',
    achievements: [
      'Built responsive web applications for 15+ clients using React and Django',
      'Implemented SEO optimizations improving organic traffic by 35%',
      'Collaborated with design team to translate Figma mockups into pixel-perfect UIs',
    ],
    tech: ['Python', 'Django', 'React', 'JavaScript', 'MySQL', 'CSS'],
  },
]

const certifications = [
  { name: 'AWS Solutions Architect',      issuer: 'Amazon Web Services', year: '2023', color: 'text-orange-400', dot: 'bg-orange-400' },
  { name: 'Professional Cloud Developer', issuer: 'Google Cloud',        year: '2022', color: 'text-sky-400',    dot: 'bg-sky-400'    },
  { name: 'Certified Kubernetes Admin',   issuer: 'CNCF',                year: '2022', color: 'text-indigo-400', dot: 'bg-indigo-400' },
]

const EASE = [0.23, 1, 0.32, 1]

function ExperienceCard({ exp, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
      className={`glass-card neon-border rounded-3xl p-7 md:p-8 border ${exp.border} card-lift relative overflow-hidden`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${exp.gradient} opacity-50`} />

      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center shrink-0 shadow-md`}>
            <Briefcase size={16} className="text-white" />
          </div>
          <div>
            <h3
              className="text-[0.9375rem] font-bold leading-snug text-slate-100 mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {exp.role}
            </h3>
            <p className={`text-sm font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
              {exp.company}
            </p>
          </div>
        </div>

        {/* Meta — period, location, duration badge */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Calendar size={10} />
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <MapPin size={10} />
            <span>{exp.location}</span>
          </div>
          <span className={`px-2.5 py-1 text-[0.65rem] rounded-full bg-gradient-to-r ${exp.gradient} text-white font-semibold leading-none`}>
            {exp.duration}
          </span>
        </div>
      </div>

      {/* Achievements */}
      <ul className="space-y-3 mb-6">
        {exp.achievements.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[0.875rem] text-slate-400 leading-[1.75]">
            <ChevronRight size={12} className="text-indigo-400 mt-[3px] shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/[0.05]">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[0.6875rem] glass rounded-lg text-slate-500 border border-white/[0.05] font-medium leading-none"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      <div
        className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full opacity-[0.14] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.12] pointer-events-none"
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
          <span className="section-label glass-strong border border-cyan-500/20 text-cyan-400">
            Career Journey
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-500 text-base leading-[1.75] max-w-[440px] mx-auto mt-4">
            4+ years of building, shipping, and scaling production systems
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Timeline — 2/3 width */}
          <div className="lg:col-span-2 space-y-5">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-5">

            {/* Education */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.3}
              className="glass-card neon-border rounded-3xl p-7"
            >
              <h4
                className="font-bold text-slate-100 mb-6 flex items-center gap-2.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                  <GraduationCap size={13} className="text-white" />
                </div>
                Education
              </h4>
              <div className="space-y-5">
                <div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">B.S. Computer Science</p>
                  <p className="text-indigo-400 text-sm font-medium">UC Berkeley</p>
                  <p className="text-slate-600 text-xs mt-1.5">2016 – 2020 · GPA 3.8 / 4.0</p>
                </div>
                <div className="divider" />
                <div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">Minor in Mathematics</p>
                  <p className="text-indigo-400 text-sm font-medium">UC Berkeley</p>
                  <p className="text-slate-600 text-xs mt-1.5">Focus: Algorithms & Data Structures</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.4}
              className="glass-card neon-border rounded-3xl p-7"
            >
              <h4
                className="font-bold text-slate-100 mb-6 flex items-center gap-2.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shrink-0">
                  <Award size={13} className="text-white" />
                </div>
                Certifications
              </h4>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${cert.dot} mt-[5px] shrink-0`} />
                    <div>
                      <p className={`text-sm font-semibold ${cert.color} leading-snug`}>{cert.name}</p>
                      <p className="text-slate-600 text-xs mt-0.5">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career highlights */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.5}
              className="glass-strong neon-border rounded-3xl p-7 border border-indigo-500/[0.14]"
            >
              <h4
                className="font-bold text-slate-100 mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Career Highlights
              </h4>
              <div className="space-y-4">
                {[
                  { label: 'Companies',     value: '4',     color: 'text-indigo-400'  },
                  { label: 'Years Active',  value: '4+',    color: 'text-violet-400'  },
                  { label: 'Team Size Led', value: '8',     color: 'text-cyan-400'    },
                  { label: 'PRs Merged',    value: '1200+', color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">{item.label}</span>
                    <span
                      className={`font-bold text-base ${item.color}`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
