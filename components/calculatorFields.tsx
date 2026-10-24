'use client'

// Small building blocks shared by the calculators (purchase costs, sale tax, rental yield, affordability).

import type { ReactNode } from 'react'

export function useMoneyFormat(locale: string) {
  // Whole amounts without cents (5 400 €), others always with two decimals (297,50 €).
  // useGrouping 'always' because bg-BG otherwise skips the space in 4-digit numbers.
  const make = (decimals: number) =>
    new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'bg-BG', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: 'always',
    })
  const whole = make(0)
  const cents = make(2)
  return (n: number) => (Number.isInteger(n) ? whole : cents).format(n)
}

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'
const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15 outline-hidden transition-colors'

/** Euro amount field: accepts digits only and shows them grouped (180 000). */
export function MoneyInput({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value ? value.toLocaleString('bg-BG', { useGrouping: 'always' }) : ''}
          onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '').slice(0, 10)) || 0)}
          className={`${inputClass} pr-10`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
      </div>
    </div>
  )
}

export function DateInput({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input id={id} type="date" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  )
}

/** Row of pill buttons for picking one option. */
export function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              o.value === value
                ? 'bg-brand-green text-white border-brand-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-green/40'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** One line of a cost breakdown: label (+ optional small note) on the left, amount on the right. */
export function BreakdownRow({ label, note, amount }: { label: string; note?: ReactNode; amount: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="text-gray-900 font-medium">{label}</p>
        {note && <div className="text-xs text-gray-400 mt-0.5">{note}</div>}
      </div>
      <p className="font-semibold text-gray-900 whitespace-nowrap">{amount}</p>
    </div>
  )
}

/** Decimal number field with a unit after it (e.g. interest rate in %). Accepts "2,75" or "2.75". */
export function DecimalInput({ id, label, unit, value, onChange }: { id: string; label: string; unit: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, '').slice(0, 5))}
          className={`${inputClass} pr-10`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{unit}</span>
      </div>
    </div>
  )
}
