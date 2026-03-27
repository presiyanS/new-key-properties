import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getListing } from '@/lib/sanity'
import ContactForm from '@/components/ContactForm'
import ImageGallery from '@/components/ImageGallery'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const listing = await getListing(id)
  if (!listing) return {}
  return { title: listing.title, description: listing.description }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = await getListing(id)
  if (!listing) notFound()

  const priceFormatted =
    listing.type === 'sale'
      ? `${listing.price.toLocaleString('bg-BG')} €`
      : `${listing.price.toLocaleString('bg-BG')} €/мес.`

  const images = listing.imageUrls ?? []

  return (
    <>
      {/* Back bar */}
      <section className="bg-brand-green py-5 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold transition-colors text-sm group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Обратно към имотите
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <div className="relative rounded-2xl overflow-hidden">
                <ImageGallery images={images} title={listing.title} />
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide backdrop-blur-sm shadow ${
                      listing.type === 'sale'
                        ? 'bg-brand-green/90 text-brand-gold'
                        : 'bg-brand-gold/90 text-brand-green'
                    }`}
                  >
                    {listing.type === 'sale' ? 'Продажба' : 'Наем'}
                  </span>
                </div>
              </div>

              {/* Main info card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {/* Title + Price */}
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <h1 className="font-serif text-3xl font-bold text-gray-900 leading-tight">{listing.title}</h1>
                  <div className="text-right">
                    <p className="text-brand-gold font-bold text-3xl">{priceFormatted}</p>
                    {listing.type === 'sale' && listing.area && (
                      <p className="text-gray-400 text-sm mt-0.5">
                        ~{Math.round(listing.price / listing.area).toLocaleString('bg-BG')} €/м²
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <p className="text-gray-400 flex items-center gap-1.5 mb-8">
                  <svg className="w-4 h-4 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {listing.neighborhood}, София
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  {[
                    {
                      label: 'Площ',
                      val: `${listing.area} м²`,
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Стаи',
                      val: `${listing.rooms}`,
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Етаж',
                      val: listing.floor
                        ? `${listing.floor}${listing.totalFloors ? `/${listing.totalFloors}` : ''}`
                        : '–',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Квартал',
                      val: listing.neighborhood,
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                    },
                  ].map((d) => (
                    <div key={d.label} className="text-center">
                      <div className="flex items-center justify-center text-brand-green/40 mb-2">
                        {d.icon}
                      </div>
                      <p className="text-xs text-gray-400 mb-0.5">{d.label}</p>
                      <p className="font-bold text-gray-900 text-sm">{d.val}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <h2 className="font-bold text-gray-900 text-lg mb-3">Описание</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{listing.description}</p>

                {/* Features */}
                {listing.features?.length > 0 && (
                  <>
                    <h2 className="font-bold text-gray-900 text-lg mb-4">Особености</h2>
                    <div className="flex flex-wrap gap-2">
                      {listing.features.map((f) => (
                        <span
                          key={f}
                          className="bg-brand-green/8 border border-brand-green/15 text-brand-green text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-green/12 transition-colors"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Contact sidebar */}
            <div>
              <div className="bg-white rounded-2xl p-7 shadow-xl border border-gray-100 sticky top-24">
                <div className="h-1 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green rounded-full mb-6" />
                <h3 className="font-serif text-xl font-bold text-brand-green mb-1">
                  Интересувате се от имота?
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Свържете се с нас за оглед или повече информация.
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:0879826292"
                    className="flex items-center justify-center gap-3 bg-brand-green text-brand-gold font-bold py-4 rounded-xl hover:bg-brand-green-light transition-all w-full shadow-sm shadow-brand-green/10 hover:shadow-brand-green/20 hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    0879 826 292
                  </a>
                  <a
                    href="mailto:office@newkey.bg"
                    className="flex items-center justify-center gap-3 border-2 border-brand-green/30 text-brand-green font-bold py-3.5 rounded-xl hover:bg-brand-green/5 hover:border-brand-green transition-all w-full text-sm"
                  >
                    office@newkey.bg
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <p className="text-xs text-gray-400 mb-5 uppercase tracking-wide font-medium">
                    Или изпратете бързо запитване:
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
