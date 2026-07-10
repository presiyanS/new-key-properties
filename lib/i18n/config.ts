export type Locale = 'bg' | 'en'

export const locales: Locale[] = ['bg', 'en']
export const defaultLocale: Locale = 'bg'

/** Prefixes an internal path with /en when translating a link for the English site. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href
  if (href.startsWith('#') || href.startsWith('http')) return href
  return `/en${href === '/' ? '' : href}`
}
