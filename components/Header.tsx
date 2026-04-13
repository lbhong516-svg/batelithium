'use client'

import Link from 'next/link'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-700 to-green-600 text-white shadow-md">
        <div className="max-w-lg mx-auto flex items-center justify-between h-12 px-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition"
            aria-label="Mở menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">Batelithium</span>
          </Link>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition"
            aria-label="Tìm kiếm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {searchOpen && (
          <div className="px-3 pb-2 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-full bg-white/15 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/25 transition"
                autoFocus
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        )}
      </header>

      {/* Marquee banner */}
      <div className="fixed top-12 left-0 right-0 z-40 bg-green-50 border-b border-green-100 overflow-hidden h-6 flex items-center">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs text-green-700 font-medium">
          <span>🔋 Pin LiFePO4 chính hãng</span>
          <span>•</span>
          <span>🚚 Miễn phí vận chuyển toàn quốc</span>
          <span>•</span>
          <span>🛡️ Bảo hành 5 năm</span>
          <span>•</span>
          <span>⚡ 5000 chu kỳ sạc</span>
          <span>•</span>
          <span>🏆 Chất lượng hàng đầu Việt Nam</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>🔋 Pin LiFePO4 chính hãng</span>
          <span>•</span>
          <span>🚚 Miễn phí vận chuyển toàn quốc</span>
          <span>•</span>
          <span>🛡️ Bảo hành 5 năm</span>
          <span>•</span>
          <span>⚡ 5000 chu kỳ sạc</span>
          <span>•</span>
          <span>🏆 Chất lượng hàng đầu Việt Nam</span>
        </div>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
