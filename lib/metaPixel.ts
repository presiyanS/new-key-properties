'use client'

const CONSENT_COOKIE = 'nkp_cookie_consent'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

// The consent cookie is the same one CookieConsent.tsx sets/reads — the
// Pixel base code only ever mounts when this is 'accepted', but form
// submissions can race that mount, so trackLead re-checks it directly.
function hasMarketingConsent(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').includes(`${CONSENT_COOKIE}=accepted`)
}

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// Fires the client-side Lead event. eventId must be reused for the matching
// Conversions API call server-side so Meta dedupes the pair into one event.
export function trackLead(eventId: string, data?: Record<string, unknown>) {
  if (!hasMarketingConsent() || typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'Lead', data ?? {}, { eventID: eventId })
}
