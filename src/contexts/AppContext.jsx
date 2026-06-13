import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tatyr_lang') || 'ru')
  const [theme, setTheme] = useState(() => localStorage.getItem('tatyr_theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('tatyr_lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('tatyr_theme', theme)
    if (theme === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  const t = (section, key) => translations[lang]?.[section]?.[key] ?? translations.ru[section]?.[key] ?? key

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
