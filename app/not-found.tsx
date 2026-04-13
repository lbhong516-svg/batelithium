import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-6xl mb-4">🔍</span>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-sm text-gray-500 mb-6">Trang bạn tìm kiếm không tồn tại</p>
      <Link
        href="/"
        className="bg-green-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl active:scale-95 transition-transform"
      >
        ← Về Trang Chủ
      </Link>
    </div>
  )
}
