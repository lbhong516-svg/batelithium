import { getAllProducts, getProduct, formatPrice, SHOPIFY_STORE_DOMAIN } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return {}
  return {
    title: `${product.title} - Batelithium`,
    description: product.body_html?.replace(/<[^>]*>/g, '').slice(0, 160) || product.title,
    openGraph: {
      title: product.title,
      description: product.body_html?.replace(/<[^>]*>/g, '').slice(0, 160) || product.title,
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  const price = product.variants[0]?.price
  const comparePrice = product.variants[0]?.compare_at_price
  const variantId = product.variants[0]?.id

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <div className="px-3 py-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Quay lại
        </Link>
      </div>

      {/* Image gallery */}
      <div className="relative aspect-square bg-white mx-2 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {product.images[0] && (
          <Image
            src={product.images[0].src}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="100vw"
            priority
          />
        )}
        {comparePrice && parseInt(comparePrice) > parseInt(price) && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{Math.round((1 - parseInt(price) / parseInt(comparePrice)) * 100)}%
          </span>
        )}
      </div>

      {/* Image thumbnails */}
      {product.images.length > 1 && (
        <div className="flex gap-2 px-3 mt-3 overflow-x-auto hide-scrollbar">
          {product.images.map((img, i) => (
            <div key={img.id} className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 bg-white flex-shrink-0">
              <Image src={img.src} alt={`${product.title} ${i + 1}`} width={64} height={64} className="object-contain p-1" />
            </div>
          ))}
        </div>
      )}

      {/* Product info */}
      <div className="px-3 mt-4 space-y-3">
        <h1 className="text-xl font-extrabold text-gray-800 leading-tight">{product.title}</h1>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-extrabold text-red-600">{formatPrice(price)}</span>
          {comparePrice && parseInt(comparePrice) > parseInt(price) && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(comparePrice)}</span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => (
              <span key={tag} className="text-[10px] font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quick info badges */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          <Badge icon="🛡️" text="Bảo hành 5 năm" />
          <Badge icon="🚚" text="Miễn phí vận chuyển" />
          <Badge icon="🔄" text="5000 chu kỳ" />
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://${SHOPIFY_STORE_DOMAIN}/cart/${variantId}:1`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-green-600 to-green-500 text-white text-center font-bold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform"
          >
            🛒 Mua Ngay
          </a>
          <a
            href="tel:+8613612911335"
            className="block w-full bg-white text-green-700 text-center font-bold py-3 rounded-xl border-2 border-green-600 active:scale-[0.98] transition-transform"
          >
            📞 Gọi Tư Vấn: +8613612911335
          </a>
        </div>

        {/* Description */}
        {product.body_html && (
          <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 mb-3">📋 Mô Tả Sản Phẩm</h2>
            <div
              className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
            />
          </div>
        )}

        {/* Contact CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-sm font-bold text-green-800 mb-1">Cần tư vấn thêm?</p>
          <p className="text-xs text-green-600 mb-3">Liên hệ ngay để được hỗ trợ</p>
          <div className="flex gap-2">
            <a href="tel:+8613612911335" className="flex-1 bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform">
              📞 Gọi ngay
            </a>
            <Link href="/contact" className="flex-1 bg-white text-green-700 border border-green-300 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform">
              ✉️ Gửi tin nhắn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-[10px] font-medium text-gray-600 whitespace-nowrap">
      {icon} {text}
    </span>
  )
}
