import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/data/listings'

export default function PropertyCard({ listing }: { listing: Listing }) {
  const priceFormatted =
    listing.type === 'sale'
      ? `${listing.price.toLocaleString('bg-BG')} ${listing.currency}`
      : `${listing.price.toLocaleString('bg-BG')} ${listing.currency}/мес.`

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-52 overflow-hidden bg-brand-green/10">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              listing.type === 'sale'
                ? 'bg-brand-green text-brand-gold'
                : 'bg-brand-gold text-brand-green'
            }`}
          >
            {listing.type === 'sale' ? 'Продажба' : 'Наем'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-brand-green transition-colors line-clamp-1">
          {listing.title}
        </h3>
        <p className="text-brand-gold font-bold text-xl mb-3">{priceFormatted}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-brand-green/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {listing.area} м²
          </span>
          <span>{listing.rooms} {listing.rooms === 1 ? 'стая' : 'стаи'}</span>
          {listing.floor && (
            <span>ет. {listing.floor}/{listing.totalFloors}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <svg className="w-3.5 h-3.5 text-brand-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {listing.neighborhood}, София
        </div>
      </div>
    </Link>
  )
}
