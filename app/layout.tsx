import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import FloatingCTA from '@/components/FloatingCTA'
import { getSiteSettings } from '@/lib/sanity'
import { headers } from 'next/headers'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newkey.bg'),
  title: {
    default: 'New Key Properties | Недвижими Имоти в София',
    template: '%s | New Key Properties',
  },
  description:
    'New Key Properties – честна и надеждна агенция за недвижими имоти в София. Продажби, наеми и намиране на имоти с максимална грижа за клиента.',
  keywords: ['недвижими имоти', 'София', 'апартаменти', 'продажба', 'наем', 'New Key Properties'],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isStudio = pathname.startsWith('/studio')
  const { isEnabled: isDraftMode } = await draftMode()

  const settings = isStudio ? null : await getSiteSettings()
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'
  const socialLinks = {
    facebook: settings?.facebookUrl ?? 'https://www.facebook.com/profile.php?id=61582999994088',
    instagram: settings?.instagramUrl ?? 'https://www.instagram.com/new_key_properties',
    linkedin: settings?.linkedinUrl ?? 'https://www.linkedin.com/company/new-key-properties/',
  }

  return (
    <html lang="bg">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-gray-900`}>
        {!isStudio && <Header phone={phone} phoneDisplay={phoneDisplay} socialLinks={socialLinks} />}
        <main>{children}</main>
        {!isStudio && <Footer settings={settings} />}
        {!isStudio && <FloatingCTA phone={phone} />}
        {isDraftMode && <VisualEditing />}
        <Analytics />
      </body>
    </html>
  )
}
