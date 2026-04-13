'use client'

import { I18nProvider } from '@/lib/i18n/context'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <Header />
      <main className="pt-[72px] pb-16 min-h-screen max-w-lg mx-auto">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </I18nProvider>
  )
}
