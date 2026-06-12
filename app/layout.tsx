import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
export const runtime = 'edge';
export const metadata: Metadata = {
  title: 'SDS Textiles - Premium Textile Shopping',
  description: 'Elevate your style with SDS Textiles. Premium quality fabrics and textiles for all occasions.',
  generator: 'v0.app',
  keywords: 'textiles, fabrics, clothing, premium quality, SDS',
  openGraph: {
    title: 'SDS Textiles - Elevate Your Style',
    description: 'Premium textile shopping experience with SDS Textiles',
    type: 'website',
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-dQPHlDaqNStVS5g5uhu2JpT2w49rvF.jpg',
        width: 1200,
        height: 400,
        alt: 'SDS Textiles Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SDS Textiles - Premium Textiles',
    description: 'Elevate your style with premium textiles',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-dQPHlDaqNStVS5g5uhu2JpT2w49rvF.jpg'],
  },
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Blue%203D%20Y2k%20Fashion%20Logo%20%283%29-McW3YazEzJmQPkOIqzaRyGw2ORLCPv.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-slate-950`}>
      <body className="font-sans antialiased bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
