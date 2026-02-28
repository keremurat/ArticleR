import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  title: 'ArticleR - Bilimsel Makale Okuyucu',
  description: 'Akademik PDF\'leri okumak, çevirmek ve anlamak için gelişmiş web uygulaması. Anında kelime çevirisi, akıllı arama, vurgulama ve kelime defteri özellikleri ile araştırmanızı hızlandırın.',
  keywords: ['PDF okuyucu', 'akademik makale', 'çeviri', 'bilimsel okuma', 'scholar', 'araştırma', 'PDF viewer', 'translation'],
  authors: [{ name: 'ArticleR Team' }],
  creator: 'ArticleR Team',
  publisher: 'ArticleR',
  applicationName: 'ArticleR',
  generator: 'Next.js',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'ArticleR',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://articler.app',
    title: 'ArticleR - Bilimsel Makale Okuyucu',
    description: 'Akademik PDF\'leri okumak, çevirmek ve anlamak için gelişmiş web uygulaması',
    siteName: 'ArticleR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArticleR - Bilimsel Makale Okuyucu',
    description: 'Akademik PDF\'leri okumak, çevirmek ve anlamak için gelişmiş web uygulaması',
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
