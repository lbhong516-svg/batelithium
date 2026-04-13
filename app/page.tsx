import { getAllProducts } from '@/lib/shopify'
import { COLLECTIONS } from '@/lib/collections'
import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import Calculator from '@/components/Calculator'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getAllProducts()

  return (
    <div className="space-y-5 py-3">
      {/* Hero Banner */}
      <HeroBanner products={products} />

      {/* Category quick links */}
      <div className="flex gap-2 px-2 overflow-x-auto hide-scrollbar py-1">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.handle}
            href={`/collections/${c.handle}`}
            className="flex flex-col items-center gap-1 min-w-[72px]"
          >
            <span className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl border border-gray-100 active:scale-95 transition-transform">
              {c.icon}
            </span>
            <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">
              {c.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Calculator CTA */}
      <Link
        href="/calculator"
        className="mx-2 flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl px-4 py-2.5 shadow-sm active:scale-[0.98] transition-transform"
      >
        <span className="text-2xl">🧮</span>
        <div className="flex-1">
          <div className="text-xs font-bold">Chỉ cần 30 giây</div>
          <div className="text-[10px] opacity-90">Biết ngay tiết kiệm bao nhiêu tiền điện!</div>
        </div>
        <span className="bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
          Thử ngay →
        </span>
      </Link>

      {/* Inline Calculator */}
      <Calculator />

      {/* Featured Products */}
      <section className="mt-4" aria-label="Sản phẩm nổi bật">
        <div className="flex items-center justify-between px-3 mb-3">
          <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-1.5">
            🔥 Sản Phẩm Nổi Bật
          </h2>
          <Link href="/collections/all" className="text-xs text-green-600 font-medium hover:underline">
            Xem tất cả ›
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 px-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-2 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-base font-extrabold text-gray-800 mb-4">
          Tại Sao Nên Chuyển Sang Pin LiFePO4?
        </h2>
        <div className="space-y-4">
          <Feature
            title="Tiết Kiệm Chi Phí"
            desc="Hệ thống lưu trữ năng lượng giúp bạn tích điện vào giờ thấp điểm (giá rẻ) và sử dụng vào giờ cao điểm (giá đắt), tiết kiệm đến 30% chi phí điện mỗi tháng."
            color="text-green-600"
          />
          <Feature
            title="Tuổi Thọ Cao"
            desc="Pin LiFePO4 có tuổi thọ lên đến 5000 chu kỳ sạc/xả, tương đương 10-15 năm sử dụng. Bảo hành 5 năm từ Batelithium."
            color="text-blue-600"
          />
          <Feature
            title="An Toàn Tuyệt Đối"
            desc="Công nghệ LiFePO4 là loại pin an toàn nhất, không cháy nổ, không phát thải khí độc hại. Phù hợp cho gia đình và doanh nghiệp."
            color="text-orange-600"
          />
          <Feature
            title="Thân Thiện Môi Trường"
            desc="Giảm lượng khí thải CO2 bằng cách sử dụng năng lượng mặt trời kết hợp pin lưu trữ. Góp phần bảo vệ môi trường cho thế hệ tương lai."
            color="text-emerald-600"
          />
        </div>
      </section>
    </div>
  )
}

function Feature({ title, desc, color }: { title: string; desc: string; color: string }) {
  return (
    <div className="border-l-3 border-green-200 pl-3">
      <h3 className={`font-bold text-sm ${color} mb-1`}>{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}
