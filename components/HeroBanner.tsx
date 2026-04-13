'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShopifyProduct, formatPrice } from '@/lib/shopify'
import { useI18n } from '@/lib/i18n/context'

export default function HeroBanner({ products }: { products: ShopifyProduct[] }) {
  const { t } = useI18n()
  const featured = products[0]
  if (!featured) return null

  const image = featured.images[0]
  const price = featured.variants[0]?.price

  return (
    <Link href={`/products/${featured.handle}`} className="block relative rounded-2xl overflow-hidden mx-2 shadow-lg">
      <div className="aspect-[16/10] relative bg-gradient-to-br from-gray-100 to-gray-200">
        {image && (
          <Image
            src={image.src}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
            🏠 {t('homeTag')}
          </span>
          <h2 className="text-white text-lg font-bold leading-tight line-clamp-2">
            {featured.title}
          </h2>
          <p className="text-green-300 font-extrabold text-sm mt-1">
            {formatPrice(price)}
          </p>
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        {t('viewDetail')} →
      </div>
    </Link>
  )
}
