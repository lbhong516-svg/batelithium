'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-8 pb-20">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-1">Batelithium</h3>
          <p className="text-xs text-gray-400">{t('footerTagline')}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-2 text-xs uppercase tracking-wider">{t('products')}</h4>
            <ul className="space-y-1.5">
              <li><Link href="/collections/pin-12v" className="hover:text-white transition text-xs">{t('battery12v')}</Link></li>
              <li><Link href="/collections/luu-tru-gia-dinh" className="hover:text-white transition text-xs">{t('homeStorage')}</Link></li>
              <li><Link href="/collections/cong-nghiep" className="hover:text-white transition text-xs">{t('industrial')}</Link></li>
              <li><Link href="/collections/inverter" className="hover:text-white transition text-xs">{t('inverter')}</Link></li>
              <li><Link href="/collections/solar" className="hover:text-white transition text-xs">{t('solar')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 text-xs uppercase tracking-wider">{t('support')}</h4>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-white transition text-xs">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition text-xs">{t('contact')}</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition text-xs">{t('calculator')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📞</span>
            <a href="tel:+8613612911335" className="text-xs hover:text-white transition">+8613612911335</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">📧</span>
            <a href="mailto:contact@batelithium.com" className="text-xs hover:text-white transition">contact@batelithium.com</a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-[10px] text-gray-500">
            © {new Date().getFullYear()} Batelithium. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
