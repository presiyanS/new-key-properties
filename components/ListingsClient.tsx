'use client'

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import type { SanityListing } from '@/lib/sanity'

type Filter = 'all' | 'sale' | 'rent'

type Props = {
  listings: SanityListing[]
  phone: string
  phoneDisplay: string
  email: string
  bottomCtaTitle?: string
  bottomCtaSubtitle?: string
}

export default function ListingsClient({ listings, phone, phoneDisplay, email, bottomCtaTitle, bottomCtaSubtitle }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const counts = {
    all: listings.length,
    sale: listings.filter((l) => l.type === 'sale').length,
    rent: listings.filter((l) => l.type === 'rent').length,
  }

  const filtered = filter === 'all' ? listings : listings.filter((l) => l.type === filter)

  const tabs: { val: Filter; label: string }[] = [
    { val: 'all', label: 'Всички' },
    { val: 'sale', label: 'Продажба' },
    { val: 'rent', label: 'Наем' },
  ]

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.val}
              onClick={() => setFilter(tab.val)}
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                filter === tab.val
                  ? 'bg-brand-green text-brand-gold shadow-lg shadow-brand-green/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-green hover:text-brand-green hover:shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((l) => (
              <PropertyCard key={l._id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-brand-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Няма намерени имоти в тази категория.</p>
            <p className="text-gray-400 text-sm mt-1">Обадете ни се — намираме имоти и по конкретни критерии.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-brand-green rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium mb-3">
              Персонално търсене
            </p>
            <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              {bottomCtaTitle ?? 'Не намирате търсеното?'}
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              {bottomCtaSubtitle ?? 'Разкажете ни какво търсите и ние ще го намерим за Вас. Активно работим за намиране на имоти по конкретни критерии — като за нас самите.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {phoneDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
