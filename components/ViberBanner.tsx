'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleContext'

const VIBER_CHANNEL_URL =
  'https://invite.viber.com/?g2=AQANoyYQawSPE1a73%2BJosU5Og6%2BWGLCeCI6RBH5zh%2B3SGSyT2BdqKKx%2Bh6KIAN4%2B'
const COOKIE_NAME = 'nkp_viber_banner_dismissed'

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

// initialDismissed is read server-side from the request's cookies (see app/layout.tsx),
// which already reflects the same data document.cookie would — no client recheck needed.
export default function ViberBanner({ initialDismissed }: { initialDismissed: boolean }) {
  const { dict } = useLocale()
  const [dismissed, setDismissed] = useState(initialDismissed)

  if (dismissed) return null

  function handleClose() {
    setCookie(COOKIE_NAME, '1', 365)
    setDismissed(true)
  }

  return (
    <div className="relative bg-brand-green text-white px-4 py-2.5 text-center text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-6">
        <span className="flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 text-brand-gold shrink-0" viewBox="0 0 32 32" fill="currentColor">
            <path d="M25.5 6.2C23.2 4.1 19.8 3 16 3 8.3 3 2 8.8 2 16c0 2.3.6 4.5 1.8 6.5L2 30l7.8-2c1.8 1 3.9 1.5 6.2 1.5 7.7 0 14-5.8 14-13 0-3.5-1.3-6.8-4.5-9.8zM16 27.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.6 1.2 1.2-4.5-.3-.4C5.2 20.4 4.5 18.2 4.5 16 4.5 10.2 9.7 5.5 16 5.5c3 0 5.8 1.1 7.9 3 2.1 2 3.1 4.5 3.1 7.5 0 5.8-5.2 10.5-11.5 10.5zm6.3-7.8c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.3-.6.3-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
          </svg>
          {dict.viberBanner.text}
        </span>
        <a
          href={VIBER_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-brand-gold text-brand-green font-bold px-3.5 py-1 rounded-full hover:bg-brand-gold-light transition-colors"
        >
          {dict.viberBanner.cta}
        </a>
      </div>
      <button
        onClick={handleClose}
        aria-label={dict.viberBanner.close}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
