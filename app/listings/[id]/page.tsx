import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getListing } from '@/lib/sanity'
import ContactForm from '@/components/ContactForm'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const listing = await getListing(params.id)
  if (!listing) return {}
  return { title: listing.title, description: listing.description }
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id)
  if (!listing) notFound()

  const priceFormatted =
    listing.type === 'sale'
      ? `${listing.price.toLocaleString('bg-BG')} EUR`
      : `${listing.price.toLocaleString('bg-BG')} EUR/мес.`

  const images = listing.imageUrls ?? []

  return (
    <>
      <section className="bg-brand-green py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/listings" className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Обратно към имотите
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-brand-green/10">
                  {images[0] ? (
                    <Image src={images[0]} alt={listing.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-green/30">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${listing.type === 'sale' ? 'bg-brand-green text-brand-gold' : 'bg-brand-gold text-brand-green'}`}>
                      {listing.type === 'sale' ? 'Продажба' : 'Наем'}
                    </span>
                  </div>
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {images.slice(1).map((img, i) => (
                      <div key={i} className="relative h-20 rounded-xl overflow-hidden bg-brand-green/10">
                        <Image src={img} alt={`${listing.title} - снимка ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <h1 className="font-serif text-3xl font-bold text-gray-900">{listing.title}</h1>
                  <p className="text-brand-gold font-bold text-3xl whitespace-nowrap">{priceFormatted}</p>
                </div>
                <p className="text-gray-400 flex items-center gap-1.5 mb-8">
                  <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {listing.neighborhood}, София
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 bg-gray-50 rounded-xl">
                  {[
                    { label: 'Площ', val: `${listing.area} м²` },
                    { label: 'Стаи', val: `${listing.rooms}` },
                    { label: 'Етаж', val: listing.floor ? `${listing.floor}${listing.totalFloors ? `/${listing.totalFloors}` : ''}` : '–' },
                    { label: 'Квартал', val: listing.neighborhood },
                  ].map((d) => (
                    <div key={d.label} className="text-center">
                      <p className="text-xs text-gray-400 mb-1">{d.label}</p>
                      <p className="font-bold text-gray-900">{d.val}</p>
                    </div>
                  ))}
                </div>

                <h2 className="font-bold text-gray-900 text-lg mb-3">Описание</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{listing.description}</p>

                {listing.features?.length > 0 && (
                  <>
                    <h2 className="font-bold text-gray-900 text-lg mb-4">Особености</h2>
                    <div className="flex flex-wrap gap-2">
                      {listing.features.map((f) => (
                        <span key={f} className="bg-brand-green/10 text-brand-green text-sm font-medium px-3 py-1.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 sticky top-28">
                <h3 className="font-serif text-xl font-bold text-brand-green mb-1">Интересувате се от имота?</h3>
                <p className="text-gray-400 text-sm mb-6">Свържете се с нас за оглед или повече информация.</p>
                <div className="space-y-3 mb-8">
                  <a href="tel:0879826292" className="flex items-center justify-center gap-3 bg-brand-green text-brand-gold font-bold py-4 rounded-xl hover:bg-brand-green-light transition-colors w-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    0879 826 292
                  </a>
                  <a href="mailto:office@newkey.bg" className="flex items-center justify-center gap-3 border-2 border-brand-green text-brand-green font-bold py-3.5 rounded-xl hover:bg-brand-green/5 transition-colors w-full text-sm">
                    office@newkey.bg
                  </a>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-xs text-gray-400 mb-5">Или изпратете бързо запитване:</p>
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
