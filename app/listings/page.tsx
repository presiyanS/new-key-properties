'use client'

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { listings } from '@/data/listings'

type Filter = 'all' | 'sale' | 'rent'

export default function ListingsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? listings : listings.filter((l) => l.type === filter)

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold/60 uppercase text-sm tracking-widest mb-4">Имоти</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">
            Намерете Вашия <span className="text-brand-gold">Имот</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl">
            Всички имоти са внимателно проверени и представени с пълна прозрачност.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex items-center gap-3 mb-10">
            {[
              { val: 'all', label: 'Всички' },
              { val: 'sale', label: 'Продажба' },
              { val: 'rent', label: 'Наем' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setFilter(tab.val as Filter)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                  filter === tab.val
                    ? 'bg-brand-green text-brand-gold shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-60">
                  ({tab.val === 'all' ? listings.length : listings.filter((l) => l.type === tab.val).length})
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">Няма намерени имоти.</p>
            </div>
          )}

          {/* Contact prompt */}
          <div className="mt-16 bg-brand-green rounded-3xl p-10 text-center">
            <h3 className="font-serif text-3xl font-bold text-white mb-4">Не намирате търсеното?</h3>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Разкажете ни какво търсите и ние ще го намерим за вас. Активно работим за намиране на имоти по конкретни критерии.
            </p>
            <a
              href="tel:0879826292"
              className="inline-flex items-center gap-3 bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-colors text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Обадете ни се
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
