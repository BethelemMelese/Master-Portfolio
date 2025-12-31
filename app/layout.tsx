import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageLoader from '@/components/layout/PageLoader'

export const metadata: Metadata = {
  title: 'Betisha - Portfolio',
  description: 'Professional portfolio showcasing projects, skills, and experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="text-text-primary min-h-screen">
        <PageLoader />
        <Header />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
