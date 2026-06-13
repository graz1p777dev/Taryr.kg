import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const ICONS = ['🏡', '⛺', '🏊', '🎉', '🌳', '🎣']
const IMGS = [
  '/img/service-cottage.svg',
  '/img/service-yurt.svg',
  '/img/service-pool.svg',
  '/img/service-banquet.svg',
  '/img/service-gazebo.svg',
  '/img/service-trout.svg',
]

function ServiceCard({ icon, img, title, desc, index }) {
  const { ref, visible } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group relative overflow-hidden border border-black/8 dark:border-white/5 bg-white dark:bg-[#111] hover:border-accent/30 transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute top-4 left-4 text-2xl">{icon}</span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-light mb-2 text-gray-900 dark:text-light group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-gray-500 dark:text-light/50">{desc}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}

export default function Services() {
  const { ref, visible } = useReveal()
  const { t } = useApp()
  const items = t('services', 'items') || []

  return (
    <section id="services" className="py-24 md:py-32 bg-stone-100 dark:bg-[#080808] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{t('services', 'badge')}</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 dark:text-light">
            {t('services', 'title')}
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <ServiceCard key={i} icon={ICONS[i]} img={IMGS[i]} title={s.title} desc={s.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
