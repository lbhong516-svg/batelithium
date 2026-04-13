'use client'

import { useState } from 'react'

export default function Calculator() {
  const [bill, setBill] = useState('50000')
  const [calculated, setCalculated] = useState(false)

  const monthlyBill = parseInt(bill) || 0
  const monthlySavings = Math.round(monthlyBill * 0.35)
  const yearlySavings = monthlySavings * 12
  const fiveYearSavings = yearlySavings * 5

  return (
    <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-4 mx-2 text-white shadow-lg">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
        ⚡ Nhanh xem tiền điện của bạn
      </h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="number"
            value={bill}
            onChange={(e) => { setBill(e.target.value); setCalculated(false) }}
            className="w-full h-10 rounded-xl bg-white/15 border border-white/20 px-4 text-white text-center text-lg font-bold placeholder-white/50 focus:outline-none focus:bg-white/25 transition"
            placeholder="Nhập tiền điện"
          />
          {bill && (
            <button
              onClick={() => { setBill(''); setCalculated(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <span className="text-xs text-white/80">kWh/tháng</span>
        <button
          onClick={() => setCalculated(true)}
          className="bg-white text-green-700 font-bold text-sm px-4 h-10 rounded-xl hover:bg-green-50 active:scale-95 transition-all shadow-sm"
        >
          Tính
        </button>
      </div>

      {calculated && monthlyBill > 0 && (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-[10px] text-white/70">Tiền điện / tháng</div>
            <div className="text-lg font-extrabold text-yellow-300">
              {monthlySavings.toLocaleString('vi-VN')} ₫
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-[10px] text-white/70">Tiết kiệm 5 năm</div>
            <div className="text-lg font-extrabold text-yellow-300">
              {fiveYearSavings.toLocaleString('vi-VN')} ₫
            </div>
          </div>
        </div>
      )}

      <a
        href="/calculator"
        className="block text-center text-xs text-white/70 mt-3 hover:text-white transition"
      >
        Chi tiết phân tích theo thiết bị →
      </a>
    </div>
  )
}
