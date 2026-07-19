import type { Metadata } from 'next'
import { getListings, getListingsPage, getSiteSettings } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import ListingsClient from '@/components/ListingsClient'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 30

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const url = `https://www.newkey.bg${locale === 'en' ? '/en/listings' : '/listings'}`
  const image = { url: '/og-listings.jpg', width: 1200, height: 630 }

  if (locale === 'en') {
    const title = 'Properties'
    const description =
      'Browse all properties for sale and rent in Sofia from New Key Properties. Carefully vetted listings with full transparency.'
    return {
      title,
      description,
      alternates: hreflangAlternates('/listings', locale),
      openGraph: { title, description, url, siteName: 'New Key Properties', type: 'website', images: [image] },
      twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    }
  }
  const title = 'Имоти'
  const description =
    'Разгледайте всички имоти за продажба и наем в София от New Key Properties. Внимателно проверени оферти с пълна прозрачност.'
  return {
    title,
    description,
    alternates: hreflangAlternates('/listings', locale),
    openGraph: { title, description, url, siteName: 'New Key Properties', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  }
}

export default async function ListingsPage() {
  const { isEnabled: preview } = await draftMode()
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const [listings, cms, settings] = await Promise.all([
    getListings(preview),
    getListingsPage(preview),
    getSiteSettings(preview),
  ])
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'
  const email = settings?.email ?? 'office@newkey.bg'

  return (
    <>
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">
            {dict.nav.listings}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            {cms?.heroTitle ?? 'Намерете Вашия'}{' '}
            <span className="text-brand-gold">{cms?.heroTitleGold ?? 'Имот'}</span>
          </h1>
          <p
            className="text-white/70 text-xl max-w-xl animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {cms?.heroSubtitle ?? 'Всички имоти са внимателно проверени и представени с пълна прозрачност. Само сериозни оферти.'}
          </p>
          <div
            className="flex items-center gap-6 mt-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span className="w-2 h-2 bg-brand-gold/60 rounded-full" />
              <span>{cms?.saleCountOverride ?? listings.filter((l) => l.type === 'sale').length} {dict.listings.forSale}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span className="w-2 h-2 bg-brand-gold/60 rounded-full" />
              <span>{cms?.rentCountOverride ?? listings.filter((l) => l.type === 'rent').length} {dict.listings.forRent}</span>
            </div>
          </div>
        </div>
      </section>

      <ListingsClient
        listings={listings}
        phone={phone}
        phoneDisplay={phoneDisplay}
        email={email}
        bottomCtaTitle={cms?.bottomCtaTitle}
        bottomCtaSubtitle={cms?.bottomCtaSubtitle}
      />
    </>
  )
}
