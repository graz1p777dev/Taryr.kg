import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

const reasons = [
  'Всего 30 минут от Бишкека',
  'Чистый горный воздух',
  'Живописные виды',
  'Комфортное размещение',
  'Национальный колорит',
  'Идеально для семейного отдыха',
  'Подходит для мероприятий любого масштаба',
]

export default function WhyUs() {
  const { ref, visible } = useReveal()

  return (
    <section id="why" className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#731A19]/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&auto=format&fit=crop"
                alt="Природа Кыргызстана"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#731A19]/20 to-transparent" />
            </div>
            {/* Quote overlay */}
            <div className="absolute bottom-8 -right-4 max-w-xs bg-[#0d0d0d]/90 backdrop-blur-sm border border-accent/20 p-6">
              <p className="font-serif text-lg italic text-light/80 leading-relaxed">
                "Место, куда хочется возвращаться снова и снова"
              </p>
              <div className="mt-3 h-px w-12 bg-accent" />
            </div>
          </motion.div>

          {/* Reasons list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">Преимущества</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-light mb-10 leading-tight">
                Почему выбирают<br />
                <em className="not-italic text-accent">Tatyr</em>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, x: 20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 border border-accent/40 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent transition-all duration-300">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-light/70 font-light text-[0.95rem] tracking-wide group-hover:text-light transition-colors duration-300">
                    {r}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10"
            >
              <a
                href="#cta"
                className="inline-flex items-center gap-3 text-accent text-sm tracking-widest font-medium group"
              >
                Забронировать сейчас
                <span className="h-px w-8 bg-accent group-hover:w-16 transition-all duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
