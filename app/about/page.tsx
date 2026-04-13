import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giới Thiệu - Batelithium',
  description: 'Batelithium - Nhà cung cấp pin LiFePO4 và hệ thống lưu trữ năng lượng hàng đầu Việt Nam.',
}

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Back */}
      <div className="px-3 py-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Trang chủ
        </Link>
      </div>

      <div className="px-3 space-y-5">
        <h1 className="text-xl font-extrabold text-gray-800">💡 Giới Thiệu Batelithium</h1>

        {/* Mission */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-2">🎯 Sứ Mệnh</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Batelithium cam kết mang đến giải pháp lưu trữ năng lượng sạch, an toàn và bền vững cho mọi gia đình
            và doanh nghiệp Việt Nam. Chúng tôi tin rằng năng lượng xanh là tương lai và pin LiFePO4 là chìa khóa
            để mở ra kỷ nguyên năng lượng mới.
          </p>
        </section>

        {/* Why LiFePO4 */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-3">🔋 Tại Sao Chọn Pin LiFePO4?</h2>
          <div className="space-y-3">
            <InfoItem
              icon="🛡️"
              title="An Toàn Tuyệt Đối"
              desc="Pin LiFePO4 là loại pin an toàn nhất hiện nay, không cháy nổ, không phát thải khí độc hại. Hoàn toàn phù hợp cho môi trường gia đình."
            />
            <InfoItem
              icon="⏳"
              title="Tuổi Thọ Vượt Trội"
              desc="5000+ chu kỳ sạc/xả, tương đương 10-15 năm sử dụng. Gấp 5 lần pin chì-axit truyền thống."
            />
            <InfoItem
              icon="💰"
              title="Tiết Kiệm Chi Phí"
              desc="Tích điện giờ thấp điểm, sử dụng giờ cao điểm. Tiết kiệm đến 35% chi phí điện hàng tháng."
            />
            <InfoItem
              icon="🌿"
              title="Thân Thiện Môi Trường"
              desc="Không chứa kim loại nặng độc hại, có thể tái chế 100%. Góp phần bảo vệ môi trường cho thế hệ tương lai."
            />
            <InfoItem
              icon="⚡"
              title="Hiệu Suất Cao"
              desc="Hiệu suất chuyển đổi năng lượng đạt 96%, vượt xa các loại pin truyền thống. Hoạt động ổn định trong dải nhiệt độ rộng."
            />
          </div>
        </section>

        {/* Products overview */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-green-700 mb-3">📦 Sản Phẩm Của Chúng Tôi</h2>
          <div className="space-y-2">
            <ProductLine icon="🔋" title="Pin LiFePO4 12V" desc="Dung lượng từ 100Ah, phù hợp cho xe du lịch, thuyền, hệ thống solar nhỏ" />
            <ProductLine icon="🏠" title="Lưu Trữ Gia Đình" desc="Hệ thống 1.28kW - 16kW, phù hợp cho hộ gia đình, biệt thự" />
            <ProductLine icon="🏭" title="Lưu Trữ Công Nghiệp" desc="Hệ thống 125kW - 261kW, phù hợp cho nhà máy, khu công nghiệp" />
            <ProductLine icon="⚡" title="Inverter" desc="Bộ chuyển đổi điện chất lượng cao, tương thích với mọi hệ thống" />
            <ProductLine icon="☀️" title="Năng Lượng Mặt Trời" desc="Giải pháp solar kết hợp lưu trữ, tối ưu hóa sử dụng năng lượng" />
          </div>
        </section>

        {/* Warranty */}
        <section className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-4 text-white shadow-lg">
          <h2 className="text-base font-bold mb-3">🏆 Cam Kết Của Chúng Tôi</h2>
          <div className="space-y-2">
            <Commitment text="Bảo hành 5 năm cho tất cả sản phẩm" />
            <Commitment text="Miễn phí vận chuyển toàn quốc" />
            <Commitment text="Hỗ trợ kỹ thuật 24/7" />
            <Commitment text="Đổi trả trong 30 ngày nếu không hài lòng" />
            <Commitment text="Tư vấn miễn phí, thiết kế hệ thống theo nhu cầu" />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-sm font-bold text-green-800 mb-1">Quan tâm đến sản phẩm?</p>
          <p className="text-xs text-green-600 mb-3">Liên hệ ngay để được tư vấn miễn phí</p>
          <div className="flex gap-2">
            <a href="tel:+8613612911335" className="flex-1 bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform">
              📞 +8613612911335
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
