import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const photos = [
  { src: '/img/gallery-sunrise.svg', alt: 'Горный рассвет', span: 'md:col-span-2 md:row-span-2' },
  { src: '/img/gallery-nature.svg',  alt: 'Природа' },
  { src: '/img/gallery-lake.svg',    alt: 'Горное озеро' },
  { src: '/img/gallery-peak.svg',    alt: 'Горный пик' },
  { src: '/img/gallery-family.svg',  alt: 'Семейный отдых' },
  { src: '/img/gallery-view.svg',    alt: 'Горный пейзаж' },
]

function Photo({ p, i }) {
  const { ref, visible } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.07 }}
      className={`relative overflow-hidden group cursor-pointer ${p.span || ''}`}
    >
      <div className="aspect-square h-full">
        <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white/80 text-sm font-light tracking-wider">{p.alt}</span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { ref, visible } = useReveal()
  const { t } = useApp()

  return (
    <section id="gallery" className="py-24 md:py-32 bg-stone-100 dark:bg-[#080808] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{t('gallery', 'badge')}</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-gray-900 dark:text-light">
            {t('gallery', 'title')}
          </h2>
          <p className="font-light max-w-xl mx-auto text-sm leading-relaxed text-gray-500 dark:text-light/50">
            {t('gallery', 'desc')}
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {photos.map((p, i) => <Photo key={p.src} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
