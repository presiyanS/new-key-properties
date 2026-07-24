import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListing, getListings } from '@/lib/sanity'
import BackToListings from '@/components/BackToListings'
import { draftMode } from 'next/headers'
import ContactForm from '@/components/ContactForm'
import ImageGallery from '@/components/ImageGallery'
import ShareButtons from '@/components/ShareButtons'
import ScrollToTop from '@/components/ScrollToTop'
import MortgageCalculator from '@/components/MortgageCalculator'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref, hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 60

export async function generateStaticParams() {
  const listings = await getListings()
  return listings.map((l) => ({ id: l._id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const listing = await getListing(id)
  if (!listing) return {}
  const locale = await getLocale()

  const title = locale === 'en' ? (listing.titleEn ?? listing.title) : listing.title
  const descriptionFull = locale === 'en' ? (listing.descriptionEn ?? listing.description) : listing.description
  const image = listing.imageUrls?.[0]
  const description = descriptionFull?.slice(0, 200) ?? ''
  const url = `https://www.newkey.bg${localizeHref(`/listings/${id}`, locale)}`

  return {
    title,
    description,
    alternates: hreflangAlternates(`/listings/${id}`, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: 'New Key Properties',
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 800, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { isEnabled: preview } = await draftMode()
  const listing = await getListing(id, preview)
  if (!listing) notFound()
  const locale = await getLocale()
  const dict = getDictionary(locale)

  const title = locale === 'en' ? (listing.titleEn ?? listing.title) : listing.title
  const description = locale === 'en' ? (listing.descriptionEn ?? listing.description) : listing.description
  const features = locale === 'en' && listing.featuresEn?.length ? listing.featuresEn : listing.features

  const priceRaw = listing.price != null ? String(listing.price) : '–'
  const priceStripped = priceRaw.replace(/[\s€]/g, '')
  const priceFormatted = /^\d+$/.test(priceStripped)
    ? '€' + priceStripped.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : priceRaw
  const numericPrice = Number(String(listing.price ?? '').replace(/[^0-9]/g, ''))
  const formatNum = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const images = listing.imageUrls ?? []

  return (
    <>
      <ScrollToTop />
      {/* Back bar */}
      <section className="bg-brand-green py-5 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToListings />
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
                <ImageGallery images={images} title={title} />
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide backdrop-blur-xs shadow ${
                      listing.type === 'sale'
                        ? 'bg-brand-green/90 text-brand-gold'
                        : 'bg-brand-gold/90 text-brand-green'
                    }`}
                  >
                    {listing.type === 'sale' ? dict.listings.tabSale : dict.listings.tabRent}
                  </span>
                </div>
                {/* Status ribbon */}
                {listing.status !== 'active' && (
                  <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden pointer-events-none z-20">
                    <div
                      className={`absolute top-8 -right-9 w-52 text-white text-sm font-black uppercase tracking-widest text-center py-2 rotate-45 shadow-xl ${
                        listing.status === 'sold' ? 'bg-red-600' : 'bg-amber-600'
                      }`}
                    >
                      {listing.status === 'sold' ? dict.listings.sold : dict.listings.underOffer}
                    </div>
                  </div>
                )}
              </div>

              {/* Status notice banner */}
              {listing.status !== 'active' && (
                <div
                  className={`flex items-center gap-3 rounded-2xl px-6 py-4 border ${
                    listing.status === 'sold' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${listing.status === 'sold' ? 'bg-red-600' : 'bg-amber-600'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${listing.status === 'sold' ? 'text-red-700' : 'text-amber-700'}`}>
                      {listing.status === 'sold' ? dict.listings.soldNoticeTitle : dict.listings.underOfferNoticeTitle}
                    </p>
                    <p className={`text-xs mt-0.5 ${listing.status === 'sold' ? 'text-red-500' : 'text-amber-600'}`}>
                      {listing.status === 'sold' ? dict.listings.soldNoticeSubtitle : dict.listings.underOfferNoticeSubtitle}
                    </p>
                  </div>
                </div>
              )}

              {/* Main info card */}
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
                {/* Title + Price */}
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <h1 className="font-serif text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
                  <div className="text-right">
                    <p className="text-brand-gold font-bold text-3xl">{priceFormatted}</p>
                    {listing.type === 'sale' && !isNaN(numericPrice) && listing.area && !isNaN(Number(listing.area)) && (
                      <p className="text-gray-400 text-sm mt-0.5">
                        ~{formatNum(Math.round(numericPrice / Number(listing.area)))} €/м²
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <p className={`text-gray-400 flex items-center gap-1.5 ${listing.code ? 'mb-1.5' : 'mb-8'}`}>
                  <svg className="w-4 h-4 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {listing.neighborhood}, {dict.listings.sofia}
                </p>

                {/* Listing code */}
                {listing.code && (
                  <p className="text-gray-300 text-xs mb-8">
                    {dict.listings.listingCodeLabel}: <span className="font-semibold text-gray-400">{listing.code}</span>
                  </p>
                )}

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  {[
                    {
                      label: dict.listings.statArea,
                      val: listing.area != null ? `${listing.area} м²` : '–',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      ),
                    },
                    {
                      label: dict.listings.roomsLabel,
                      val: listing.rooms != null ? `${listing.rooms}` : '–',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ),
                    },
                    {
                      label: dict.listings.statFloor,
                      val: listing.floor != null
                        ? `${listing.floor}${listing.totalFloors ? `/${listing.totalFloors}` : ''}`
                        : '–',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      ),
                    },
                    {
                      label: dict.listings.neighborhoodLabel,
                      val: listing.neighborhood,
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                    },
                    ...(listing.constructionAct ? [{
                      label: dict.listings.statConstruction,
                      val: String(listing.constructionAct).includes('act14') ? dict.listings.constructionAct14 : String(listing.constructionAct).includes('act15') ? dict.listings.constructionAct15 : dict.listings.constructionAct16,
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      ),
                    }] : []),
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
                <h2 className="font-bold text-gray-900 text-lg mb-3">{dict.listings.descriptionHeading}</h2>
                <div className="text-gray-600 leading-relaxed mb-8 space-y-3">
                  {(description ?? '').split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Features */}
                {features?.length > 0 && (
                  <>
                    <h2 className="font-bold text-gray-900 text-lg mb-4">{dict.listings.featuresHeading}</h2>
                    <div className="flex flex-wrap gap-2">
                      {features.map((f) => (
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

                <ShareButtons id={id} title={title} />
              </div>

              {/* Mortgage calculator */}
              {listing.type === 'sale' && listing.status === 'active' && !isNaN(numericPrice) && numericPrice > 0 && (
                <MortgageCalculator price={numericPrice} />
              )}

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                <div className="px-8 py-5 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900 text-lg">{dict.listings.locationHeading}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{listing.neighborhood}, {dict.listings.sofia}</p>
                </div>
                <iframe
                  src={
                    listing.googleMapsUrl ??
                    `https://maps.google.com/maps?q=${encodeURIComponent(listing.neighborhood + ' ' + dict.listings.sofia)}&output=embed&hl=${locale}&z=15`
                  }
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${dict.listings.mapTitlePrefix} ${listing.neighborhood}, ${dict.listings.sofia}`}
                />
              </div>
            </div>

            {/* Right: Contact sidebar */}
            <div>
              <div className="bg-white rounded-2xl p-7 shadow-xl border border-gray-100 sticky top-24">
                <div className="h-1 bg-linear-to-r from-brand-green via-brand-gold to-brand-green rounded-full mb-6" />
                <h3 className="font-serif text-xl font-bold text-brand-green mb-1">
                  {dict.listings.interestedTitle}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {dict.listings.interestedSubtitle}
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:0879826292"
                    className="flex items-center justify-center gap-3 bg-brand-green text-brand-gold font-bold py-4 rounded-xl hover:bg-brand-green-light transition-all w-full shadow-xs shadow-brand-green/10 hover:shadow-brand-green/20 hover:-translate-y-0.5"
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
                    {dict.listings.quickInquiryLabel}
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
