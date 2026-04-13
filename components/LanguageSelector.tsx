'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { LOCALES } from '@/lib/i18n/locales'

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium active:scale-95 transition-transform"
        aria-label={t('selectLanguage')}
      >
        <span className="text-sm">{LOCALES[locale]?.flag}</span>
        <span className="hidden sm:inline">{LOCALES[locale]?.code.toUpperCase()}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
            <div className="p-2 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase px-2">{t('selectLanguage')}</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {Object.values(LOCALES).map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => { setLocale(loc.code); setOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    locale === loc.code
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{loc.flag}</span>
                  <span>{loc.name}</span>
                  {locale === loc.code && (
                    <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
