import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import { useApp } from '../contexts/AppContext'

const CONTACT_EMAIL = 'gekkokurai@gmail.com'
const IG_HANDLE = 'tatyr_kg'

function validateHandle(handle) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(handle)
}

async function checkInstagramExists(username) {
  try {
    const res = await fetch(
      `https://www.instagram.com/web/search/topsearch/?context=user&query=${encodeURIComponent(username)}&rank_token=0`,
      { headers: { 'X-Instagram-AJAX': '1', 'X-Requested-With': 'XMLHttpRequest' } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const users = data?.users || []
    return users.some(u => u?.user?.username?.toLowerCase() === username.toLowerCase())
  } catch {
    return null
  }
}

async function sendEmail(username) {
  const body = new FormData()
  body.append('_subject', `Бронирование через Tatyr.kg — @${username}`)
  body.append('instagram', `@${username}`)
  body.append('message', `Пользователь @${username} хочет забронировать через сайт tatyr.kg`)
  body.append('_replyto', `https://instagram.com/${username}`)
  const res = await fetch(`https://formsubmit.co/${CONTACT_EMAIL}`, { method: 'POST', body })
  return res.ok || res.status === 200 || res.redirected
}

export default function CTA() {
  const { ref, visible } = useReveal()
  const { t } = useApp()

  const [handle, setHandle] = useState('')
  const [status, setStatus] = useState('idle') // idle | checking | notfound | sending | sent | error
  const [errMsg, setErrMsg] = useState('')

  const clean = handle.replace(/^@/, '').trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!clean) return

    if (!validateHandle(clean)) {
      setErrMsg('Неверный формат. Только буквы, цифры, . и _')
      setStatus('error')
      return
    }

    setStatus('checking')
    setErrMsg('')

    const exists = await checkInstagramExists(clean)

    if (exists === false) {
      setStatus('notfound')
      return
    }

    setStatus('sending')
    const ok = await sendEmail(clean)
    setStatus(ok ? 'sent' : 'error')
    if (!ok) setErrMsg('Не удалось отправить. Попробуйте ещё раз.')
  }

  return (
    <section id="cta" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565117100-e854e3a33a4a?w=1920&q=80&auto=format&fit=crop"
          alt="Горный пейзаж"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#731A19]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">{t('cta', 'badge')}</span>
            <span className="h-px w-10 bg-accent" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-light mb-6 leading-tight">
            {t('cta', 'title')}<br />
            <em className="not-italic text-accent">{t('cta', 'titleAccent')}</em>
          </h2>

          <p className="text-light/60 font-light text-base md:text-lg leading-relaxed mb-3 max-w-2xl mx-auto">
            {t('cta', 'desc')}
          </p>
          <p className="text-light/30 font-light text-sm mb-10 tracking-wide">{t('cta', 'tagline')}</p>

          {/* Instagram booking form */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-light/50 text-xs tracking-wider mb-3 uppercase">{t('cta', 'igLabel')}</p>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-accent/40 bg-accent/10 px-6 py-4 text-accent text-sm font-light tracking-wide"
              >
                ✓ Отправлено! Мы напишем вам в Instagram в ближайшее время.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light/30 text-sm">@</span>
                    <input
                      type="text"
                      value={handle}
                      onChange={e => { setHandle(e.target.value); setStatus('idle'); setErrMsg('') }}
                      placeholder={t('cta', 'igPlaceholder').replace('@', '')}
                      disabled={status === 'checking' || status === 'sending'}
                      className="w-full bg-white/5 border border-white/15 text-light placeholder-light/25 text-sm font-light pl-8 pr-4 py-3.5 focus:outline-none focus:border-accent/60 transition-colors duration-200 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!clean || status === 'checking' || status === 'sending'}
                    className="px-6 py-3.5 bg-accent text-[#0d0d0d] text-sm font-semibold tracking-wider hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {status === 'checking' ? '...' : status === 'sending' ? '...' : t('cta', 'igBtn')}
                  </button>
                </div>

                {/* Status messages */}
                {status === 'checking' && (
                  <p className="text-light/40 text-xs tracking-wider animate-pulse">
                    Проверяем аккаунт @{clean}…
                  </p>
                )}
                {status === 'sending' && (
                  <p className="text-light/40 text-xs tracking-wider animate-pulse">
                    Отправляем заявку…
                  </p>
                )}
                {status === 'notfound' && (
                  <p className="text-red-400/80 text-xs tracking-wide">
                    Аккаунт @{clean} не найден. Проверьте правильность ника.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400/80 text-xs tracking-wide">{errMsg}</p>
                )}
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://www.instagram.com/${IG_HANDLE}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-light/20 text-light/70 text-sm font-light tracking-wider hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @{IG_HANDLE}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
