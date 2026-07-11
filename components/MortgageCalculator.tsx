'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleContext'

type Props = {
  price: number
}

export default function MortgageCalculator({ price }: Props) {
  const { locale, dict } = useLocale()
  const numberLocale = locale === 'en' ? 'en-US' : 'bg-BG'

  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [years, setYears] = useState(25)
  const [rate, setRate] = useState(3.5)

  const downPayment = Math.round((price * downPaymentPercent) / 100)
  const loanAmount = Math.max(price - downPayment, 0)
  const monthlyRate = rate / 100 / 12
  const numPayments = years * 12
  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / numPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)

  const fmt = (n: number) => '€' + Math.round(n).toLocaleString(numberLocale)

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{dict.listings.mortgageHeading}</h2>
      <p className="text-gray-400 text-sm mb-6">{dict.listings.mortgageDisclaimer}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.listings.mortgageDownPayment} ({downPaymentPercent}%)
          </label>
          <input
            type="range"
            min={0}
            max={90}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-brand-green"
          />
          <p className="text-sm text-gray-500 mt-1">{fmt(downPayment)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.listings.mortgageLoanTerm}
          </label>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-brand-green"
          />
          <p className="text-sm text-gray-500 mt-1">
            {years} {dict.listings.mortgageYears}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.listings.mortgageInterestRate}
          </label>
          <input
            type="range"
            min={1}
            max={8}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-brand-green"
          />
          <p className="text-sm text-gray-500 mt-1">{rate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{dict.listings.mortgageLoanAmount}</p>
          <p className="font-bold text-gray-900 text-lg">{fmt(loanAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{dict.listings.mortgageMonthlyPayment}</p>
          <p className="font-bold text-brand-gold text-lg">
            {fmt(monthlyPayment)} / {dict.listings.mortgagePerMonth}
          </p>
        </div>
      </div>
    </div>
  )
}
