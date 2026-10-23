'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { purchaseCosts } from '@/lib/propertyCosts'
import { BreakdownRow, MoneyInput, useMoneyFormat } from './calculatorFields'

type Props = {
  /** On a listing page the price is fixed and no input is shown. */
  price?: number
}

export default function PurchaseCostsCalculator({ price: fixedPrice }: Props) {
  const { locale, dict } = useLocale()
  const t = dict.calculators
  const fmt = useMoneyFormat(locale)

  const [enteredPrice, setEnteredPrice] = useState(180000)
  const [notaryVat, setNotaryVat] = useState(false)

  const price = fixedPrice ?? enteredPrice
  const costs = purchaseCosts(price, notaryVat)
  const percent = costs.percent.toLocaleString(locale === 'en' ? 'en-US' : 'bg-BG', { maximumFractionDigits: 1 })

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1">{t.purchaseHeading}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.purchaseSubheading}</p>

      {fixedPrice === undefined && (
        <div className="mb-6 max-w-xs">
          <MoneyInput id="purchase-price" label={t.priceLabel} value={enteredPrice} onChange={setEnteredPrice} />
        </div>
      )}

      <div className="mb-4">
        <BreakdownRow label={t.localTax} note={t.localTaxNote} amount={fmt(costs.localTax)} />
        <BreakdownRow
          label={t.notaryFee}
          note={
            <>
              {t.notaryFeeNote}
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notaryVat}
                  onChange={(e) => setNotaryVat(e.target.checked)}
                  className="accent-brand-green w-4 h-4"
                />
                {t.notaryVat}
              </label>
            </>
          }
          amount={fmt(costs.notaryFee + costs.notaryVat)}
        />
        <BreakdownRow label={t.registryFee} note={t.registryFeeNote} amount={fmt(costs.registryFee)} />
      </div>

      <div className="flex items-center justify-between gap-4 p-5 bg-brand-green rounded-2xl">
        <p className="text-white font-semibold">{t.total}</p>
        <p className="text-right">
          <span className="block font-bold text-brand-gold text-xl">{fmt(costs.total)}</span>
          {price > 0 && <span className="block text-white/60 text-xs">≈ {percent}% {t.ofPrice}</span>}
        </p>
      </div>

      <p className="text-gray-400 text-xs mt-4 leading-relaxed">{t.purchaseExcluded}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm">
        <Link
          href={localizeHref('/blog/razhodi-pri-pokupka-na-imot-v-sofia-danatsi-i-taksi', locale)}
          className="text-brand-green font-medium hover:text-brand-gold transition-colors"
        >
          {t.readMore} →
        </Link>
        {fixedPrice !== undefined && (
          <Link href={localizeHref('/kalkulator', locale)} className="text-brand-green font-medium hover:text-brand-gold transition-colors">
            {t.fullCalculator} →
          </Link>
        )}
      </div>
    </div>
  )
}
