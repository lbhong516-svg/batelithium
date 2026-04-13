'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LOCALES, LocaleConfig, DEFAULT_LOCALE, detectLocale } from './locales'
import { t as translate } from './translations'

interface I18nContextType {
  locale: string
  localeConfig: LocaleConfig
  setLocale: (locale: string) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  localeConfig: LOCALES[DEFAULT_LOCALE],
  setLocale: () => {},
  t: (key: string) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detected = detectLocale()
    setLocaleState(detected)
    setMounted(true)
  }, [])

  const setLocale = (newLocale: string) => {
    if (LOCALES[newLocale]) {
      setLocaleState(newLocale)
      localStorage.setItem('batelithium-locale', newLocale)
      document.documentElement.lang = newLocale
      document.documentElement.dir = LOCALES[newLocale].direction
    }
  }

  const t = (key: string) => translate(key, locale)

  const value: I18nContextType = {
    locale,
    localeConfig: LOCALES[locale] || LOCALES[DEFAULT_LOCALE],
    setLocale,
    t,
  }

  if (!mounted) {
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
