'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    setSubmitted(true)
  }

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
        <h1 className="text-xl font-extrabold text-gray-800">📞 Liên Hệ</h1>

        {/* Quick contact */}
        <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-4 text-white shadow-lg">
          <h2 className="text-sm font-bold mb-3">Liên hệ nhanh</h2>
          <div className="space-y-3">
            <a href="tel:+8613612911335" className="flex items-center gap-3 bg-white/10 rounded-xl p-3 active:bg-white/20 transition">
              <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">📞</span>
              <div>
                <div className="text-xs text-white/70">Điện thoại</div>
                <div className="text-sm font-bold">+8613612911335</div>
              </div>
            </a>
            <a href="mailto:contact@batelithium.com" className="flex items-center gap-3 bg-white/10 rounded-xl p-3 active:bg-white/20 transition">
              <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">📧</span>
              <div>
                <div className="text-xs text-white/70">Email</div>
                <div className="text-sm font-bold">contact@batelithium.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">🕐</span>
              <div>
                <div className="text-xs text-white/70">Giờ làm việc</div>
                <div className="text-sm font-bold">8:00 - 18:00 (Thứ 2 - Thứ 7)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-3">✉️ Gửi Tin Nhắn</h2>

          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <span className="text-4xl block mb-3">🎉</span>
              <h3 className="text-base font-bold text-green-700 mb-1">Gửi thành công!</h3>
              <p className="text-xs text-gray-500 mb-4">Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất</p>
              <button
                onClick={() => { setSubmitted(false); setName(''); setPhone(''); setMessage('') }}
                className="text-xs text-green-600 font-medium hover:underline"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Họ tên *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ tên của bạn"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nội dung *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform"
              >
                Gửi tin nhắn →
              </button>
            </form>
          )}
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-3">❓ Câu Hỏi Thường Gặp</h2>
          <div className="space-y-3">
            <FAQ
              q="Pin LiFePO4 có bảo hành bao lâu?"
              a="Tất cả sản phẩm của Batelithium đều được bảo hành 5 năm. Pin có tuổi thọ thực tế lên đến 10-15 năm với 5000+ chu kỳ sạc/xả."
            />
            <FAQ
              q="Chi phí lắp đặt là bao nhiêu?"
              a="Chi phí lắp đặt phụ thuộc vào quy mô hệ thống. Liên hệ chúng tôi để được tư vấn và báo giá miễn phí."
            />
            <FAQ
              q="Có hỗ trợ vận chuyển toàn quốc không?"
              a="Có, chúng tôi miễn phí vận chuyển toàn quốc cho tất cả đơn hàng. Thời gian giao hàng từ 3-7 ngày tùy khu vực."
            />
            <FAQ
              q="Có thể kết hợp với hệ thống solar không?"
              a="Hoàn toàn có thể! Hệ thống pin LiFePO4 của chúng tôi tương thích với mọi hệ thống solar. Chúng tôi cũng cung cấp giải pháp solar trọn gói."
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-l-3 border-green-200 pl-3">
      <h3 className="text-xs font-bold text-gray-800 mb-0.5">{q}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
    </div>
  )
}
