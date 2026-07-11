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
  'Пазарен анализ': 'Market Analysis',
  'Съвети': 'Tips',
  'Инвестиции': 'Investments',
  'Ръководства': 'Guides',
  'Анализи': 'Analysis',
  'Правни съвети': 'Legal Advice',
}

export function translateBlogCategory(category: string, locale: Locale): string {
  return locale === 'en' ? (BLOG_CATEGORY_EN[category] ?? category) : category
}
