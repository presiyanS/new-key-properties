'use client'

import { useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'

const COOKIE_NAME = 'nkp_cookie_consent'

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

type Status = 'pending' | 'accepted' | 'declined'

// initialStatus is read server-side from the request's cookies (see app/layout.tsx),
// which already reflects the same data document.cookie would — no client recheck needed.
export default function CookieConsent({ initialStatus }: { initialStatus: Status }) {
  const { locale, dict } = useLocale()
  const [status, setStatus] = useState<Status>(initialStatus)

  function handle(choice: 'accepted' | 'declined') {
    setCookie(COOKIE_NAME, choice, 180)
    setStatus(choice)
  }

  return (
    <>
      {status === 'accepted' && (
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/148872906.js"
          strategy="afterInteractive"
        />
      )}

      {status === 'pending' && (
        <div className="fixed bottom-0 inset-x-0 z-[60] bg-brand-green-dark border-t border-brand-gold/20 px-4 py-4 sm:py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <p className="text-white/80 text-sm text-center sm:text-left flex-1">
              {dict.cookies.message}{' '}
              <Link
                href={localizeHref('/privacy-policy', locale)}
                className="text-brand-gold underline hover:text-brand-gold-light transition-colors"
              >
                {dict.cookies.learnMore}
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handle('declined')}
                className="px-5 py-2.5 rounded-xl border border-brand-gold/30 text-brand-gold/80 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {dict.cookies.decline}
              </button>
              <button
                onClick={() => handle('accepted')}
                className="px-5 py-2.5 rounded-xl bg-brand-gold text-brand-green text-sm font-bold hover:bg-brand-gold-light transition-colors"
              >
                {dict.cookies.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
