import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const MAP_LABELS = {
  ky: { badge: 'Жайгашкан жери', title: 'Бизди кантип табууга болот', address: 'Аракан, Кыргыз айылы 1а, Бишкек, Кыргызстан 720048', directions: 'Жол куру' },
  ru: { badge: 'Расположение', title: 'Как нас найти', address: 'Арашан, Кыргыз айылы 1а, Бишкек, Кыргызстан 720048', directions: 'Маршрут' },
  en: { badge: 'Location', title: 'How to find us', address: 'Arashan, Kyrgyz Village 1a, Bishkek, Kyrgyzstan 720048', directions: 'Get directions' },
}

export default function Map() {
  const { ref, visible } = useReveal()
  const { lang } = useApp()
  const lbl = MAP_LABELS[lang] || MAP_LABELS.ru

  return (
    <section id="map" className="py-24 md:py-32 bg-stone-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{lbl.badge}</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 dark:text-light mb-4">
            {lbl.title}
          </h2>
          <p className="text-gray-500 dark:text-light/50 text-sm font-light tracking-wide">{lbl.address}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Map container */}
          <div className="relative overflow-hidden border border-black/8 dark:border-white/5 shadow-2xl shadow-black/20">
            <div className="relative h-[280px] sm:h-[380px] md:h-[480px]">
            <iframe
              title="Tatyr на карте"
              src="https://maps.google.com/maps?q=Arashan+village+Bishkek+Kyrgyzstan&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            </div>
            {/* Overlay with address pin card */}
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white dark:bg-[#0d0d0d] border border-black/8 dark:border-white/10 shadow-xl p-3 md:p-5 max-w-[calc(100%-2rem)] md:max-w-xs">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 bg-brand flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-serif text-sm font-medium text-gray-900 dark:text-light mb-0.5">TATYR</p>
                  <p className="text-xs text-gray-500 dark:text-light/50 font-light leading-snug">{lbl.address}</p>
                  <a
                    href="https://maps.google.com/?q=Arashan+village+Bishkek+Kyrgyzstan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    {lbl.directions}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
