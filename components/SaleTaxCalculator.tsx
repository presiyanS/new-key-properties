'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { saleTax, type AcquiredHow, type PropertyKind } from '@/lib/propertyCosts'
import { BreakdownRow, Choice, DateInput, MoneyInput, useMoneyFormat } from './calculatorFields'

const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function SaleTaxCalculator() {
  const { locale, dict } = useLocale()
  const t = dict.calculators
  const fmt = useMoneyFormat(locale)
  const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString(locale === 'en' ? 'en-GB' : 'bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })

  const [salePrice, setSalePrice] = useState(180000)
  const [purchasePrice, setPurchasePrice] = useState(150000)
  const [acquiredHow, setAcquiredHow] = useState<AcquiredHow>('purchase')
  const [acquiredDate, setAcquiredDate] = useState('')
  // Safe to read the clock here: this tab is never server-rendered (CostCalculatorTabs opens on the purchase tab).
  const [saleDate, setSaleDate] = useState(todayIso)
  const [kind, setKind] = useState<PropertyKind>('home')
  const [soldThisYear, setSoldThisYear] = useState<1 | 2 | 3>(1)

  const result = saleTax({ salePrice, purchasePrice, acquiredHow, acquiredDate, saleDate, kind, soldThisYear })
  const needsDate = acquiredHow !== 'inheritance' && !acquiredDate
  const saleYear = Number((saleDate || todayIso()).slice(0, 4))

  const reasons = {
    inheritance: t.reasonInheritance,
    home3: t.reasonHome3,
    any5: t.reasonAny5,
    noGain: t.reasonNoGain,
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{t.saleHeading}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.saleSubheading}</p>

      <div className="space-y-5 mb-6">
        <Choice
          label={t.acquiredHow}
          value={acquiredHow}
          onChange={setAcquiredHow}
          options={[
            { value: 'purchase', label: t.acquiredPurchase },
            { value: 'gift', label: t.acquiredGift },
            { value: 'inheritance', label: t.acquiredInheritance },
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MoneyInput id="sale-price" label={t.salePrice} value={salePrice} onChange={setSalePrice} />
          {acquiredHow === 'purchase' && (
            <MoneyInput id="sale-purchase-price" label={t.purchasePrice} value={purchasePrice} onChange={setPurchasePrice} />
          )}
          {acquiredHow !== 'inheritance' && (
            <DateInput id="sale-acquired-date" label={t.acquiredDate} value={acquiredDate} onChange={setAcquiredDate} />
          )}
          <DateInput id="sale-date" label={t.saleDate} value={saleDate} onChange={setSaleDate} />
        </div>
        {acquiredHow !== 'inheritance' && (
          <>
            <Choice
              label={t.kind}
              value={kind}
              onChange={setKind}
              options={[
                { value: 'home', label: t.kindHome },
                { value: 'other', label: t.kindOther },
              ]}
            />
            <Choice
              label={t.soldThisYear}
              value={soldThisYear}
              onChange={setSoldThisYear}
              options={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: t.soldThree },
              ]}
            />
          </>
        )}
      </div>

      {needsDate ? (
        <p className="text-sm text-brand-green bg-brand-green/5 rounded-xl px-4 py-3">{t.acquiredDateNeeded}</p>
      ) : result.exempt ? (
        <div className="p-5 bg-brand-green rounded-2xl">
          <div className="flex items-center justify-between gap-4">
            <p className="text-white font-semibold">{t.noTax}</p>
            <p className="font-bold text-brand-gold text-xl">{fmt(0)}</p>
          </div>
          <p className="text-white/70 text-sm mt-2">{reasons[result.reason]}</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <BreakdownRow label={t.gain} amount={fmt(result.gain)} />
            <BreakdownRow label={t.deductibleCosts} amount={`− ${fmt(result.deductibleCosts)}`} />
            <BreakdownRow label={t.taxableAmount} amount={fmt(result.taxableAmount)} />
          </div>
          <div className="p-5 bg-brand-green rounded-2xl">
            <div className="flex items-center justify-between gap-4">
              <p className="text-white font-semibold">{t.taxDue}</p>
              <p className="font-bold text-brand-gold text-xl">{fmt(result.tax)}</p>
            </div>
            <p className="text-white/70 text-sm mt-2">{t.deadline.replace('{year}', String(saleYear + 1))}</p>
          </div>
          {result.exemptFrom && (
            <p className="text-sm text-gray-900 bg-brand-gold/15 border border-brand-gold/30 rounded-xl px-4 py-3 mt-4">
              {t.exemptFromHint.replace('{date}', formatDate(result.exemptFrom))}
            </p>
          )}
          {acquiredHow === 'gift' && <p className="text-sm text-gray-500 mt-3">{t.giftWarning}</p>}
        </>
      )}

      <p className="text-gray-400 text-xs mt-4 leading-relaxed">{t.saleDisclaimer}</p>
      <Link
        href={localizeHref('/blog/danaci-pri-prodazhba-na-imot-koga-dalzhite-danak', locale)}
        className="inline-block mt-3 text-sm text-brand-green font-medium hover:text-brand-gold transition-colors"
      >
        {t.readMore} →
      </Link>
    </div>
  )
}
