'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShopifyProduct, formatPrice } from '@/lib/shopify'
import { useI18n } from '@/lib/i18n/context'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const { t } = useI18n()
  const image = product.images[0]
  const price = product.variants[0]?.price

  return (
    <Link href={`/products/${product.handle}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
      <div className="aspect-square relative bg-gray-50">
        {image ? (
          <Image src={image.src} alt={product.title} fill className="object-cover" sizes="50vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">🔋</div>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">
          {product.title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-green-600 font-bold text-sm">{formatPrice(price)}</span>
          <span className="text-[10px] text-gray-400">{t('viewDetail')}</span>
        </div>
      </div>
    </Link>
  )
}
