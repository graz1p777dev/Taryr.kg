import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'

const LANGS = ['ky', 'ru', 'en']
const LANG_LABELS = { ky: 'КЫР', ru: 'РУС', en: 'ENG' }

export default function Navbar() {
  const { lang, setLang, t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t('nav', 'about'), href: '#about' },
    { label: t('nav', 'services'), href: '#services' },
    { label: t('nav', 'why'), href: '#why' },
    { label: t('nav', 'gallery'), href: '#gallery' },
    { label: t('nav', 'map'), href: '#map' },
    { label: t('nav', 'contact'), href: '#cta' },
  ]

  const bgClass = scrolled
    ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-black/20'
    : 'bg-transparent'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Tatyr" className="h-9 w-auto object-contain" />
          <span className="font-serif text-xl font-semibold tracking-widest text-light group-hover:text-accent transition-colors duration-300">
            TATYR
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-light tracking-wider text-light/70 hover:text-accent transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Lang switcher */}
          <div className="flex items-center gap-0.5 bg-white/5 rounded-sm p-0.5 ml-2 border-l border-white/10 pl-4">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-[10px] tracking-wider font-medium rounded-sm transition-all duration-200 ${
                  lang === l ? 'bg-accent text-[#0d0d0d]' : 'text-light/50 hover:text-light'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>

          <a
            href="#cta"
            className="px-5 py-2 border border-accent/60 text-accent text-xs tracking-wider hover:bg-accent hover:text-[#0d0d0d] transition-all duration-300 font-medium"
          >
            {t('nav', 'book')}
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-white/10 rounded-sm p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 py-0.5 text-[9px] tracking-wider font-medium rounded-sm transition-all ${
                  lang === l ? 'bg-accent text-[#0d0d0d]' : 'text-light/50'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-light transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-light transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-light transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d]/98 backdrop-blur-md border-t border-white/5"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-wider text-light/70 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-2.5 border border-accent/60 text-accent text-sm tracking-wider text-center hover:bg-accent hover:text-[#0d0d0d] transition-all duration-300"
              >
                {t('nav', 'book')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
