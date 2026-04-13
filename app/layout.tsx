import type { Metadata, Viewport } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Batelithium - LiFePO4 Battery & Energy Storage Systems',
  description: 'Leading provider of LiFePO4 batteries and energy storage systems. Products from 1.28kW home to 261kW industrial.',
  robots: 'index, follow',
  openGraph: {
    title: 'Batelithium - LiFePO4 Battery & Energy Storage Systems',
    description: 'Leading provider of LiFePO4 batteries and energy storage systems.',
    siteName: 'Batelithium',
    type: 'website',
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
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-gray-50 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
