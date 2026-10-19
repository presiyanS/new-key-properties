'use client'

const CONSENT_COOKIE = 'nkp_cookie_consent'

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
// Label of the "Contact" conversion action in Google Ads (Goals → Conversions).
// One action covers both form sends and phone-link taps.
const CONTACT_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Same check as lib/metaPixel.ts: the tag only mounts after consent, but a
// form submission can race that mount, so re-check the cookie directly.
function hasMarketingConsent(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').includes(`${CONSENT_COOKIE}=accepted`)
}

export function trackGoogleAdsContact() {
  if (!GOOGLE_ADS_ID || !CONTACT_LABEL) return
  if (!hasMarketingConsent() || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${CONTACT_LABEL}` })
}
