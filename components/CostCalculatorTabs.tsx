'use client'

import { useState, useSyncExternalStore } from 'react'
import { useLocale } from '@/lib/i18n/LocaleContext'
import PurchaseCostsCalculator from './PurchaseCostsCalculator'
import SaleTaxCalculator from './SaleTaxCalculator'

type Tab = 'pokupka' | 'prodazhba'

/** Buy/sell switcher on /kalkulator. Linking to /kalkulator#prodazhba opens the sale tab. */
export default function CostCalculatorTabs() {
  const { dict } = useLocale()
  const [picked, setPicked] = useState<Tab | null>(null)
  const hash = useSyncExternalStore(
    (onChange) => {
      window.addEventListener('hashchange', onChange)
      return () => window.removeEventListener('hashchange', onChange)
    },
    () => window.location.hash,
    () => '',
  )
  const tab: Tab = picked ?? (hash === '#prodazhba' ? 'prodazhba' : 'pokupka')

  const select = (next: Tab) => {
    setPicked(next)
    history.replaceState(null, '', `#${next}`)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'pokupka', label: dict.calculators.purchaseHeading },
    { id: 'prodazhba', label: dict.calculators.saleHeading },
  ]

  return (
    <div>
      <div role="tablist" className="flex gap-2 p-1.5 bg-white rounded-2xl border border-gray-100 shadow-xs mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => select(t.id)}
            className={`flex-1 px-4 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors ${
              tab === t.id ? 'bg-brand-green text-brand-gold' : 'text-gray-600 hover:text-brand-green'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'pokupka' ? <PurchaseCostsCalculator /> : <SaleTaxCalculator />}
    </div>
  )
}
