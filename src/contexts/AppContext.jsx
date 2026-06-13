import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const AppContext = createContext(null)

// Always dark
document.documentElement.classList.add('dark')

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tatyr_lang') || 'ru')

  useEffect(() => { localStorage.setItem('tatyr_lang', lang) }, [lang])

  const t = (section, key) => translations[lang]?.[section]?.[key] ?? translations.ru[section]?.[key] ?? key

  return (
    <AppContext.Provider value={{ lang, setLang, t }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
