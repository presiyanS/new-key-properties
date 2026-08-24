'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'

export default function ListingError({ error, reset }: { error: Error; reset: () => void }) {
  const { locale, dict } = useLocale()
  useEffect(() => {
    console.error('Listing page error:', error)
  }, [error])

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">{dict.listings.errorTitle}</h1>
        <p className="text-gray-400 mb-8">{dict.listings.errorSubtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-green text-brand-gold font-bold rounded-xl hover:bg-brand-green-light transition-colors"
          >
            {dict.listings.errorRetry}
          </button>
          <Link
            href={localizeHref('/listings', locale)}
            className="px-6 py-3 border-2 border-brand-green/30 text-brand-green font-bold rounded-xl hover:bg-brand-green/5 transition-colors"
          >
            {dict.listings.errorAllListings}
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          {dict.listings.errorContactPrefix}{' '}
          <a href="tel:0879826292" className="text-brand-green font-medium hover:underline">
            0879 826 292
          </a>
        </p>
      </div>
    </section>
  )
}
