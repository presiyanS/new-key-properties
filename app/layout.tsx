import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'New Key Properties | Недвижими Имоти в София',
    template: '%s | New Key Properties',
  },
  description:
    'New Key Properties – честна и надеждна агенция за недвижими имоти в София. Продажби, наеми и намиране на имоти с максимална грижа за клиента.',
  keywords: ['недвижими имоти', 'София', 'апартаменти', 'продажба', 'наем', 'New Key Properties'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-gray-900`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
