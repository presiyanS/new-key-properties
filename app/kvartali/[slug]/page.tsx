import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getNeighborhood, getNeighborhoods, getListings } from '@/lib/sanity'
import PropertyCard from '@/components/PropertyCard'

export const revalidate = 3600

export async function generateStaticParams() {
  const neighborhoods = await getNeighborhoods()
  return neighborhoods.map((n: any) => ({ slug: n.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const n = await getNeighborhood(slug)
  if (!n) return {}
  return {
    title: `Квартал ${n.name} — Пълен наръчник`,
    description: n.metaDescription ?? `Всичко за квартал ${n.name} в София — цени, транспорт и характер.`,
    openGraph: {
      title: `Квартал ${n.name} в София — Наръчник за имоти`,
      description: n.metaDescription,
      ...(n.externalImageUrl ? { images: [{ url: n.externalImageUrl }] } : {}),
    },
  }
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [n, allListings] = await Promise.all([
    getNeighborhood(slug),
    getListings(),
  ])
  if (!n) notFound()

  const nameLC = n.name?.toLowerCase() ?? ''
  const neighborhoodListings = allListings.filter((l) => {
    const lc = l.neighborhood?.toLowerCase() ?? ''
    return lc === nameLC || lc.startsWith(nameLC + ' ')
  })

  const paragraphs = n.description?.split('\n\n').filter(Boolean) ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative h-80 lg:h-96 bg-brand-green overflow-hidden">
        {n.externalImageUrl && (
          <Image src={n.externalImageUrl} alt={n.name} fill className="object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/kvartali" className="inline-flex items-center gap-1.5 text-brand-gold/60 hover:text-brand-gold text-sm mb-4 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Всички квартали
            </Link>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white">{n.name}</h1>
            {n.tagline && <p className="text-white/70 text-xl mt-2">{n.tagline}</p>}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            {paragraphs.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="font-serif text-2xl font-bold text-brand-green mb-5">За квартала</h2>
                <div className="space-y-4">
                  {paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Pros & Cons */}
            {(n.pros?.length > 0 || n.cons?.length > 0) && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="font-serif text-2xl font-bold text-brand-green mb-6">Предимства и недостатъци</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {n.pros?.length > 0 && (
                    <div>
                      <p className="font-semibold text-brand-green text-sm uppercase tracking-wide mb-3">Предимства</p>
                      <ul className="space-y-2">
                        {n.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                            <svg className="w-4 h-4 text-brand-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {n.cons?.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-3">Недостатъци</p>
                      <ul className="space-y-2">
                        {n.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-gray-500 text-sm">
                            <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Transport */}
            {n.transport && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">Транспорт и достъпност</h2>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{n.transport}</p>
                </div>
              </div>
            )}

            {/* Listings in this neighborhood */}
            {neighborhoodListings.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-green mb-6">
                  Имоти в {n.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {neighborhoodListings.slice(0, 4).map((l) => (
                    <PropertyCard key={l._id} listing={l} />
                  ))}
                </div>
                {neighborhoodListings.length > 4 && (
                  <div className="text-center mt-6">
                    <Link
                      href={`/listings?neighborhood=${encodeURIComponent(n.name)}`}
                      className="inline-flex items-center gap-2 border-2 border-brand-green text-brand-green font-bold px-6 py-3 rounded-xl hover:bg-brand-green/5 transition-colors"
                    >
                      Вижте всички {neighborhoodListings.length} имота в {n.name}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Price card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-green text-lg mb-4">Цени в {n.name}</h3>
              {n.priceRangeSale && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Продажба</p>
                  <p className="text-xl font-bold text-gray-900">{n.priceRangeSale}</p>
                </div>
              )}
              {n.priceRangeRent && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Наем</p>
                  <p className="text-xl font-bold text-gray-900">{n.priceRangeRent}</p>
                </div>
              )}
            </div>

            {/* Target audience */}
            {n.targetAudience && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-brand-green text-lg mb-3">За кого е подходящ</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{n.targetAudience}</p>
              </div>
            )}

            {/* CTA */}
            <div className="bg-brand-green rounded-2xl p-6">
              <div className="h-0.5 bg-gradient-to-r from-brand-gold/60 to-transparent rounded-full mb-5" />
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Търсите имот в {n.name}?
              </h3>
              <p className="text-white/60 text-sm mb-5">
                Свържете се с нас — познаваме квартала отлично и намираме имоти по конкретни критерии.
              </p>
              <a
                href="tel:0879826292"
                className="flex items-center justify-center gap-2 bg-brand-gold text-brand-green font-bold py-3.5 rounded-xl hover:bg-brand-gold/90 transition-colors text-sm w-full"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                0879 826 292
              </a>
              <Link
                href="/konsultatsiya"
                className="flex items-center justify-center mt-2.5 border border-brand-gold/30 text-brand-gold/80 font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors text-sm w-full"
              >
                Безплатна консултация
              </Link>
            </div>

            {/* Other neighborhoods */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Разгледайте и другите квартали</h3>
              <Link href="/kvartali" className="text-brand-green font-semibold text-sm hover:underline">
                → Всички квартални наръчници
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
