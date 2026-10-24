'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { rentalYield } from '@/lib/propertyCosts'
import { BreakdownRow, DecimalInput, MoneyInput, parseDecimal, useMoneyFormat } from './calculatorFields'

export default function RentalYieldCalculator() {
  const { locale, dict } = useLocale()
  const t = dict.rentalYield
  const fmt = useMoneyFormat(locale)
  const pct = (n: number) =>
    n.toLocaleString(locale === 'en' ? 'en-US' : 'bg-BG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const [price, setPrice] = useState(150000)
  const [monthlyRent, setMonthlyRent] = useState(525)
  const [setupCosts, setSetupCosts] = useState(5000)
  const [vacantText, setVacantText] = useState('1')
  const [managementText, setManagementText] = useState('0')
  const [localFeesPerYear, setLocalFeesPerYear] = useState(150)
  const [upkeepPerYear, setUpkeepPerYear] = useState(300)

  // Typed freely; kept within sensible bounds (a year has 12 months, a fee can't exceed the rent).
  const vacantMonths = Math.min(parseDecimal(vacantText), 12)
  const managementRate = Math.min(parseDecimal(managementText), 100) / 100

  const r = rentalYield({ price, monthlyRent, setupCosts, vacantMonths, managementRate, localFeesPerYear, upkeepPerYear })
  const minus = (n: number) => (n > 0 ? `− ${fmt(n)}` : fmt(0))

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{t.heading}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.subheading}</p>

      <div className="space-y-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MoneyInput id="yield-price" label={t.price} value={price} onChange={setPrice} />
          <MoneyInput id="yield-rent" label={t.monthlyRent} value={monthlyRent} onChange={setMonthlyRent} />
          <MoneyInput id="yield-setup" label={t.setupCosts} value={setupCosts} onChange={setSetupCosts} />
          <MoneyInput id="yield-fees" label={t.localFees} value={localFeesPerYear} onChange={setLocalFeesPerYear} />
          <MoneyInput id="yield-upkeep" label={t.upkeep} value={upkeepPerYear} onChange={setUpkeepPerYear} />
          <DecimalInput id="yield-vacant" label={t.vacantMonths} unit={t.vacantUnit} value={vacantText} onChange={setVacantText} hint={t.vacantHint} />
          <DecimalInput id="yield-management" label={t.management} unit="%" value={managementText} onChange={setManagementText} hint={t.managementHint} />
        </div>
      </div>

      {!r ? (
        <p className="text-sm text-brand-green bg-brand-green/5 rounded-xl px-4 py-3">{t.needInput}</p>
      ) : (
        <>
          <div className="mb-4">
            <BreakdownRow label={t.fullYearRent} amount={fmt(r.fullYearRent)} />
            <BreakdownRow label={t.vacancyLoss} amount={minus(r.vacancyLoss)} />
            {r.management > 0 && <BreakdownRow label={t.managementFee} amount={minus(r.management)} />}
            <BreakdownRow label={t.rentTax} note={t.rentTaxNote} amount={minus(r.rentTax)} />
            <BreakdownRow label={t.localFeesRow} note={t.localFeesNote} amount={minus(r.localFees)} />
            <BreakdownRow label={t.upkeepRow} amount={minus(r.upkeep)} />
            <BreakdownRow label={t.netIncome} amount={fmt(r.netIncome)} />
          </div>
          <div className="mb-4">
            <BreakdownRow label={t.price} amount={fmt(price)} />
            <BreakdownRow label={t.purchaseCosts} note={t.purchaseCostsNote} amount={fmt(r.purchaseCosts)} />
            <BreakdownRow label={t.setupCosts} amount={fmt(setupCosts)} />
            <BreakdownRow label={t.totalInvestment} amount={fmt(r.totalInvestment)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
              <p className="text-gray-500 text-sm">{t.grossYield}</p>
              <p className="font-bold text-gray-900 text-2xl mt-1">{pct(r.grossYield)}%</p>
              <p className="text-gray-400 text-xs mt-1">{t.grossYieldNote}</p>
            </div>
            <div className="p-5 bg-brand-green rounded-2xl">
              <p className="text-white/70 text-sm">{t.netYield}</p>
              <p className="font-bold text-brand-gold text-2xl mt-1">{pct(r.netYield)}%</p>
              <p className="text-white/60 text-xs mt-1">
                {r.paybackYears === null
                  ? t.noPayback
                  : t.payback.replace('{years}', r.paybackYears.toLocaleString(locale === 'en' ? 'en-US' : 'bg-BG', { maximumFractionDigits: 1 }))}
              </p>
            </div>
          </div>
        </>
      )}

      <p className="text-gray-400 text-xs mt-4 leading-relaxed">{t.disclaimer}</p>
      <Link
        href={localizeHref('/kalkulator', locale)}
        className="inline-block mt-3 text-sm text-brand-green font-medium hover:text-brand-gold transition-colors"
      >
        {t.costsLink} →
      </Link>
    </div>
  )
}
