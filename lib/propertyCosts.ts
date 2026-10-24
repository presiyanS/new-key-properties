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

// ── Renting out ─────────────────────────────────────────────────────────

/**
 * Rent tax for a private landlord (ЗДДФЛ чл. 31 + чл. 48): 10% of the rent is
 * deemed costs, the rest is taxed at 10%, so 9% of the rent actually collected.
 */
export const RENT_TAX_RATE = 0.09

export type RentalYieldInput = {
  price: number
  monthlyRent: number
  /** One-off: renovation, furniture, appliances before the first tenant. */
  setupCosts: number
  /** Months per year with no tenant (0–3). */
  vacantMonths: number
  /** Share of collected rent paid to a property manager, e.g. 0.1. */
  managementRate: number
  /** Building tax + waste fee per year, from the municipality's annual notice. */
  localFeesPerYear: number
  /** Repairs, wear and tear, insurance per year. */
  upkeepPerYear: number
}

export type RentalYieldResult = {
  /** Price-only yield, the figure usually quoted in listings. Percent, e.g. 5.6 */
  grossYield: number
  fullYearRent: number
  vacancyLoss: number
  management: number
  rentTax: number
  localFees: number
  upkeep: number
  netIncome: number
  purchaseCosts: number
  totalInvestment: number
  /** Net income over everything paid to get the property rented. Percent. */
  netYield: number
  /** Years for net income to repay the investment; null if it never does. */
  paybackYears: number | null
}

export function rentalYield(input: RentalYieldInput): RentalYieldResult | null {
  if (!(input.price > 0) || !(input.monthlyRent > 0)) return null
  const fullYearRent = round2(input.monthlyRent * 12)
  const vacancyLoss = round2(input.monthlyRent * input.vacantMonths)
  const collected = fullYearRent - vacancyLoss
  const management = round2(collected * input.managementRate)
  const rentTax = round2(collected * RENT_TAX_RATE)
  const netIncome = round2(collected - management - rentTax - input.localFeesPerYear - input.upkeepPerYear)
  const buying = purchaseCosts(input.price, false).total
  const totalInvestment = round2(input.price + buying + input.setupCosts)
  return {
    grossYield: (fullYearRent / input.price) * 100,
    fullYearRent,
    vacancyLoss,
    management,
    rentTax,
    localFees: input.localFeesPerYear,
    upkeep: input.upkeepPerYear,
    netIncome,
    purchaseCosts: buying,
    totalInvestment,
    netYield: (netIncome / totalInvestment) * 100,
    paybackYears: netIncome > 0 ? totalInvestment / netIncome : null,
  }
}

// ── Affordability ───────────────────────────────────────────────────────

/** BNB limits on home loans since 1 Oct 2024: loan ≤ 85% of value, payment ≤ 50% of income, ≤ 30 years. */
export const MAX_LOAN_TO_VALUE = 0.85
export const MAX_PAYMENT_TO_INCOME = 0.5

/** Rough bank-side costs: property valuation + application/processing fee. Varies by bank. */
export const BANK_FEES_ESTIMATE = 350

/** Monthly annuity payment for a loan at a yearly rate (percent) over `years`. */
export function monthlyPayment(loan: number, ratePercent: number, years: number): number {
  const r = ratePercent / 100 / 12
  const n = years * 12
  return r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n))
}

/** The largest loan a monthly payment can carry. */
function loanForPayment(payment: number, ratePercent: number, years: number): number {
  const r = ratePercent / 100 / 12
  const n = years * 12
  return r === 0 ? payment * n : (payment * (1 - Math.pow(1 + r, -n))) / r
}

/**
 * Costs of putting a mortgage on the property: notary fee for the mortgage
 * deed (same tariff scale, on the loan amount) + VAT, 0.1% registration of the
 * mortgage, and the bank's own fees.
 */
export function mortgageFees(loan: number, notaryChargesVat: boolean): number {
  if (!(loan > 0)) return 0
  const notary = notaryFee(loan)
  const vat = notaryChargesVat ? notary * VAT_RATE : 0
  const registry = Math.max(loan * REGISTRY_FEE_RATE, REGISTRY_FEE_MIN)
  return round2(notary + vat + registry + BANK_FEES_ESTIMATE)
}

export type AffordabilityInput = {
  /** Household net income per month. */
  monthlyIncome: number
  /** Payments on loans the household already has. */
  otherPayments: number
  savings: number
  ratePercent: number
  years: number
  /** Share of income the buyer is willing to put towards the payment, at most 0.5. */
  paymentShare: number
}

export type AffordabilityResult = {
  price: number
  loan: number
  payment: number
  downPayment: number
  purchaseCosts: number
  mortgageFees: number
  /** What capped the price: the income (payment limit) or the savings (cash needed upfront). */
  limitedBy: 'income' | 'savings'
  /** Payment if the (usually floating) rate rises by 2 points. */
  paymentIfRateUp: number
}

export function affordability(input: AffordabilityInput): AffordabilityResult | null {
  const share = Math.min(input.paymentShare, MAX_PAYMENT_TO_INCOME)
  const maxPayment = Math.max(input.monthlyIncome * share - input.otherPayments, 0)
  const maxLoanByIncome = loanForPayment(maxPayment, input.ratePercent, input.years)
  if (!(input.savings > 0)) return null

  // Cash needed upfront for a given price; grows with price, so binary-search the largest one the savings cover.
  const plan = (price: number) => {
    const loan = Math.min(price * MAX_LOAN_TO_VALUE, maxLoanByIncome)
    const buying = purchaseCosts(price, false).total
    const fees = mortgageFees(loan, true)
    return { loan, buying, fees, cash: price - loan + buying + fees }
  }
  let lo = 0
  let hi = input.savings / (1 - MAX_LOAN_TO_VALUE) + 1
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (plan(mid).cash <= input.savings) lo = mid
    else hi = mid
  }
  // Round down to a whole hundred so the shown price is always affordable.
  const price = Math.floor(lo / 100) * 100
  if (price <= 0) return null
  const p = plan(price)
  const loan = Math.floor(p.loan)
  return {
    price,
    loan,
    payment: round2(monthlyPayment(loan, input.ratePercent, input.years)),
    downPayment: round2(price - loan),
    purchaseCosts: p.buying,
    mortgageFees: p.fees,
    limitedBy: price * MAX_LOAN_TO_VALUE > maxLoanByIncome + 1 ? 'income' : 'savings',
    paymentIfRateUp: round2(monthlyPayment(loan, input.ratePercent + 2, input.years)),
  }
}
