import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Batelithium - Pin LiFePO4 & Hệ Thống Lưu Trữ Năng Lượng',
  description: 'Nhà cung cấp pin LiFePO4 và hệ thống lưu trữ năng lượng hàng đầu Việt Nam. Sản phẩm từ 1.28kW gia đình đến 261kW công nghiệp.',
  robots: 'index, follow',
  openGraph: {
    title: 'Batelithium - Pin LiFePO4 & Hệ Thống Lưu Trữ Năng Lượng',
    description: 'Nhà cung cấp pin LiFePO4 và hệ thống lưu trữ năng lượng hàng đầu Việt Nam. Sản phẩm từ 1.28kW gia đình đến 261kW công nghiệp.',
    siteName: 'Batelithium',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Batelithium - Pin LiFePO4 & Hệ Thống Lưu Trữ Năng Lượng',
    description: 'Nhà cung cấp pin LiFePO4 và hệ thống lưu trữ năng lượng hàng đầu Việt Nam.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16a34a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 antialiased">
        <Header />
        {/* Main content with top padding for header+marquee and bottom for tab bar */}
        <main className="pt-[72px] pb-16 min-h-screen max-w-lg mx-auto">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
