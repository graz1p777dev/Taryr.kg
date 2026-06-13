export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060606] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Tatyr" className="h-8 w-auto object-contain" />
              <span className="font-serif text-lg tracking-widest text-light">TATYR</span>
            </div>
            <p className="text-light/40 text-sm font-light leading-relaxed">
              Уединённое место в живописном Арашане. Отдых среди гор Кыргызстана.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.3em] text-accent uppercase mb-4 font-medium">Навигация</h4>
            <nav className="space-y-2.5">
              {['О нас', 'Услуги', 'Почему мы', 'Галерея', 'Контакт'].map((l) => (
                <a
                  key={l}
                  href={`#${l === 'О нас' ? 'about' : l === 'Услуги' ? 'services' : l === 'Почему мы' ? 'why' : l === 'Галерея' ? 'gallery' : 'cta'}`}
                  className="block text-sm text-light/40 hover:text-accent transition-colors duration-300 font-light"
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-[0.3em] text-accent uppercase mb-4 font-medium">Следите за нами</h4>
            <a
              href="https://www.instagram.com/tatyr_kg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-light/40 hover:text-accent transition-colors duration-300 font-light"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @tatyr_kg
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light/20 font-light">
          <p>© {year} TATYR. Все права защищены.</p>
          <p>
            Создано{' '}
            <a
              href="https://github.com/graz1p777dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:text-accent transition-colors duration-300"
            >
              graz1p777
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
