import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Code2, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('Home')
  const [hovered,   setHovered]   = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy
  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = navLinks.find(l => l.href === `#${entry.target.id}`)
            if (link) setActive(link.label)
          }
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-4' : 'bg-transparent py-5'
      }`}
    >
      {/* Use same container-xl so navbar aligns with page content */}
      <div className="container-xl flex items-center justify-between " style={{
        marginTop:"10px"
      }}>

        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative w-10 h-10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:rotate-12 transition-transform duration-400 ease-out" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Code2 size={18} className="text-white z-10" />
            </div>
          </div>
          <span
            className="text-lg font-bold leading-none tracking-tight shimmer-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Devendra.dev
          </span>
        </motion.a>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              onMouseEnter={() => setHovered(link.label)}
              className={`relative px-5 py-3 text-[0.875rem] font-medium leading-none tracking-[0.01em] rounded-xl transition-colors duration-200 ${
                active === link.label
                  ? 'text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover background */}
              {hovered === link.label && (
                <motion.span
                  layoutId="navHover"
                  className="absolute inset-0 bg-white/5 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              {/* Active indicator */}
              {active === link.label && (
                <motion.span
                  layoutId="navActive"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 mt-4">
          <motion.a
            href="#contact"
            className="btn-primary text-sm"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <Zap size={14} />
            Hire Me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-2.5 rounded-xl glass text-slate-300 border border-white/8"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden glass-nav border-t border-white/5 overflow-hidden"
          >
            <div className="container-xl py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => { setActive(link.label); setMenuOpen(false) }}
                  className={`px-4 py-3.5 rounded-xl text-sm tracking-wide leading-none transition-all duration-200 ${
                    active === link.label
                      ? 'text-white bg-indigo-500/10 border border-indigo-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 btn-primary justify-center text-sm"
                onClick={() => setMenuOpen(false)}
              >
                <Zap size={14} />
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
