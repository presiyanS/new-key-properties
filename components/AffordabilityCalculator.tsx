'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { affordability } from '@/lib/propertyCosts'
import { BreakdownRow, Choice, DecimalInput, MoneyInput, useMoneyFormat } from './calculatorFields'

export default function AffordabilityCalculator() {
  const { locale, dict } = useLocale()
  const t = dict.affordability
  const fmt = useMoneyFormat(locale)

  const [monthlyIncome, setMonthlyIncome] = useState(2500)
  const [otherPayments, setOtherPayments] = useState(0)
  const [savings, setSavings] = useState(40000)
  const [rateText, setRateText] = useState(locale === 'en' ? '2.75' : '2,75')
  const [years, setYears] = useState(30)
  const [paymentShare, setPaymentShare] = useState(0.4)

  const ratePercent = Number(rateText.replace(',', '.'))
  const r = Number.isFinite(ratePercent)
    ? affordability({ monthlyIncome, otherPayments, savings, ratePercent, years, paymentShare })
    : null

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{t.heading}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.subheading}</p>

      <div className="space-y-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MoneyInput id="afford-income" label={t.monthlyIncome} value={monthlyIncome} onChange={setMonthlyIncome} />
          <MoneyInput id="afford-other" label={t.otherPayments} value={otherPayments} onChange={setOtherPayments} />
          <MoneyInput id="afford-savings" label={t.savings} value={savings} onChange={setSavings} />
          <DecimalInput id="afford-rate" label={t.rate} unit="%" value={rateText} onChange={setRateText} />
        </div>
        <p className="text-xs text-gray-400 -mt-2">{t.rateNote}</p>
        <Choice
          label={t.years}
          value={years}
          onChange={setYears}
          options={[20, 25, 30].map((n) => ({ value: n, label: `${n} ${t.yearsUnit}` }))}
        />
        <Choice
          label={t.paymentShare}
          value={paymentShare}
          onChange={setPaymentShare}
          options={[
            { value: 0.3, label: '30%' },
            { value: 0.4, label: '40%' },
            { value: 0.5, label: t.paymentShareMax },
          ]}
        />
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
