'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { GOOGLE_ADS_ID, trackGoogleAdsContact } from '@/lib/googleAds'

// Only ever mounted by CookieConsent once the visitor has accepted the
// marketing/analytics category — see components/CookieConsent.tsx.
export default function GoogleAdsTag() {
  // Phone links live in ~20 places (many in server components), so one
  // document-level listener counts a tap on any tel: link as a Contact
  // conversion instead of wiring each link separately.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]')
      if (link) trackGoogleAdsContact()
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  if (!GOOGLE_ADS_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-base" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  )
}
