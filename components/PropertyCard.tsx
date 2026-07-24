'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { SanityListing } from '@/lib/sanity'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'

const AGENT_NAME = 'Александър Соколов'
const AGENT_PHOTO = '/team/alexander-sokolov.jpg'
const AGENT_NEIGHBORHOODS = ['драгалевци', 'малинова долина']

export default function PropertyCard({ listing, priority }: { listing: SanityListing; priority?: boolean }) {
  const { locale, dict } = useLocale()
  const priceRaw = listing.price != null ? String(listing.price) : '–'
  const priceStripped = priceRaw.replace(/[\s€]/g, '')
  const priceFormatted = /^\d+$/.test(priceStripped)
    ? '€' + priceStripped.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : priceRaw
  const numericPrice = Number(String(listing.price ?? '').replace(/[^0-9]/g, ''))
  const formatNum = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const title = locale === 'en' ? (listing.titleEn ?? listing.title) : listing.title
  const mainImage = listing.imageUrls?.[0]
  const showAgent = AGENT_NEIGHBORHOODS.includes(listing.neighborhood.trim().toLowerCase())

  return (
    <Link
      href={localizeHref(`/listings/${listing._id}`, locale)}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-100/80"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-brand-green/10">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
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
        <div className="absolute inset-0 bg-linear-to-t from-brand-green-dark/80 via-brand-green-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Type badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs ${
              listing.type === 'sale'
                ? 'bg-brand-green/90 text-brand-gold'
                : 'bg-brand-gold/90 text-brand-green'
            }`}
          >
            {listing.type === 'sale' ? dict.listings.tabSale : dict.listings.tabRent}
          </span>
          {listing.constructionAct && (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs bg-white/85 text-brand-green">
              {String(listing.constructionAct).includes('act14') ? dict.listings.constructionAct14 : String(listing.constructionAct).includes('act15') ? dict.listings.constructionAct15 : dict.listings.constructionAct16}
            </span>
          )}
        </div>

        {/* Status ribbon */}
        {listing.status !== 'active' && (
          <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-20">
            <div
              className={`absolute top-5 -right-7 w-36 text-white text-[10px] font-black uppercase tracking-widest text-center py-1.5 rotate-45 shadow-lg ${
                listing.status === 'sold' ? 'bg-red-600' : 'bg-amber-600'
              }`}
            >
              {listing.status === 'sold'
                ? listing.type === 'rent' ? dict.listings.rented : dict.listings.sold
                : dict.listings.underOffer}
            </div>
          </div>
        )}

        {/* View more — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-brand-gold text-brand-green text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
            {dict.listings.viewMore}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-brand-green transition-colors line-clamp-1 leading-snug">
          {title}
        </h3>

        <div className="mb-4">
          <p className="text-brand-gold font-bold text-xl">{priceFormatted}</p>
          {listing.type === 'sale' && !isNaN(numericPrice) && listing.area && !isNaN(Number(listing.area)) && (
            <p className="text-gray-400 text-xs mt-0.5">
              ~{formatNum(Math.round(numericPrice / Number(listing.area)))} €/м²
            </p>
          )}
        </div>

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
            {listing.rooms} {String(listing.rooms) === '1' ? dict.listings.roomSingular : dict.listings.roomsSuffix}
          </span>
          {listing.floor != null && (
            <span className="text-gray-400">{dict.listings.floorAbbrev} {listing.floor}{listing.totalFloors ? `/${listing.totalFloors}` : ''}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-400">
          <svg className="w-3.5 h-3.5 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {listing.neighborhood}, {dict.listings.sofia}
        </div>

        {showAgent && (
          <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-gray-100">
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-brand-gold/40">
              <Image src={AGENT_PHOTO} alt={AGENT_NAME} fill className="object-cover" />
            </div>
            <p className="text-xs text-gray-500">
              <span className="text-gray-400">{dict.listings.agentLabel}:</span>{' '}
              <span className="font-medium text-gray-700">{AGENT_NAME}</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}
