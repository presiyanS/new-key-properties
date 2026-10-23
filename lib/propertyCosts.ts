// Formulas behind the /kalkulator page and the purchase-costs box on listings.
// They mirror the two blog posts that explain them in detail
// ("Разходи при покупка на имот в София" and "Данъци при продажба на имот"),
// so if a rate changes here, update those posts too.

const round2 = (n: number) => Math.round(n * 100) / 100

// ── Buying ──────────────────────────────────────────────────────────────

/** Local acquisition tax set by Sofia Municipality (ЗМДТ чл. 46, max rate since 2020). */
export const SOFIA_LOCAL_TAX_RATE = 0.03

/** Property register fee: 0.1% of the deal value, minimum €5.11. */
const REGISTRY_FEE_RATE = 0.001
const REGISTRY_FEE_MIN = 5.11

/**
 * Notary fee tariff (Тарифа за нотариалните такси, т. 1), converted to euro
 * at the fixed rate. Each tier: from `over` euro, pay `base` plus `rate` of
 * the amount above `over`. Capped at NOTARY_FEE_MAX.
 */
const NOTARY_TIERS = [
  { over: 255645.94, base: 782.53, rate: 0.001 },
  { over: 51129.19, base: 373.5, rate: 0.002 },
  { over: 25564.59, base: 245.68, rate: 0.005 },
  { over: 5112.92, base: 82.06, rate: 0.008 },
  { over: 511.29, base: 22.24, rate: 0.013 },
  { over: 51.13, base: 15.34, rate: 0.015 },
  { over: 0, base: 15.34, rate: 0 },
]
const NOTARY_FEE_MAX = 3067.75
const VAT_RATE = 0.2

export function notaryFee(price: number): number {
  const tier = NOTARY_TIERS.find((t) => price > t.over) ?? NOTARY_TIERS[NOTARY_TIERS.length - 1]
  return round2(Math.min(tier.base + (price - tier.over) * tier.rate, NOTARY_FEE_MAX))
}

export type PurchaseCosts = {
  localTax: number
  notaryFee: number
  notaryVat: number
  registryFee: number
  total: number
  /** Total as a percentage of the price, e.g. 3.45 */
  percent: number
}

export function purchaseCosts(price: number, notaryChargesVat: boolean): PurchaseCosts {
  if (!(price > 0)) return { localTax: 0, notaryFee: 0, notaryVat: 0, registryFee: 0, total: 0, percent: 0 }
  const localTax = round2(price * SOFIA_LOCAL_TAX_RATE)
  const notary = notaryFee(price)
  const notaryVat = notaryChargesVat ? round2(notary * VAT_RATE) : 0
  const registryFee = round2(Math.max(price * REGISTRY_FEE_RATE, REGISTRY_FEE_MIN))
  const total = round2(localTax + notary + notaryVat + registryFee)
  return { localTax, notaryFee: notary, notaryVat, registryFee, total, percent: (total / price) * 100 }
}

// ── Selling ─────────────────────────────────────────────────────────────

export type AcquiredHow = 'purchase' | 'gift' | 'inheritance'
export type PropertyKind = 'home' | 'other'

export type SaleTaxInput = {
  salePrice: number
  /** Ignored for gifts (the law counts it as zero) and inheritance. */
  purchasePrice: number
  acquiredHow: AcquiredHow
  /** ISO dates, YYYY-MM-DD. acquiredDate may be '' when unknown. */
  acquiredDate: string
  saleDate: string
  kind: PropertyKind
  /** Properties sold this calendar year, including this one (3 means "3 or more"). */
  soldThisYear: 1 | 2 | 3
}

export type SaleTaxResult =
  | { exempt: true; reason: 'inheritance' | 'home3' | 'any5' | 'noGain' }
  | {
      exempt: false
      gain: number
      deductibleCosts: number
      taxableAmount: number
      tax: number
      /** First day the same sale would be tax-free, if that day is still ahead. */
      exemptFrom: string | null
    }

function parseIso(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null
}

const toIso = (d: Date) => d.toISOString().slice(0, 10)

/**
 * ЗДДФЛ чл. 13 requires *more than* N years of ownership, counted date to
 * date, so the sale becomes tax-free the day after the Nth anniversary.
 */
function dayAfterAnniversary(acquired: Date, years: number): Date {
  return new Date(Date.UTC(acquired.getUTCFullYear() + years, acquired.getUTCMonth(), acquired.getUTCDate() + 1))
}

export function saleTax(input: SaleTaxInput): SaleTaxResult {
  if (input.acquiredHow === 'inheritance') return { exempt: true, reason: 'inheritance' }

  const acquired = parseIso(input.acquiredDate)
  const sale = parseIso(input.saleDate)

  // The earliest date an exemption could apply, given what is being sold this year.
  let exemptFromDate: Date | null = null
  let exemptReason: 'home3' | 'any5' | null = null
  if (acquired) {
    if (input.kind === 'home' && input.soldThisYear === 1) {
      exemptFromDate = dayAfterAnniversary(acquired, 3)
      exemptReason = 'home3'
    } else if (input.soldThisYear <= 2) {
      exemptFromDate = dayAfterAnniversary(acquired, 5)
      exemptReason = 'any5'
    }
  }
  if (exemptFromDate && exemptReason && sale && sale >= exemptFromDate) return { exempt: true, reason: exemptReason }

  // ЗДДФЛ чл. 33: tax base is the gain minus 10% deemed costs; rate is 10%.
  const acquisitionPrice = input.acquiredHow === 'gift' ? 0 : input.purchasePrice
  const gain = round2(input.salePrice - acquisitionPrice)
  if (!(gain > 0)) return { exempt: true, reason: 'noGain' }
  const deductibleCosts = round2(gain * 0.1)
  const taxableAmount = round2(gain - deductibleCosts)
  return {
    exempt: false,
    gain,
    deductibleCosts,
    taxableAmount,
    tax: round2(taxableAmount * 0.1),
    exemptFrom: exemptFromDate && sale && exemptFromDate > sale ? toIso(exemptFromDate) : null,
  }
}
