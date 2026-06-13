import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const photos = [
  { src: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80&auto=format&fit=crop', alt: 'Горный рассвет', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop', alt: 'Природа' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80&auto=format&fit=crop', alt: 'Горное озеро' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop', alt: 'Горный пик' },
  { src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&q=80&auto=format&fit=crop', alt: 'Семейный отдых' },
  { src: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=600&q=80&auto=format&fit=crop', alt: 'Горный пейзаж' },
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-light/80 text-sm font-light tracking-wider">{p.alt}</span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { ref, visible } = useReveal()
  const { t } = useApp()

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('gallery', 'title')}
          </h2>
          <p className="font-light max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
