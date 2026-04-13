export interface LocaleConfig {
  code: string
  name: string
  flag: string
  currency: string
  currencySymbol: string
  electricityPrice: number // per kWh in local currency
  electricityUnit: string
  direction: 'ltr' | 'rtl'
}

export const LOCALES: Record<string, LocaleConfig> = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    currency: 'VND',
    currencySymbol: '₫',
    electricityPrice: 3000,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  th: {
    code: 'th',
    name: 'ภาษาไทย',
    flag: '🇹🇭',
    currency: 'THB',
    currencySymbol: '฿',
    electricityPrice: 4.5,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  tl: {
    code: 'tl',
    name: 'Filipino',
    flag: '🇵🇭',
    currency: 'PHP',
    currencySymbol: '₱',
    electricityPrice: 11.5,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  id: {
    code: 'id',
    name: 'Bahasa Indonesia',
    flag: '🇮🇩',
    currency: 'IDR',
    currencySymbol: 'Rp',
    electricityPrice: 1500,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  ms: {
    code: 'ms',
    name: 'Bahasa Melayu',
    flag: '🇲🇾',
    currency: 'MYR',
    currencySymbol: 'RM',
    electricityPrice: 0.57,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    currency: 'USD',
    currencySymbol: '$',
    electricityPrice: 0.15,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    currency: 'SAR',
    currencySymbol: '﷼',
    electricityPrice: 0.18,
    electricityUnit: 'kWh',
    direction: 'rtl',
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    currency: 'USD',
    currencySymbol: '$',
    electricityPrice: 0.06,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    electricityPrice: 0.16,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    currency: 'CNY',
    currencySymbol: '¥',
    electricityPrice: 0.85,
    electricityUnit: 'kWh',
    direction: 'ltr',
  },
}

export const DEFAULT_LOCALE = 'vi'

export function detectLocale(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const saved = localStorage.getItem('batelithium-locale')
  if (saved && LOCALES[saved]) return saved
  const browserLang = navigator.language?.split('-')[0] || ''
  if (LOCALES[browserLang]) return browserLang
  return DEFAULT_LOCALE
}

export function formatCurrency(amount: number, locale: LocaleConfig): string {
  if (amount >= 1000000) {
    return `${locale.currencySymbol}${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 10000) {
    return `${locale.currencySymbol}${Math.round(amount).toLocaleString()}`
  }
  return `${locale.currencySymbol}${amount.toFixed(2)}`
}
