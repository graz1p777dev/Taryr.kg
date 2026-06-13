import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

export default function CTA() {
  const { ref, visible } = useReveal()

  return (
    <section id="cta" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565117100-e854e3a33a4a?w=1920&q=80&auto=format&fit=crop"
          alt="Горный пейзаж"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#731A19]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">Бронирование</span>
            <span className="h-px w-10 bg-accent" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-light mb-6 leading-tight">
            Забронируйте отдых<br />
            <em className="not-italic text-accent">уже сегодня</em>
          </h2>

          <p className="text-light/60 font-light text-base md:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Подарите себе возможность насладиться природой, комфортом
            и настоящим кыргызским гостеприимством.
          </p>
          <p className="text-light/40 font-light text-sm mb-10 tracking-wide">
            Tatyr — место, куда хочется возвращаться снова и снова.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/tatyr_kg/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-accent text-[#0d0d0d] text-sm font-semibold tracking-widest uppercase hover:bg-accent/90 transition-all duration-300"
            >
              Написать в Instagram
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="tel:+996"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-light/30 text-light text-sm font-light tracking-widest hover:border-accent/60 hover:text-accent transition-all duration-300"
            >
              Позвонить нам
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
