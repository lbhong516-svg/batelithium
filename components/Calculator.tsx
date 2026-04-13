'use client'

import { useState, useMemo } from 'react'
import { useI18n } from '@/lib/i18n/context'
import Link from 'next/link'

interface Appliance {
  key: string
  icon: string
  watts: number
  defaultHours: number
}

const APPLIANCES: Appliance[] = [
  { key: 'aircon', icon: '\u2744\uFE0F', watts: 1500, defaultHours: 8 },
  { key: 'fridge', icon: '\uD83E\uDDCA', watts: 150, defaultHours: 24 },
  { key: 'washer', icon: '\uD83D\uDC55', watts: 500, defaultHours: 1 },
  { key: 'tv', icon: '\uD83D\uDCFA', watts: 120, defaultHours: 5 },
  { key: 'fan', icon: '\uD83C\uDF00', watts: 75, defaultHours: 10 },
  { key: 'light', icon: '\uD83D\uDCA1', watts: 60, defaultHours: 8 },
  { key: 'microwave', icon: '\uD83D\uDD25', watts: 1000, defaultHours: 0.5 },
  { key: 'waterHeater', icon: '\uD83D\uDEBF', watts: 3000, defaultHours: 1 },
  { key: 'computer', icon: '\uD83D\uDCBB', watts: 200, defaultHours: 6 },
  { key: 'rice', icon: '\uD83C\uDF5A', watts: 700, defaultHours: 1 },
  { key: 'iron', icon: '\uD83D\uDC54', watts: 1200, defaultHours: 0.5 },
  { key: 'router', icon: '\uD83D\uDCE1', watts: 15, defaultHours: 24 },
]

interface ProductRec {
  name: string
  capacity: string
  description: string
  icon: string
  savings: string
}

function getRecommendation(monthlyCostUSD: number, t: (k: string) => string): ProductRec[] {
  if (monthlyCostUSD < 30) {
    return [{
      name: t('recPortable'),
      capacity: '1-2 kWh',
      description: t('recPortableDesc'),
      icon: '\uD83D\uDD0B',
      savings: '15-25%'
    }]
  } else if (monthlyCostUSD < 80) {
    return [{
      name: t('recHome5'),
      capacity: '5 kWh',
      description: t('recHome5Desc'),
      icon: '\uD83C\uDFE0',
      savings: '30-50%'
    }]
  } else if (monthlyCostUSD < 150) {
    return [
      {
        name: t('recHome10'),
        capacity: '10 kWh',
        description: t('recHome10Desc'),
        icon: '\uD83C\uDFE1',
        savings: '40-60%'
      },
      {
        name: t('recHome5'),
        capacity: '5 kWh',
        description: t('recHome5Desc'),
        icon: '\uD83C\uDFE0',
        savings: '30-50%'
      }
    ]
  } else {
    return [
      {
        name: t('recHome20'),
        capacity: '20 kWh',
        description: t('recHome20Desc'),
        icon: '\u26A1',
        savings: '50-70%'
      },
      {
        name: t('recHome10'),
        capacity: '10 kWh',
        description: t('recHome10Desc'),
        icon: '\uD83C\uDFE1',
        savings: '40-60%'
      }
    ]
  }
}

const USD_RATES: Record<string, number> = {
  vi: 25000, th: 35, tl: 56, id: 15500, ms: 4.7,
  es: 1, ar: 3.75, ru: 90, en: 1, pt: 5.5,
}

