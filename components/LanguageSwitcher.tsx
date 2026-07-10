'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/i18n/LocaleContext'

export default function LanguageSwitcher() {
  const { locale, dict } = useLocale()
  const pathname = usePathname()

  const bgPath = locale === 'en' ? pathname.replace(/^\/en(\/|$)/, '/') : pathname
  const enPath = locale === 'en' ? pathname : `/en${pathname === '/' ? '' : pathname}`

  // Plain <a> tags (not next/link): switching locale must reload through the
  // middleware so the server re-renders with the new x-locale header. Since
  // /en and / resolve to the identical route tree (rewrite, not a distinct
  // [locale] segment), Next's client-side router can reuse the cached page
  // across a soft navigation and never actually re-render in the new locale.
  return (
    <div className="flex items-center gap-1 text-sm font-medium" aria-label={dict.languageSwitcher.label}>
      <a
        href={bgPath}
        className={locale === 'bg' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
        aria-current={locale === 'bg'}
      >
        {dict.languageSwitcher.bg}
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={enPath}
        className={locale === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
        aria-current={locale === 'en'}
      >
        {dict.languageSwitcher.en}
      </a>
    </div>
  )
}
