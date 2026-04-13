import Link from 'next/link'
import Image from 'next/image'
import { ShopifyProduct, formatPrice } from '@/lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = product.variants[0]?.price
  const comparePrice = product.variants[0]?.compare_at_price
  const image = product.images[0]

  return (
    <Link href={`/products/${product.handle}`} className="product-card block">
      <article
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {image && (
            <Image
              src={image.src}
              alt={product.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
              itemProp="image"
            />
          )}
          {comparePrice && parseInt(comparePrice) > parseInt(price) && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{Math.round((1 - parseInt(price) / parseInt(comparePrice)) * 100)}%
            </span>
          )}
        </div>
        <div className="p-3">
          <h3
            className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 mb-1.5"
            itemProp="name"
          >
            {product.title}
          </h3>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-red-600" itemProp="price">
                {formatPrice(price)}
              </span>
              {comparePrice && parseInt(comparePrice) > parseInt(price) && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
            <meta itemProp="priceCurrency" content="VND" />
            <link itemProp="availability" href="https://schema.org/InStock" />
          </div>
        </div>
      </article>
    </Link>
  )
}
