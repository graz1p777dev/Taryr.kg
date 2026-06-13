import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

export default function About() {
  const { ref, visible } = useReveal()
  const { t } = useApp()

  return (
    <section id="about" className="py-24 md:py-32 bg-stone-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{t('about', 'badge')}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8 text-gray-900 dark:text-light">
              {t('about', 'title')}<br />
              <em className="not-italic text-accent">{t('about', 'titleAccent')}</em>
            </h2>
            <div className="space-y-5 font-light leading-relaxed text-[0.95rem] text-gray-600 dark:text-light/60">
              <p>{t('about', 'p1')}</p>
              <p>{t('about', 'p2')}</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { num: '30', unit: 'мин', label: t('about', 'stat1label') },
                { num: '6', unit: '+', label: t('about', 'stat2label') },
                { num: '∞', unit: '', label: t('about', 'stat3label') },
              ].map((s) => (
                <div key={s.label} className="border-l border-accent/30 pl-4">
                  <p className="font-serif text-3xl text-accent font-light">
                    {s.num}<span className="text-lg">{s.unit}</span>
                  </p>
                  <p className="text-xs tracking-wider mt-1 text-gray-400 dark:text-light/40">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="/img/about-main.svg"
                alt="Горный пейзаж"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-accent/20 -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-brand/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
