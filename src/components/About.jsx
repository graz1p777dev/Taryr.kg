import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">О нас</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-light mb-8 leading-tight">
              Место, где природа<br />
              <em className="not-italic text-accent">встречает комфорт</em>
            </h2>
            <div className="space-y-5 text-light/60 font-light leading-relaxed text-[0.95rem]">
              <p>
                Tatyr — это современный комплекс отдыха, расположенный у подножия гор
                недалеко от Бишкека. Мы создали пространство, где можно отвлечься
                от городской суеты, насладиться красотой природы, провести время с
                близкими и наполниться новыми впечатлениями.
              </p>
              <p>
                Каждый уголок комплекса окружён живописными пейзажами, свежим воздухом
                и атмосферой спокойствия.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { num: '30', unit: 'мин', desc: 'от Бишкека' },
                { num: '6', unit: '+', desc: 'видов услуг' },
                { num: '∞', unit: '', desc: 'впечатлений' },
              ].map((s) => (
                <div key={s.desc} className="border-l border-accent/30 pl-4">
                  <p className="font-serif text-3xl text-accent font-light">
                    {s.num}<span className="text-lg">{s.unit}</span>
                  </p>
                  <p className="text-xs text-light/40 tracking-wider mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop"
                alt="Горный пейзаж Кыргызстана"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-accent/20 -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-brand/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
