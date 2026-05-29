import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, GitFork, Layers, Zap, Shield, Globe, ArrowRight } from 'lucide-react'
import { fadeUp } from '../lib/animations'

const GithubIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const projects = [
  {
    id: 1, title: 'NeuralCommerce', subtitle: 'AI-Powered E-Commerce Platform',
    description: 'Full-stack e-commerce platform with ML-based product recommendations, real-time inventory management, and a microservices architecture handling 100k+ daily transactions.',
    icon: Zap, gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    glowColor: 'rgba(99,102,241,0.25)', border: 'border-indigo-500/15',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    stats: { stars: 342, forks: 89 }, links: { github: '#', live: '#' },
    featured: true, category: 'Full Stack',
  },
  {
    id: 2, title: 'DataPulse', subtitle: 'Real-Time Analytics Dashboard',
    description: 'High-performance analytics platform processing 1M+ events/day with WebSocket-powered live dashboards, custom charting engine, and multi-tenant architecture.',
    icon: Layers, gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    glowColor: 'rgba(6,182,212,0.25)', border: 'border-cyan-500/15',
    tags: ['Django', 'Celery', 'React', 'TypeScript', 'ClickHouse', 'Kubernetes'],
    stats: { stars: 218, forks: 54 }, links: { github: '#', live: '#' },
    featured: true, category: 'Full Stack',
  },
  {
    id: 3, title: 'SecureVault API', subtitle: 'Enterprise Auth & Security Platform',
    description: 'Zero-trust authentication system with OAuth2, JWT, MFA, and role-based access control. Handles 500k+ auth requests daily with 99.99% uptime.',
    icon: Shield, gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'rgba(16,185,129,0.25)', border: 'border-emerald-500/15',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'OAuth2'],
    stats: { stars: 156, forks: 41 }, links: { github: '#', live: '#' },
    featured: false, category: 'Backend',
  },
  {
    id: 4, title: 'CloudDeploy', subtitle: 'Infrastructure Automation Tool',
    description: 'CLI tool and web dashboard for automated cloud deployments across AWS, GCP, and Azure. Supports Terraform, Kubernetes, and custom deployment pipelines.',
    icon: Globe, gradient: 'from-orange-500 via-pink-500 to-purple-500',
    glowColor: 'rgba(249,115,22,0.25)', border: 'border-orange-500/15',
    tags: ['Python', 'React', 'Terraform', 'Kubernetes', 'AWS', 'GCP'],
    stats: { stars: 289, forks: 73 }, links: { github: '#', live: '#' },
    featured: false, category: 'DevOps',
  },
  {
    id: 5, title: 'ChatFlow', subtitle: 'Real-Time Collaboration Suite',
    description: 'Slack-like collaboration platform with real-time messaging, file sharing, video calls, and AI-powered message summarization. Built for teams of 10–10,000.',
    icon: Zap, gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    glowColor: 'rgba(139,92,246,0.25)', border: 'border-violet-500/15',
    tags: ['Django', 'WebSockets', 'React', 'TypeScript', 'Redis', 'PostgreSQL'],
    stats: { stars: 412, forks: 98 }, links: { github: '#', live: '#' },
    featured: true, category: 'Full Stack',
  },
  {
    id: 6, title: 'MLServe', subtitle: 'ML Model Deployment Platform',
    description: 'Production-ready ML model serving infrastructure with auto-scaling, A/B testing, model versioning, and monitoring. Supports PyTorch, TensorFlow, and scikit-learn.',
    icon: Layers, gradient: 'from-pink-500 via-rose-500 to-orange-500',
    glowColor: 'rgba(236,72,153,0.25)', border: 'border-pink-500/15',
    tags: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PyTorch', 'Prometheus'],
    stats: { stars: 534, forks: 127 }, links: { github: '#', live: '#' },
    featured: false, category: 'Backend',
  },
]

const filters = ['All', 'Full Stack', 'Backend', 'DevOps']

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const { icon: Icon } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
      className="group relative h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={`glass-card neon-border rounded-3xl p-7 md:p-8 h-full border ${project.border} relative overflow-hidden flex flex-col transition-all duration-500`}
        animate={hovered ? {
          boxShadow: `0 20px 60px ${project.glowColor}, 0 0 0 1px rgba(255,255,255,0.08)`,
          y: -6,
        } : {
          boxShadow: '0 0 0 1px rgba(99,102,241,0.12)',
          y: 0,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl pointer-events-none`} />

        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg shrink-0`}>
            <Icon size={18} className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.links.github}
              className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <GithubIcon size={13} />
            </motion.a>
            <motion.a
              href={project.links.live}
              className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Live Demo"
            >
              <ExternalLink size={13} />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 mb-6">
          <div className="flex items-start gap-2.5 mb-2">
            <h3
              className="text-[1rem] font-bold leading-snug text-slate-100"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span className="mt-0.5 px-2 py-0.5 text-[0.6rem] leading-none tracking-wide bg-indigo-500/[0.12] text-indigo-400 rounded-full border border-indigo-500/20 font-semibold shrink-0 uppercase">
                Featured
              </span>
            )}
          </div>
          <p className="text-[0.8125rem] text-slate-500 leading-snug mb-3 font-medium">{project.subtitle}</p>
          <p className="text-[0.875rem] text-slate-400 leading-[1.75]">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[0.68rem] leading-none tracking-wide glass rounded-lg text-slate-500 border border-white/5 font-medium">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 text-[0.68rem] leading-none tracking-wide glass rounded-lg text-slate-600 border border-white/5">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs leading-none tracking-wide">
            <Star size={11} className="text-yellow-500/70" />
            <span>{project.stats.stars}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-xs leading-none tracking-wide">
            <GitFork size={11} />
            <span>{project.stats.forks}</span>
          </div>
          <div className="ml-auto">
            <span className={`px-2.5 py-1 text-[0.65rem] leading-none tracking-wide rounded-full bg-gradient-to-r ${project.gradient} text-white font-semibold`}>
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="section-header"
        >
          <span className="section-label glass-strong border border-pink-500/20 text-pink-400">
            Portfolio
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-500 text-base leading-[1.75] max-w-[440px] mx-auto mt-4">
            Production-grade applications built with modern tech stacks
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap justify-center gap-2.5 mb-12 md:mb-14"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold leading-none tracking-wide transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'glass-card text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 md:mt-14"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex group"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <GithubIcon size={16} />
            View All on GitHub
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
