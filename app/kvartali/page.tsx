import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getNeighborhoods } from '@/lib/sanity'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref, hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Sofia Neighborhoods',
      description: 'Full guides to the most sought-after neighborhoods in Sofia — prices, transport, character, and who each area suits. From New Key Properties.',
      alternates: hreflangAlternates('/kvartali', locale),
    }
  }
  return {
    title: 'Квартали в София',
    description: 'Пълни наръчници за най-търсените квартали в София — цени, транспорт, характер и за кого е подходящ всеки район. От New Key Properties.',
    alternates: hreflangAlternates('/kvartali', locale),
  }
}

export default async function KvartaliPage() {
  const neighborhoods = await getNeighborhoods()
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium">{dict.nav.kvartali}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {dict.neighborhoods.heroTitle}{' '}
            <span className="text-brand-gold">{dict.neighborhoods.heroTitleHighlight}</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl">
            {dict.neighborhoods.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {neighborhoods.length === 0 ? (
            <p className="text-gray-400 text-center py-24">{dict.neighborhoods.emptyState}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {neighborhoods.map((n: any) => {
                const name = locale === 'en' ? (n.nameEn ?? n.name) : n.name
                const tagline = locale === 'en' ? (n.taglineEn ?? n.tagline) : n.tagline
                return (
                <Link
                  key={n._id}
                  href={localizeHref(`/kvartali/${n.slug.current}`, locale)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-brand-green/10 overflow-hidden">
                    {n.externalImageUrl ? (
                      <Image
                        src={n.externalImageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-brand-green/20 to-brand-gold/10" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <h2 className="font-serif text-2xl font-bold text-white">{name}</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {tagline && (
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tagline}</p>
                    )}

                    {/* Price pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {n.priceRangeSale && (
                        <span className="text-xs bg-brand-green/8 text-brand-green border border-brand-green/15 px-3 py-1.5 rounded-full font-medium">
                          🏠 {n.priceRangeSale}
                        </span>
                      )}
                      {n.priceRangeRent && (
                        <span className="text-xs bg-brand-gold/10 text-amber-700 border border-brand-gold/20 px-3 py-1.5 rounded-full font-medium">
                          🔑 {n.priceRangeRent}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-brand-green font-semibold text-sm group-hover:gap-2 transition-all">
                      {dict.neighborhoods.readGuide}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-green mb-4">
            {dict.neighborhoods.ctaTitle}
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            {dict.neighborhoods.ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0879826292"
              className="bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green/90 transition-colors"
            >
              0879 826 292
            </a>
            <Link
              href={localizeHref('/konsultatsiya', locale)}
              className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/5 transition-colors"
            >
              {dict.footer.consultationCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
