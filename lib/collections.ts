export interface CollectionInfo {
  handle: string
  title: string
  icon: string
  description: string
}

export const COLLECTIONS: CollectionInfo[] = [
  { handle: 'pin-12v', title: 'Pin 12V', icon: '🔋', description: 'Pin LiFePO4 12V chất lượng cao' },
  { handle: 'luu-tru-gia-dinh', title: 'Lưu Trữ Gia Đình', icon: '🏠', description: 'Hệ thống lưu trữ năng lượng cho gia đình' },
  { handle: 'cong-nghiep', title: 'Lưu Trữ Công Nghiệp', icon: '🏭', description: 'Giải pháp lưu trữ năng lượng công nghiệp' },
  { handle: 'inverter', title: 'Inverter', icon: '⚡', description: 'Bộ chuyển đổi điện inverter' },
  { handle: 'solar', title: 'Hệ Thống Năng Lượng Mặt Trời', icon: '☀️', description: 'Giải pháp năng lượng mặt trời' },
]

export const NAV_ITEMS = [
  { href: '/', label: 'Trang Chủ', icon: '🏠' },
  ...COLLECTIONS.map(c => ({ href: `/collections/${c.handle}`, label: c.title, icon: c.icon })),
  { href: '/calculator', label: 'Tính Điện', icon: '🧮' },
  { href: '/about', label: 'Giới Thiệu', icon: '💡' },
  { href: '/contact', label: 'Liên Hệ', icon: '📞' },
]

export const BOTTOM_TABS = [
  { href: '/', label: 'Trang chủ', icon: 'home' },
  { href: '/collections/all', label: 'Sản phẩm', icon: 'grid' },
  { href: '/calculator', label: 'Tính điện', icon: 'zap' },
  { href: '/contact', label: 'Liên hệ', icon: 'message' },
]
