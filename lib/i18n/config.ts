export type Locale = 'bg' | 'en'

export const locales: Locale[] = ['bg', 'en']
export const defaultLocale: Locale = 'bg'

/** Prefixes an internal path with /en when translating a link for the English site. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href
  if (href.startsWith('#') || href.startsWith('http')) return href
  return `/en${href === '/' ? '' : href}`
}

/**
 * Builds Next.js metadata `alternates` (canonical + hreflang) for a locale-agnostic
 * path, e.g. hreflangAlternates('/about', locale) for both /about and /en/about.
 */
export function hreflangAlternates(path: string, locale: Locale) {
  const bgPath = path
  const enPath = path === '/' ? '/en' : `/en${path}`
  return {
    canonical: locale === 'en' ? enPath : bgPath,
    languages: {
      'bg-BG': bgPath,
      'en-US': enPath,
      'x-default': bgPath,
    },
  }
}

/** Blog post `category` values are fixed Bulgarian strings stored directly in Sanity (no separate En field). */
const BLOG_CATEGORY_EN: Record<string, string> = {
  'Пазарен анализ': 'Market analysis',
  'Съвети': 'Tips',
  'Инвестиции': 'Investments',
  'Ръководства': 'Guides',
  'Анализи': 'Analysis',
  'Правни съвети': 'Legal advice',
}

export function translateBlogCategory(category: string, locale: Locale): string {
  return locale === 'en' ? (BLOG_CATEGORY_EN[category] ?? category) : category
}

/**
 * Listings store `neighborhood` as a single Bulgarian string (no En field in
 * the schema), so this transliterates the known Sofia neighborhoods for the
 * English site. Unknown/future values fall back to the original string
 * instead of erroring — better an unmapped Cyrillic name than a crash.
 */
const NEIGHBORHOOD_EN: Record<string, string> = {
  'борово': 'Borovo',
  'гео милев': 'Geo Milev',
  'драгалевци': 'Dragalevtsi',
  'дружба': 'Druzhba',
  'дружба 2': 'Druzhba 2',
  'красно село': 'Krasno Selo',
  'кръстова вада': 'Krastova Vada',
  'лозенец': 'Lozenets',
  'малинова долина': 'Malinova Dolina',
  'манастирски ливади': 'Manastirski Livadi',
  'младост': 'Mladost',
  'овча купел': 'Ovcha Kupel',
  'овча купел 2': 'Ovcha Kupel 2',
  'сердика': 'Serdika',
  'созопол': 'Sozopol',
  'хиподрума': 'Hipodruma',
  'център': 'Center',
}

export function translateNeighborhood(name: string, locale: Locale): string {
  if (locale !== 'en') return name
  const key = name.trim().toLowerCase()
  return NEIGHBORHOOD_EN[key] ?? name
}

/**
 * `floor` is a free-text string field (per the schema, it can hold a number
 * or one of a few fixed Bulgarian words instead) — translate the known words,
 * leave anything else (numbers) untouched.
 */
const FLOOR_TEXT_EN: Record<string, string> = {
  'партер': 'Ground floor',
  'подземен': 'Basement',
  'мансарда': 'Attic',
}

export function translateFloor(floor: string, locale: Locale): string {
  if (locale !== 'en') return floor
  const key = floor.trim().toLowerCase()
  return FLOOR_TEXT_EN[key] ?? floor
}

/**
 * `price` is also a free-text string field — usually a plain number, but can
 * be one of these fixed Bulgarian phrases instead (per the schema
 * description). Translate the known phrases, leave numeric prices untouched.
 */
const PRICE_TEXT_EN: Record<string, string> = {
  'по договаряне': 'Negotiable',
  'по запитване': 'Price on request',
}

export function translatePriceText(price: string, locale: Locale): string {
  if (locale !== 'en') return price
  const key = price.trim().toLowerCase()
  if (PRICE_TEXT_EN[key]) return PRICE_TEXT_EN[key]
  // Rental prices are sometimes entered as free text like "от 400 €/мес."
  // ("from 400 €/month") — translate the common fragments rather than the
  // whole string, since the numbers/formatting vary per listing.
  return price
    .replace(/^от\s+/i, 'from ')
    .replace(/€\s*\/\s*мес\.?/i, '€/mo')
}

/**
 * Neighborhood `priceRangeSale`/`priceRangeRent` are also free-text fields with
 * no separate En counterpart (per the schema) — translate the fixed Bulgarian
 * unit fragments (e.g. "€/кв.м" -> "€/m²"), leave the numbers untouched.
 */
export function translateNeighborhoodPriceRange(range: string, locale: Locale): string {
  if (locale !== 'en') return range
  return range
    .replace(/€\s*\/\s*кв\.?\s*м\.?/i, '€/m²')
    .replace(/€\s*\/\s*мес\.?/i, '€/mo')
}
