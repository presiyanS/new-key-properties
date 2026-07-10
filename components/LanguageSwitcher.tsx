'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/i18n/LocaleContext'

export default function LanguageSwitcher() {
  const { locale, dict } = useLocale()
  const pathname = usePathname()

  const bgPath = locale === 'en' ? pathname.replace(/^\/en(\/|$)/, '/') : pathname
  const enPath = locale === 'en' ? pathname : `/en${pathname === '/' ? '' : pathname}`

  return (
    <div className="flex items-center gap-1 text-sm font-medium" aria-label={dict.languageSwitcher.label}>
      <Link
        href={bgPath}
        className={locale === 'bg' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
        aria-current={locale === 'bg'}
      >
        {dict.languageSwitcher.bg}
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href={enPath}
        className={locale === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
        aria-current={locale === 'en'}
      >
        {dict.languageSwitcher.en}
      </Link>
    </div>
  )
}
