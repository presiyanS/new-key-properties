import Link from 'next/link'
import Image from 'next/image'
import type { SanityListing } from '@/lib/sanity'

export default function PropertyCard({ listing, priority }: { listing: SanityListing; priority?: boolean }) {
  const priceRaw = listing.price != null ? String(listing.price) : '–'
  const priceFormatted = /^[\d\s.,]+$/.test(priceRaw) ? priceRaw + ' €' : priceRaw

  const mainImage = listing.imageUrls?.[0]

  return (
    <Link
      href={`/listings/${listing._id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-100/80"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-brand-green/10">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={listing.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-14 h-14 text-brand-green/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/80 via-brand-green-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Type badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm ${
              listing.type === 'sale'
                ? 'bg-brand-green/90 text-brand-gold'
                : 'bg-brand-gold/90 text-brand-green'
            }`}
          >
            {listing.type === 'sale' ? 'Продажба' : 'Наем'}
          </span>
          {listing.constructionAct && (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm bg-white/85 text-brand-green">
              {String(listing.constructionAct).includes('act14') ? 'Акт 14' : String(listing.constructionAct).includes('act15') ? 'Акт 15' : 'Акт 16'}
            </span>
          )}
        </div>

        {/* View more — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-brand-gold text-brand-green text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
            Разгледай
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-brand-green transition-colors line-clamp-1 leading-snug">
          {listing.title}
        </h3>

        <p className="text-brand-gold font-bold text-xl mb-4">{priceFormatted}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 pb-3.5 border-b border-gray-100">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-brand-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {listing.area} м²
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-brand-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {listing.rooms} {String(listing.rooms) === '1' ? 'стая' : 'стаи'}
          </span>
          {listing.floor != null && (
            <span className="text-gray-400">ет. {listing.floor}{listing.totalFloors ? `/${listing.totalFloors}` : ''}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-400">
          <svg className="w-3.5 h-3.5 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {listing.neighborhood}, София
        </div>
      </div>
    </Link>
  )
}
