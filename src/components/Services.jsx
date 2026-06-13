import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

const services = [
  {
    icon: '🏡',
    title: 'VIP-коттеджи',
    desc: 'Комфортное проживание для семейного отдыха и дружеских компаний.',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '⛺',
    title: 'Национальные юрты',
    desc: 'Уникальная возможность познакомиться с традициями кыргызского гостеприимства.',
    img: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🏊',
    title: 'Бассейн под открытым небом',
    desc: 'Освежающий отдых с видом на горные пейзажи.',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🎉',
    title: 'Банкетный зал',
    desc: 'Проведение свадеб, юбилеев, корпоративов и других мероприятий.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🌳',
    title: 'Беседки и зоны отдыха',
    desc: 'Уютные места для встреч, пикников и семейного досуга.',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🎣',
    title: 'Свежая форель',
    desc: 'Возможность попробовать вкусную рыбу в окружении природы.',
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&auto=format&fit=crop',
  },
]

function ServiceCard({ service, index }) {
  const { ref, visible } = useReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden bg-[#111] border border-white/5 hover:border-accent/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />
        <span className="absolute top-4 left-4 text-2xl">{service.icon}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl text-light mb-2 font-light group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-light/50 text-sm font-light leading-relaxed">{service.desc}</p>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}

export default function Services() {
  const { ref, visible } = useReveal()

  return (
    <section id="services" className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">Услуги</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-light">
            Наши услуги
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
