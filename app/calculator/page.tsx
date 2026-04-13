'use client'

import { useState } from 'react'
import Link from 'next/link'

const APPLIANCES = [
  { name: 'Đèn LED', power: 10, hours: 8, icon: '💡' },
  { name: 'Quạt', power: 60, hours: 8, icon: '🌀' },
  { name: 'Điều hòa', power: 1200, hours: 8, icon: '❄️' },
  { name: 'Tủ lạnh', power: 150, hours: 24, icon: '🧊' },
  { name: 'Máy giặt', power: 500, hours: 1, icon: '🫧' },
  { name: 'TV', power: 100, hours: 6, icon: '📺' },
  { name: 'Máy tính', power: 200, hours: 8, icon: '💻' },
  { name: 'Bơm nước', power: 750, hours: 2, icon: '💧' },
]

export default function CalculatorPage() {
  const [items, setItems] = useState(
    APPLIANCES.map((a) => ({ ...a, qty: 0 }))
  )

  const totalWh = items.reduce((sum, item) => sum + item.power * item.hours * item.qty, 0)
  const totalKwh = totalWh / 1000
  const monthlyKwh = totalKwh * 30
  const pricePerKwh = 3000
  const monthlyCost = Math.round(monthlyKwh * pricePerKwh)
  const savings35 = Math.round(monthlyCost * 0.35)
  const recommendedCapacity = Math.ceil(totalWh / 1000 * 1.2)

  const updateQty = (index: number, delta: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    )
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

      <div className="px-3 mb-4">
        <h1 className="text-xl font-extrabold text-gray-800">⚡ Tính Tiền Điện</h1>
        <p className="text-xs text-gray-500 mt-1">Chọn thiết bị trong nhà bạn để tính lượng điện tiêu thụ</p>
      </div>

      {/* Appliance list */}
      <div className="px-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl w-8 text-center">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">{item.name}</div>
              <div className="text-[10px] text-gray-400">{item.power}W × {item.hours}h/ngày</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(i, -1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:bg-gray-200 transition font-bold"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-bold text-gray-800">{item.qty}</span>
              <button
                onClick={() => updateQty(i, 1)}
                className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 active:bg-green-200 transition font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {totalWh > 0 && (
        <div className="mx-2 mt-4 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-4 text-white shadow-lg animate-fade-in">
          <h3 className="text-sm font-bold mb-3">📊 Kết Quả Phân Tích</h3>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Tiêu thụ / ngày" value={`${totalKwh.toFixed(1)} kWh`} />
            <ResultCard label="Tiêu thụ / tháng" value={`${monthlyKwh.toFixed(0)} kWh`} />
            <ResultCard label="Chi phí / tháng" value={`${monthlyCost.toLocaleString('vi-VN')}₫`} highlight />
            <ResultCard label="Tiết kiệm 35%" value={`${savings35.toLocaleString('vi-VN')}₫`} highlight />
          </div>

          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <div className="text-xs font-bold text-yellow-300 mb-1">💡 Đề Xuất Hệ Thống</div>
            <p className="text-xs text-white/90">
              Với mức tiêu thụ của bạn, chúng tôi khuyên dùng hệ thống lưu trữ năng lượng
              <strong className="text-yellow-300"> {recommendedCapacity} kWh</strong>. Hệ thống này
              giúp bạn tiết kiệm đến <strong className="text-yellow-300">{(savings35 * 12).toLocaleString('vi-VN')}₫/năm</strong>.
            </p>
          </div>

          <a
            href="tel:+8613612911335"
            className="mt-3 block w-full bg-white text-green-700 text-center font-bold py-3 rounded-xl shadow-sm active:scale-[0.98] transition-transform"
          >
            📞 Tư Vấn Miễn Phí: +8613612911335
          </a>
        </div>
      )}
    </div>
  )
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white/10 rounded-xl p-3 text-center">
      <div className="text-[10px] text-white/70">{label}</div>
      <div className={`text-base font-extrabold ${highlight ? 'text-yellow-300' : 'text-white'}`}>{value}</div>
    </div>
  )
}
