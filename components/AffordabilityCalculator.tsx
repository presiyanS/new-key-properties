'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { affordability, MAX_PAYMENT_TO_INCOME } from '@/lib/propertyCosts'
import { BreakdownRow, DecimalInput, MoneyInput, parseDecimal, useMoneyFormat } from './calculatorFields'

/** BNB maximum home-loan term. */
const MAX_YEARS = 30

export default function AffordabilityCalculator() {
  const { locale, dict } = useLocale()
  const t = dict.affordability
  const fmt = useMoneyFormat(locale)

  const [monthlyIncome, setMonthlyIncome] = useState(2500)
  const [otherPayments, setOtherPayments] = useState(0)
  const [savings, setSavings] = useState(40000)
  const [rateText, setRateText] = useState(locale === 'en' ? '2.75' : '2,75')
  const [yearsText, setYearsText] = useState('30')
  const [shareText, setShareText] = useState('40')

  // Typed freely, but a bank can't go past the BNB limits, so anything above is calculated at the limit (and said so).
  const ratePercent = parseDecimal(rateText)
  const typedYears = parseDecimal(yearsText)
  const typedShare = parseDecimal(shareText) / 100
  const years = Math.min(typedYears, MAX_YEARS)
  const paymentShare = Math.min(typedShare, MAX_PAYMENT_TO_INCOME)
  const r = years >= 1 && rateText !== '' ? affordability({ monthlyIncome, otherPayments, savings, ratePercent, years, paymentShare }) : null

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{t.heading}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.subheading}</p>

      <div className="space-y-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MoneyInput id="afford-income" label={t.monthlyIncome} value={monthlyIncome} onChange={setMonthlyIncome} />
          <MoneyInput id="afford-other" label={t.otherPayments} value={otherPayments} onChange={setOtherPayments} />
          <MoneyInput id="afford-savings" label={t.savings} value={savings} onChange={setSavings} />
          <DecimalInput id="afford-rate" label={t.rate} unit="%" value={rateText} onChange={setRateText} hint={t.rateNote} />
          <DecimalInput
            id="afford-years"
            label={t.years}
            unit={t.yearsUnit}
            value={yearsText}
            onChange={setYearsText}
            hint={typedYears > MAX_YEARS ? <span className="text-brand-green font-medium">{t.yearsOverMax}</span> : t.yearsHint}
          />
          <DecimalInput
            id="afford-share"
            label={t.paymentShare}
            unit="%"
            value={shareText}
            onChange={setShareText}
            hint={typedShare > MAX_PAYMENT_TO_INCOME ? <span className="text-brand-green font-medium">{t.shareOverMax}</span> : t.shareHint}
          />
        </div>
      </div>

      {!r ? (
        <p className="text-sm text-brand-green bg-brand-green/5 rounded-xl px-4 py-3">{t.needInput}</p>
      ) : (
        <>
          <div className="p-5 bg-brand-green rounded-2xl mb-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-white font-semibold">{t.maxPrice}</p>
              <p className="font-bold text-brand-gold text-2xl">{fmt(r.price)}</p>
            </div>
            <p className="text-white/70 text-sm mt-2">{r.limitedBy === 'income' ? t.limitedByIncome : t.limitedBySavings}</p>
          </div>

          <div className="mb-4">
            <BreakdownRow label={t.loan} note={t.loanNote} amount={fmt(r.loan)} />
            <BreakdownRow label={t.payment} amount={fmt(r.payment)} />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">{t.cashHeading}</p>
          <div className="mb-4">
            <BreakdownRow label={t.downPayment} amount={fmt(r.downPayment)} />
            <BreakdownRow label={t.purchaseCosts} note={t.purchaseCostsNote} amount={fmt(r.purchaseCosts)} />
            <BreakdownRow label={t.mortgageFees} note={t.mortgageFeesNote} amount={fmt(r.mortgageFees)} />
          </div>

          <p className="text-sm text-gray-900 bg-brand-gold/15 border border-brand-gold/30 rounded-xl px-4 py-3">
            {t.rateRise.replace('{payment}', fmt(r.paymentIfRateUp))}
          </p>
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
