'use client'

import { ShopifyProduct } from '@/lib/shopify'
import { useI18n } from '@/lib/i18n/context'
import HeroBanner from './HeroBanner'
import ProductCard from './ProductCard'
import Link from 'next/link'

export default function HomePageClient({ products }: { products: ShopifyProduct[] }) {
  const { t } = useI18n()
  
  const collections = [
    { handle: 'home-battery', label: t('homeEnergy'), icon: '🏠' },
    { handle: 'commercial', label: t('commercial'), icon: '🏢' },
    { handle: 'portable', label: t('portable'), icon: '🔋' },
    { handle: 'accessories', label: t('accessories'), icon: '🔌' },
  ]

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="pt-2 pb-4">
        <HeroBanner products={products} />
      </section>

      {/* Calculator CTA */}
      <section className="mx-3 mb-4">
        <Link href="/calculator" className="block bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{t('calcTitle')}</h3>
              <p className="text-green-100 text-xs mt-0.5">{t('calcSubtitle')}</p>
            </div>
            <div className="text-white/80 text-xl">→</div>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="px-3 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-3">{t('categories')}</h2>
        <div className="grid grid-cols-4 gap-2">
          {collections.map(col => (
            <Link key={col.handle} href={`/collections/${col.handle}`}
              className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:scale-95 transition-transform">
              <span className="text-2xl mb-1">{col.icon}</span>
              <span className="text-[10px] text-gray-600 text-center leading-tight">{col.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="px-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">{t('hotProducts')}</h2>
          <Link href="/collections/all" className="text-xs text-green-600 font-medium">
            {t('viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
