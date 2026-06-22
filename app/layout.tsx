import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { siteConfig, getAbsoluteUrl } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageLoader from '@/components/layout/PageLoader'
import BackToTopButton from '@/components/layout/BackToTopButton'
import JsonLd from '@/components/seo/JsonLd'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'portfolio',
    'full-stack developer',
    'web developer',
    'designer',
    'Next.js',
    'React',
    'frontend',
    'backend',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Portfolio`,
    description: siteConfig.description,
    images: [{ url: getAbsoluteUrl(siteConfig.ogImagePath), width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Portfolio`,
    description: siteConfig.description,
    ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteConfig.url },
  verification: {
    // Optional: add when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${poppins.className} ${inter.variable} text-text-primary min-h-screen`}>
        <JsonLd />
        <PageLoader />
        <Header />
        <main id="top" className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  )
}
