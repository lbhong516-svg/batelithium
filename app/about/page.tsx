'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <div className="px-3 py-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t('backHome')}
        </Link>
      </div>

      <div className="px-3 space-y-5">
        <h1 className="text-xl font-extrabold text-gray-800">{'\uD83D\uDCA1'} {t('aboutTitle')}</h1>

        {/* Mission */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-2">{'\uD83C\uDFAF'} {t('mission')}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('missionDesc')}
          </p>
        </section>

        {/* Why LiFePO4 */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-3">{'\uD83D\uDD0B'} {t('whyChoose')}</h2>
          <div className="space-y-3">
            <InfoItem icon={'\uD83D\uDEE1\uFE0F'} title={t('safe')} desc={t('safeDesc')} />
            <InfoItem icon={'\u23F3'} title={t('longLife')} desc={t('longLifeDesc')} />
            <InfoItem icon={'\uD83D\uDCB0'} title={t('saveCost')} desc={t('saveCostDesc')} />
            <InfoItem icon={'\uD83C\uDF3F'} title={t('eco')} desc={t('ecoDesc')} />
          </div>
        </section>

        {/* Products overview */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-3">{'\uD83D\uDCE6'} {t('ourProducts')}</h2>
          <div className="space-y-2">
            <ProductLine icon={'\uD83D\uDD0B'} title={t('pin12v')} desc="LiFePO4 12V 100Ah+" />
            <ProductLine icon={'\uD83C\uDFE0'} title={t('homeStorage')} desc="1.28kW - 16kW" />
            <ProductLine icon={'\uD83C\uDFED'} title={t('industrial')} desc="125kW - 261kW" />
            <ProductLine icon={'\u26A1'} title={t('inverter')} desc="High-quality inverters" />
            <ProductLine icon={'\u2600\uFE0F'} title={t('solar')} desc="Solar + Storage" />
          </div>
        </section>

        {/* Warranty */}
        <section className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-4 text-white shadow-lg">
          <h2 className="text-base font-bold mb-3">{'\uD83C\uDFC6'} {t('commitment')}</h2>
          <div className="space-y-2">
            <Commitment text={t('warranty5y')} />
            <Commitment text={t('freeShip')} />
            <Commitment text={t('cycles5000')} />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-sm font-bold text-green-800 mb-1">{t('interested')}</p>
          <p className="text-xs text-green-600 mb-3">{t('contactForConsult')}</p>
          <div className="flex gap-2">
            <a href="tel:+8613612911335" className="flex-1 bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform">
              {'\uD83D\uDCDE'} +8613612911335
            </a>
            <Link href="/contact" className="flex-1 bg-white text-green-700 border border-green-300 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform">
              {'\u2709\uFE0F'} {t('sendMsg')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function ProductLine({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2 bg-green-50 rounded-xl p-2.5">
      <span className="text-lg">{icon}</span>
      <div>
        <h3 className="text-xs font-bold text-gray-800">{title}</h3>
        <p className="text-[10px] text-gray-500">{desc}</p>
      </div>
    </div>
  )
}

function Commitment({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-green-300">✓</span>
      <span>{text}</span>
    </div>
  )
}
