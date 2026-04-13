import { getAllProducts, getCollectionProducts } from '@/lib/shopify'
import { COLLECTIONS } from '@/lib/collections'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    ...COLLECTIONS.map((c) => ({ handle: c.handle })),
    { handle: 'all' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  if (handle === 'all') {
    return {
      title: 'Tất Cả Sản Phẩm - Batelithium',
      description: 'Khám phá toàn bộ sản phẩm pin LiFePO4 và hệ thống lưu trữ năng lượng tại Batelithium.',
    }
  }
  const collection = COLLECTIONS.find((c) => c.handle === handle)
  return {
    title: `${collection?.title || 'Sản Phẩm'} - Batelithium`,
    description: collection?.description || 'Sản phẩm pin LiFePO4 chất lượng cao',
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const isAll = handle === 'all'
  const products = isAll ? await getAllProducts() : await getCollectionProducts(handle)
  const collection = COLLECTIONS.find((c) => c.handle === handle)

  const title = isAll ? 'Tất Cả Sản Phẩm' : collection?.title || 'Sản Phẩm'
  const icon = isAll ? '📦' : collection?.icon || '📦'
  const desc = isAll
    ? 'Khám phá toàn bộ sản phẩm pin LiFePO4 và hệ thống lưu trữ năng lượng'
    : collection?.description || ''

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <div className="px-3 py-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Trang chủ
        </Link>
      </div>

      {/* Collection header */}
      <div className="px-3 mb-4">
        <h1 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h1>
        {desc && <p className="text-xs text-gray-500 mt-1">{desc}</p>}
      </div>

      {/* Category filter bar */}
      <div className="flex gap-2 px-3 mb-4 overflow-x-auto hide-scrollbar">
        <Link
          href="/collections/all"
          className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
            isAll ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'
          }`}
        >
          Tất cả
        </Link>
        {COLLECTIONS.map((c) => (
          <Link
            key={c.handle}
            href={`/collections/${c.handle}`}
            className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
              handle === c.handle ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'
            }`}
          >
            {c.icon} {c.title}
          </Link>
        ))}
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-sm font-semibold text-gray-600 mb-1">Chưa có sản phẩm</p>
          <p className="text-xs text-gray-400 mb-4">Danh mục này đang được cập nhật</p>
          <Link href="/collections/all" className="text-xs text-green-600 font-medium hover:underline">
            Xem tất cả sản phẩm ›
          </Link>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mx-2 mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <p className="text-sm font-bold text-green-800 mb-1">Cần tư vấn sản phẩm?</p>
        <p className="text-xs text-green-600 mb-3">Liên hệ ngay để được hỗ trợ chọn sản phẩm phù hợp</p>
        <a href="tel:+8613612911335" className="inline-block bg-green-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl active:scale-95 transition-transform">
          📞 Gọi +8613612911335
        </a>
      </div>
    </div>
  )
}
