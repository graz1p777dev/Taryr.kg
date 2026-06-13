import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="relative h-screen min-h-[620px] flex items-start overflow-hidden">
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1565117100-e854e3a33a4a?w=1920&q=85&auto=format&fit=crop"
          alt="Горы Кыргызстана"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#731A19]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 md:pt-36">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">
            Арашан, Кыргызстан
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-light leading-none tracking-widest text-light mb-4"
        >
          TATYR
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(1.1rem,2.5vw,1.8rem)] font-light text-light/80 italic mb-6 max-w-xl"
        >
          Отдых среди гор Кыргызстана
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-light/60 text-sm md:text-base font-light leading-relaxed max-w-lg mb-10 tracking-wide"
        >
          Уединённое место в живописном Арашане, где чистый горный воздух,
          природная тишина и комфорт создают идеальные условия для отдыха всей семьёй.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-accent text-[#0d0d0d] text-sm font-semibold tracking-widest uppercase hover:bg-accent/90 transition-all duration-300"
          >
            Забронировать
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-light/30 text-light text-sm font-light tracking-widest hover:border-accent/60 hover:text-accent transition-all duration-300"
          >
            Узнать больше
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-light/30 text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