export default function Calculator() {
  const { t, locale, localeConfig } = useI18n()
  const [mode, setMode] = useState<'quick' | 'appliance'>('quick')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const [selectedAppliances, setSelectedAppliances] = useState<Record<string, { selected: boolean; hours: number }>>({})
  const [showResult, setShowResult] = useState(false)

  const electricityPrice = customPrice ? parseFloat(customPrice) : localeConfig.electricityPrice
  const currencySymbol = localeConfig.currency

  const toggleAppliance = (key: string, defaultHours: number) => {
    setSelectedAppliances(prev => {
      const current = prev[key]
      if (current?.selected) {
        return { ...prev, [key]: { selected: false, hours: defaultHours } }
      }
      return { ...prev, [key]: { selected: true, hours: current?.hours || defaultHours } }
    })
    setShowResult(false)
  }

  const updateHours = (key: string, hours: number) => {
    setSelectedAppliances(prev => ({
      ...prev,
      [key]: { ...prev[key], selected: prev[key]?.selected || false, hours }
    }))
    setShowResult(false)
  }

  const applianceCalc = useMemo(() => {
    let totalDailyWh = 0
    Object.entries(selectedAppliances).forEach(([key, val]) => {
      if (val.selected) {
        const app = APPLIANCES.find(a => a.key === key)
        if (app) totalDailyWh += app.watts * val.hours
      }
    })
    const dailyKwh = totalDailyWh / 1000
    const monthlyKwh = dailyKwh * 30
    const monthlyCost = monthlyKwh * electricityPrice
    return { dailyKwh, monthlyKwh, monthlyCost }
  }, [selectedAppliances, electricityPrice])

  const quickCalcCost = monthlyBill ? parseFloat(monthlyBill) : 0
  const currentCost = mode === 'quick' ? quickCalcCost : applianceCalc.monthlyCost
  const currentKwh = mode === 'quick' ? (quickCalcCost / electricityPrice) : applianceCalc.monthlyKwh
  const costInUSD = currentCost / (USD_RATES[locale] || 1)
  const recommendations = showResult ? getRecommendation(costInUSD, t) : []
  const selectedCount = Object.values(selectedAppliances).filter(v => v.selected).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white px-4 pt-6 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{'\u26A1'}</span>
            <h1 className="text-xl font-bold">{t('calcTitle')}</h1>
          </div>
          <p className="text-emerald-100 text-sm">{t('calcSubtitle')}</p>
          <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-emerald-200 text-[10px] uppercase tracking-wider">{t('currentRate')}</p>
              <p className="text-white font-bold text-lg">{currencySymbol}{electricityPrice}<span className="text-sm font-normal text-emerald-200">/kWh</span></p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-right">
              <p className="text-emerald-200 text-[10px] uppercase tracking-wider">{t('region')}</p>
              <p className="text-white font-medium text-sm">{localeConfig.flag} {localeConfig.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-4 -mt-4 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg shadow-emerald-100/50 p-1.5 flex gap-1">
          <button
            onClick={() => { setMode('quick'); setShowResult(false) }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'quick'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-emerald-200'
                : 'text-gray-500'
            }`}
          >
            {'\u26A1'} {t('quickCalc')}
          </button>
          <button
            onClick={() => { setMode('appliance'); setShowResult(false) }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'appliance'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-emerald-200'
                : 'text-gray-500'
            }`}
          >
            {'\uD83C\uDFE0'} {t('applianceCalc')}
          </button>
        </div>
      </div>

      {/* Custom Price Input */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{'\uD83D\uDCB0'}</span>
            <label className="text-xs font-semibold text-gray-700">{t('customPrice')}</label>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{currencySymbol}</span>
              <input
                type="number"
                step="0.01"
                placeholder={String(localeConfig.electricityPrice)}
                value={customPrice}
                onChange={e => { setCustomPrice(e.target.value); setShowResult(false) }}
                className="w-full pl-8 pr-14 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 outline-none transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">/kWh</span>
            </div>
            {customPrice && (
              <button onClick={() => setCustomPrice('')} className="text-xs text-gray-400 px-2 py-1 rounded-lg hover:bg-gray-100">
                {'\u2715'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Calc Mode */}
      {mode === 'quick' && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm">{'\uD83D\uDCA1'}</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{t('enterBill')}</h3>
                <p className="text-[10px] text-gray-400">{t('enterBillDesc')}</p>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold text-lg">{currencySymbol}</span>
              <input
                type="number"
                placeholder="0"
                value={monthlyBill}
                onChange={e => { setMonthlyBill(e.target.value); setShowResult(false) }}
                className="w-full pl-12 pr-4 py-4 border-2 border-emerald-200 rounded-2xl text-2xl font-bold text-gray-800 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all text-center"
              />
            </div>
            <p className="text-center text-gray-400 text-[10px] mt-2">{t('monthlyAmount')}</p>
          </div>
        </div>
      )}

      {/* Appliance Mode */}
      {mode === 'appliance' && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm">{'\uD83C\uDFE0'}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{t('selectAppliances')}</h3>
                  <p className="text-[10px] text-gray-400">{t('selectAppliancesDesc')}</p>
                </div>
              </div>
              {selectedCount > 0 && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {selectedCount}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {APPLIANCES.map(app => {
                const state = selectedAppliances[app.key]
                const isSelected = state?.selected || false
                const hours = state?.hours ?? app.defaultHours
                return (
                  <div key={app.key} className="relative">
                    <button
                      onClick={() => toggleAppliance(app.key, app.defaultHours)}
                      className={`w-full flex flex-col items-center py-3 px-1 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-50 shadow-sm shadow-emerald-100'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <span className="text-2xl mb-1">{app.icon}</span>
                      <span className={`text-[10px] font-medium leading-tight text-center ${isSelected ? 'text-emerald-700' : 'text-gray-600'}`}>
                        {t(app.key)}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-0.5">{app.watts}W</span>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px]">{'\u2713'}</span>
                        </div>
                      )}
                    </button>
                    {isSelected && (
                      <div className="mt-1 flex items-center gap-1 justify-center">
                        <button
                          onClick={() => updateHours(app.key, Math.max(0.5, hours - 0.5))}
                          className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs"
                        >{'\u2212'}</button>
                        <span className="text-[10px] text-gray-600 font-medium w-8 text-center">{hours}h</span>
                        <button
                          onClick={() => updateHours(app.key, Math.min(24, hours + 0.5))}
                          className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xs"
                        >+</button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {selectedCount > 0 && (
              <div className="mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-gray-500">{t('dailyUsage')}</p>
                    <p className="text-sm font-bold text-gray-800">{applianceCalc.dailyKwh.toFixed(1)} <span className="text-[10px] font-normal">kWh</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">{t('monthlyUsage')}</p>
                    <p className="text-sm font-bold text-gray-800">{applianceCalc.monthlyKwh.toFixed(0)} <span className="text-[10px] font-normal">kWh</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">{t('monthlyCost')}</p>
                    <p className="text-sm font-bold text-emerald-600">{currencySymbol}{applianceCalc.monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <div className="px-4 mt-4">
        <button
          onClick={() => setShowResult(true)}
          disabled={mode === 'quick' ? !monthlyBill : selectedCount === 0}
          className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all ${
            (mode === 'quick' ? monthlyBill : selectedCount > 0)
              ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-emerald-200 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {'\u26A1'} {t('calculateNow')}
        </button>
      </div>

      {/* Results */}
      {showResult && currentCost > 0 && (
        <div className="px-4 mt-6 space-y-4" style={{ animation: 'slideUp 0.4s ease-out' }}>
          {/* Cost Summary Card */}
          <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-5 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">{t('yourElectricity')}</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-extrabold">{currencySymbol}{currentCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="text-emerald-200 text-sm mb-1">/{t('month')}</span>
            </div>
            <p className="text-emerald-200 text-xs">{currentKwh.toFixed(0)} kWh {t('perMonth')}</p>
            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-emerald-200 text-[10px]">{t('dailyCost')}</p>
                <p className="font-bold text-lg">{currencySymbol}{(currentCost / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-emerald-200 text-[10px]">{t('yearlyCost')}</p>
                <p className="font-bold text-lg">{currencySymbol}{(currentCost * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>

          {/* Savings Potential */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{'\uD83D\uDCA1'}</span>
              <h3 className="font-bold text-gray-800 text-sm">{t('savingsPotential')}</h3>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">{t('savingsDesc')}</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1 bg-white rounded-xl p-3 text-center border border-amber-100">
                <p className="text-[10px] text-gray-500">{t('monthlySavings')}</p>
                <p className="text-amber-600 font-bold text-lg">{currencySymbol}{(currentCost * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 text-center border border-amber-100">
                <p className="text-[10px] text-gray-500">{t('yearlySavings')}</p>
                <p className="text-amber-600 font-bold text-lg">{currencySymbol}{(currentCost * 0.4 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>

          {/* Product Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{'\uD83C\uDFAF'}</span>
              <h3 className="font-bold text-gray-800 text-sm">{t('recommended')}</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                  {i === 0 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                      {'\u2B50'} {t('bestMatch')}
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {rec.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{rec.name}</h4>
                      <p className="text-emerald-600 text-xs font-semibold">{rec.capacity}</p>
                      <p className="text-gray-500 text-[11px] mt-1 line-clamp-2">{rec.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {'\uD83D\uDCB0'} {t('save')} {rec.savings}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/collections/all"
                    className="mt-3 block w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-emerald-200 active:scale-[0.98] transition-transform">
                    {t('viewProducts')} {'\u2192'}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Calculator Link */}
          {mode === 'quick' && (
            <div className="text-center pb-4">
              <button
                onClick={() => { setMode('appliance'); setShowResult(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200"
              >
                {'\uD83C\uDFE0'} {t('detailedCalc')}
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
