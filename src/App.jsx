import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLenis } from './hooks/useLenis'
import { useCursorGlow } from './hooks/useCursorGlow'

export default function App() {
  useLenis()
  const glowRef = useCursorGlow()

  return (
    <div className="noise-bg min-h-screen bg-[#050810] text-slate-100 relative overflow-x-hidden">
      {/* Cursor glow — desktop only */}
      <div
        ref={glowRef}
        className="cursor-glow hidden lg:block"
        aria-hidden="true"
      />

      {/* Global atmospheric radials */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-30 blob"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-20 blob"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', animationDelay: '-4s' }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-20 blob"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', animationDelay: '-8s' }}
        />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
