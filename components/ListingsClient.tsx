'use client'

import { useState, useMemo } from 'react'
import PropertyCard from '@/components/PropertyCard'
import SaveSearchBar from '@/components/SaveSearchBar'
import type { SanityListing } from '@/lib/sanity'

type Filter = 'all' | 'sale' | 'rent'
type SortBy = 'default' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [rooms, setRooms] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [areaMin, setAreaMin] = useState('')
  const [areaMax, setAreaMax] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('default')
  const [showFilters, setShowFilters] = useState(false)

  // Derived options from listings data
  const neighborhoods = useMemo(() => {
    const seen = new Map<string, string>()
    listings.forEach((l) => {
      const raw = l.neighborhood
      if (!raw) return
      // Strip invisible/stega chars before comparing
      const clean = raw.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF]/g, '').trim()
      const key = clean.toLowerCase()
      if (!seen.has(key)) seen.set(key, clean)
    })
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b, 'bg'))
  }, [listings])

  const roomOptions = useMemo(() => {
    const seen = new Map<string, string>()
    listings.forEach((l) => {
      if (l.rooms == null) return
      const clean = String(l.rooms).replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF]/g, '').trim()
      const key = clean.toLowerCase()
      if (!seen.has(key)) seen.set(key, clean)
    })
    return Array.from(seen.values()).sort((a, b) => {
      const na = Number(a), nb = Number(b)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return a.localeCompare(b, 'bg')
    })
  }, [listings])

  const counts = {
    all: listings.length,
    sale: listings.filter((l) => l.type === 'sale').length,
    rent: listings.filter((l) => l.type === 'rent').length,
  }

  const activeFilterCount = [
    neighborhood,
    rooms,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
    searchQuery,
  ].filter(Boolean).length

  function clearAll() {
    setFilter('all')
    setSearchQuery('')
    setNeighborhood('')
    setRooms('')
    setPriceMin('')
    setPriceMax('')
    setAreaMin('')
    setAreaMax('')
    setSortBy('default')
  }

  const filtered = useMemo(() => {
    let result = listings

    // Type
    if (filter !== 'all') result = result.filter((l) => l.type === filter)

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((l) => {
        return (
          l.title?.toLowerCase().includes(q) ||
          l.neighborhood?.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q) ||
          l.features?.some((f) => f.toLowerCase().includes(q))
        )
      })
    }

    // Neighborhood
    if (neighborhood) result = result.filter((l) => {
      const raw = l.neighborhood?.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF]/g, '').trim() ?? ''
      return raw === neighborhood
    })

    // Rooms
    if (rooms) result = result.filter((l) => {
      const clean = l.rooms != null ? String(l.rooms).replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF]/g, '').trim() : ''
      return clean.toLowerCase() === rooms.toLowerCase()
    })

    // Price (strip formatting before comparing)
    if (priceMin) result = result.filter((l) => { const n = Number(String(l.price).replace(/[^0-9]/g, '')); return !isNaN(n) && n >= Number(priceMin) })
    if (priceMax) result = result.filter((l) => { const n = Number(String(l.price).replace(/[^0-9]/g, '')); return !isNaN(n) && n <= Number(priceMax) })

    // Area (numeric only)
    if (areaMin) result = result.filter((l) => { const n = Number(l.area); return !isNaN(n) && n >= Number(areaMin) })
    if (areaMax) result = result.filter((l) => { const n = Number(l.area); return !isNaN(n) && n <= Number(areaMax) })

    // Sort
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => (Number(String(a.price).replace(/[^0-9]/g, '')) || 0) - (Number(String(b.price).replace(/[^0-9]/g, '')) || 0))
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => (Number(String(b.price).replace(/[^0-9]/g, '')) || 0) - (Number(String(a.price).replace(/[^0-9]/g, '')) || 0))
    else if (sortBy === 'area-asc') result = [...result].sort((a, b) => (Number(a.area) || 0) - (Number(b.area) || 0))
    else if (sortBy === 'area-desc') result = [...result].sort((a, b) => (Number(b.area) || 0) - (Number(a.area) || 0))

    return result
  }, [listings, filter, searchQuery, neighborhood, rooms, priceMin, priceMax, areaMin, areaMax, sortBy])

  const tabs: { val: Filter; label: string }[] = [
    { val: 'all', label: 'Всички' },
    { val: 'sale', label: 'Продажба' },
    { val: 'rent', label: 'Наем' },
  ]

  const selectClass = "bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all cursor-pointer"
  const inputClass = "bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all w-full"

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search bar */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търсете по заглавие, квартал, характеристики..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 text-base shadow-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter bar row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Type tabs */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.val}
                onClick={() => setFilter(tab.val)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  filter === tab.val
                    ? 'bg-brand-green text-brand-gold shadow-sm'
                    : 'text-gray-500 hover:text-brand-green'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Advanced filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
              showFilters || activeFilterCount > 0
                ? 'bg-brand-green text-brand-gold border-brand-green shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2M9 16h6" />
            </svg>
            Филтри
            {activeFilterCount > 0 && (
              <span className="bg-brand-gold text-brand-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className={selectClass}
            >
              <option value="default">По подразбиране</option>
              <option value="price-asc">Цена: ниска → висока</option>
              <option value="price-desc">Цена: висока → ниска</option>
              <option value="area-asc">Площ: малка → голяма</option>
              <option value="area-desc">Площ: голяма → малка</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Advanced filters panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

              {/* Neighborhood */}
              <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Квартал</label>
                <div className="relative">
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className={selectClass + ' w-full'}
                  >
                    <option value="">Всички квартали</option>
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Стаи</label>
                <div className="relative">
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className={selectClass + ' w-full'}
                  >
                    <option value="">Всички</option>
                    {roomOptions.map((r) => (
                      <option key={r} value={r}>{r} стаи</option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Price range */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Цена (€)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="От"
                    min={0}
                    className={inputClass}
                  />
                  <span className="text-gray-400 text-sm flex-shrink-0">—</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="До"
                    min={0}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Area range */}
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Площ (м²)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    placeholder="От"
                    min={0}
                    className={inputClass}
                  />
                  <span className="text-gray-400 text-sm flex-shrink-0">—</span>
                  <input
                    type="number"
                    value={areaMax}
                    onChange={(e) => setAreaMax(e.target.value)}
                    placeholder="До"
                    min={0}
                    className={inputClass}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Save search */}
        <SaveSearchBar
          type={filter}
          neighborhood={neighborhood}
          rooms={rooms}
          priceMin={priceMin}
          priceMax={priceMax}
        />

        {/* Results count + clear */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-brand-green">{filtered.length}</span> намерени имота
          </p>
          {(activeFilterCount > 0 || filter !== 'all' || sortBy !== 'default') && (
            <button
              onClick={clearAll}
              className="text-sm text-gray-400 hover:text-brand-green transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Изчисти всички
            </button>
          )}
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
