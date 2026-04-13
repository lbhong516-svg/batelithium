'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COLLECTIONS } from '@/lib/collections'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Batelithium</h2>
            <p className="text-xs text-green-100">LiFePO4 Lưu Trữ Năng Lượng</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
            aria-label="Đóng menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <NavLink href="/" icon="🏠" label="Trang Chủ" active={pathname === '/'} onClick={onClose} />

          <div className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Danh Mục Sản Phẩm
          </div>

          {COLLECTIONS.map((c) => (
            <NavLink
              key={c.handle}
              href={`/collections/${c.handle}`}
              icon={c.icon}
              label={c.title}
              active={pathname === `/collections/${c.handle}`}
              onClick={onClose}
            />
          ))}

          <div className="my-2 mx-4 h-px bg-gray-100" />

          <NavLink href="/calculator" icon="🧮" label="Tính Điện" active={pathname === '/calculator'} onClick={onClose} />
          <NavLink href="/about" icon="💡" label="Giới Thiệu" active={pathname === '/about'} onClick={onClose} />
          <NavLink href="/contact" icon="📞" label="Liên Hệ" active={pathname === '/contact'} onClick={onClose} />
        </nav>

        {/* CTA */}
        <div className="p-3 border-t border-gray-100">
          <Link
            href="/calculator"
            onClick={onClose}
            className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl px-4 py-2.5 shadow-sm active:scale-95 transition-transform"
          >
            <span className="text-xl">🧮</span>
            <div className="flex-1">
              <div className="text-xs font-bold">Chỉ cần 30 giây</div>
              <div className="text-[10px] opacity-90">Biết ngay tiết kiệm bao nhiêu tiền điện!</div>
            </div>
            <span className="bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              Thử ngay →
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}

function NavLink({ href, icon, label, active, onClick }: {
  href: string
  icon: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
        active
          ? 'text-green-600 bg-green-50 font-semibold border-r-3 border-green-600'
          : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
