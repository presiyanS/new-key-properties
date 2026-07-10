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
