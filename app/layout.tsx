import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import FloatingCTA from '@/components/FloatingCTA'
import CookieConsent from '@/components/CookieConsent'
import { getSiteSettings } from '@/lib/sanity'
import { headers, cookies } from 'next/headers'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'
import { hreflangAlternates } from '@/lib/i18n/config'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
  display: 'swap',
  variable: '--font-playfair',
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      metadataBase: new URL('https://www.newkey.bg'),
      title: {
        default: 'New Key Properties | Real Estate in Sofia',
        template: '%s | New Key Properties',
      },
      description:
        'New Key Properties – an honest, trustworthy real estate agency in Sofia. Sales, rentals, and property sourcing with genuine client care.',
      keywords: ['real estate', 'Sofia', 'apartments', 'buy', 'rent', 'New Key Properties'],
      alternates: hreflangAlternates('/', locale),
    }
  }
  return {
    metadataBase: new URL('https://www.newkey.bg'),
    title: {
      default: 'New Key Properties | Недвижими Имоти в София',
      template: '%s | New Key Properties',
    },
    description:
      'New Key Properties – честна и надеждна агенция за недвижими имоти в София. Продажби, наеми и намиране на имоти с максимална грижа за клиента.',
    keywords: ['недвижими имоти', 'София', 'апартаменти', 'продажба', 'наем', 'New Key Properties'],
    alternates: hreflangAlternates('/', locale),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isStudio = pathname.startsWith('/studio')
  const { isEnabled: isDraftMode } = await draftMode()
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const cookieStore = await cookies()
  const consentCookie = cookieStore.get('nkp_cookie_consent')?.value
  const initialConsent = consentCookie === 'accepted' || consentCookie === 'declined' ? consentCookie : 'pending'

  const settings = isStudio ? null : await getSiteSettings()
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'
  const socialLinks = {
    facebook: settings?.facebookUrl ?? 'https://www.facebook.com/profile.php?id=61582999994088',
    instagram: settings?.instagramUrl ?? 'https://www.instagram.com/new_key_properties',
    linkedin: settings?.linkedinUrl ?? 'https://www.linkedin.com/company/new-key-properties/',
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="New Key Properties Blog" href="https://www.newkey.bg/blog/rss.xml" />
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';` }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-gray-900`}>
        <LocaleProvider locale={locale} dict={dict}>
          {!isStudio && <Header phone={phone} phoneDisplay={phoneDisplay} socialLinks={socialLinks} />}
          <main>{children}</main>
          {!isStudio && <Footer settings={settings} locale={locale} dict={dict} />}
          {!isStudio && <FloatingCTA phone={phone} />}
          {!isStudio && <CookieConsent initialStatus={initialConsent} />}
        </LocaleProvider>
        {isDraftMode && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
