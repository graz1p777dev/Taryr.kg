import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const photos = [
  { src: '/img/gallery-sunrise.svg',  label: 'Рассвет над горами' },
  { src: '/img/gallery-nature.svg',   label: 'Первозданная природа' },
  { src: '/img/gallery-lake.svg',     label: 'Горное озеро Арашан' },
  { src: '/img/gallery-peak.svg',     label: 'Вершины Кыргызстана' },
  { src: '/img/gallery-family.svg',   label: 'Семейный отдых' },
  { src: '/img/gallery-view.svg',     label: 'Панорамный вид' },
]

const SWIPE_THRESHOLD = 50

export default function Gallery() {
  const { ref, visible } = useReveal()
  const { t } = useApp()

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightbox, setLightbox] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  const go = useCallback((next) => {
    const total = photos.length
    const n = ((next % total) + total) % total
    setDirection(next > current ? 1 : -1)
    setCurrent(n)
  }, [current])

  const prev = useCallback(() => go(current - 1), [go, current])
  const next = useCallback(() => go(current + 1), [go, current])

  useEffect(() => {
    if (lightbox) {
      const handler = (e) => {
        if (e.key === 'ArrowRight') next()
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'Escape') setLightbox(false)
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [lightbox, next, prev])

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section id="gallery" className="py-20 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{t('gallery', 'badge')}</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-3 text-light">
            {t('gallery', 'title')}
          </h2>
          <p className="font-light max-w-xl mx-auto text-sm leading-relaxed text-light/40">
            {t('gallery', 'desc')}
          </p>
        </motion.div>

        {/* Main slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Slide container */}
          <div
            className="relative overflow-hidden rounded-none cursor-pointer select-none"
            style={{ aspectRatio: '16/9' }}
            onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const diff = dragStart - e.changedTouches[0].clientX
              if (Math.abs(diff) > SWIPE_THRESHOLD) diff > 0 ? next() : prev()
            }}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
                className="absolute inset-0"
              >
                <img
                  src={photos[current].src}
                  alt={photos[current].label}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 flex items-end gap-4">
                  <div>
                    <p className="text-light/40 text-xs tracking-[0.3em] uppercase mb-1">
                      {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                    </p>
                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-light tracking-wide">
                      {photos[current].label}
                    </h3>
                  </div>
                </div>

                {/* Expand hint */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 w-8 h-8 border border-light/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-light/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-light/80 hover:bg-accent hover:border-accent hover:text-[#0d0d0d] transition-all duration-300"
              aria-label="Назад"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-light/80 hover:bg-accent hover:border-accent hover:text-[#0d0d0d] transition-all duration-300"
              aria-label="Вперёд"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${((current + 1) / photos.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-1.5 mt-1.5">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`relative overflow-hidden transition-all duration-300 ${i === current ? 'ring-2 ring-accent ring-offset-1 ring-offset-[#080808]' : 'opacity-50 hover:opacity-80'}`}
                style={{ aspectRatio: '1/1' }}
              >
                <img src={p.src} alt={p.label} className="w-full h-full object-cover" draggable={false} />
                {i === current && (
                  <div className="absolute inset-0 bg-accent/10" />
                )}
              </button>
            ))}
          </div>

          {/* Dots on mobile */}
          <div className="flex items-center justify-center gap-2 mt-5 md:hidden">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-light/20'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-light/60 hover:text-light hover:border-white/50 transition-all"
              onClick={() => setLightbox(false)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <p className="absolute top-5 left-5 text-light/40 text-xs tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl w-full mx-6"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const diff = dragStart - e.changedTouches[0].clientX
                if (Math.abs(diff) > SWIPE_THRESHOLD) diff > 0 ? next() : prev()
              }}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.img
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
                  src={photos[current].src}
                  alt={photos[current].label}
                  className="w-full max-h-[80vh] object-contain"
                  draggable={false}
                />
              </AnimatePresence>
              <p className="text-center text-light/50 text-sm font-light tracking-wider mt-4">
                {photos[current].label}
              </p>
            </motion.div>

            {/* Lightbox arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/15 flex items-center justify-center text-light/60 hover:bg-accent hover:border-accent hover:text-[#0d0d0d] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/15 flex items-center justify-center text-light/60 hover:bg-accent hover:border-accent hover:text-[#0d0d0d] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
