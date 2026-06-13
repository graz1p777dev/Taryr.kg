import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const AppContext = createContext(null)

// Apply theme class immediately (called before React renders to avoid flash)
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Set initial class before first render
applyTheme(localStorage.getItem('tatyr_theme') || 'dark')

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tatyr_lang') || 'ru')
  const [theme, setTheme] = useState(() => localStorage.getItem('tatyr_theme') || 'dark')

  useEffect(() => { localStorage.setItem('tatyr_lang', lang) }, [lang])

  useEffect(() => {
    localStorage.setItem('tatyr_theme', theme)
    applyTheme(theme)
  }, [theme])

  const t = (section, key) => translations[lang]?.[section]?.[key] ?? translations.ru[section]?.[key] ?? key
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
