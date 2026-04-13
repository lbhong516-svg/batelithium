'use client'

import { useEffect, useState } from 'react'
import { COLLECTIONS } from '@/lib/collections'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import type { ShopifyProduct } from '@/lib/shopify'

export default function CollectionContent({ handle }: { handle: string }) {
  const { t } = useI18n()
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  const isAll = handle === 'all'
  const collection = COLLECTIONS.find((c) => c.handle === handle)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const url = isAll
          ? `https://d9db04-dd.myshopify.com/products.json?limit=250`
          : `https://d9db04-dd.myshopify.com/collections/${handle}/products.json?limit=250`
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products || [])
        }
      } catch {
        setProducts([])
      }
      setLoading(false)
    }
    fetchProducts()
  }, [handle, isAll])

  const title = isAll ? t('allProducts') : (collection ? t(collection.titleKey) : t('products'))
  const icon = isAll ? '\uD83D\uDCE6' : (collection?.icon || '\uD83D\uDCE6')
  const desc = isAll ? '' : (collection ? t(collection.descKey) : '')

  return (
    <div className="animate-fade-in">
      <div className="px-3 py-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t('backHome')}
        </Link>
      </div>

      <div className="px-3 mb-4">
        <h1 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h1>
        {desc && <p className="text-xs text-gray-500 mt-1">{desc}</p>}
      </div>

      <div className="flex gap-2 px-3 mb-4 overflow-x-auto hide-scrollbar">
        <Link
          href="/collections/all"
          className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
            isAll ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'
          }`}
        >
          {t('viewAll')}
        </Link>
        {COLLECTIONS.map((c) => (
          <Link
            key={c.handle}
            href={`/collections/${c.handle}`}
            className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
              handle === c.handle ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'
            }`}
          >
            {c.icon} {t(c.titleKey)}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-3 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <span className="text-4xl mb-3 block">{'\uD83D\uDD0D'}</span>
          <p className="text-sm font-semibold text-gray-600 mb-1">{t('noProducts')}</p>
          <p className="text-xs text-gray-400 mb-4">{t('updatingCat')}</p>
          <Link href="/collections/all" className="text-xs text-green-600 font-medium hover:underline">
            {t('viewAll')} {'\u203A'}
          </Link>
        </div>
      )}

      <div className="mx-2 mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <p className="text-sm font-bold text-green-800 mb-1">{t('needProductConsult')}</p>
        <p className="text-xs text-green-600 mb-3">{t('contactForProduct')}</p>
        <a href="tel:+8613612911335" className="inline-block bg-green-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl active:scale-95 transition-transform">
          {'\uD83D\uDCDE'} {t('callNow')} +8613612911335
        </a>
      </div>
    </div>
  )
}
