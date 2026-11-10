'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { GOOGLE_ADS_ID, trackGoogleAdsContact } from '@/lib/googleAds'

const GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
}
const DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
}

// Google Consent Mode v2. Mounted on every visit by CookieConsent (not only
// after "accept") so Google Ads can detect the tag. Until the visitor accepts,
// consent stays "denied": no cookies are set and only anonymous, cookieless
// pings reach Google. Conversion events (trackGoogleAdsContact) still require
// accepted consent - see lib/googleAds.ts. Described in the privacy policy, §7.
export default function GoogleAdsTag({ consented }: { consented: boolean }) {
  // When the visitor clicks "accept" in the banner, switch consent on without a reload.
  useEffect(() => {
    if (!consented) return
    window.gtag?.('consent', 'update', GRANTED)
    window.gtag?.('set', 'ads_data_redaction', false)
  }, [consented])

  // Phone links live in ~20 places (many in server components), so one
  // document-level listener counts a tap on any tel: link as a Contact
  // conversion instead of wiring each link separately.
  useEffect(() => {
    if (!consented) return
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]')
      if (link) trackGoogleAdsContact()
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [consented])

  if (!GOOGLE_ADS_ID) return null

  // The consent default must be queued before 'config', so both live in the
  // same inline script. The starting state comes from the server-read cookie.
  const initial = JSON.stringify(consented ? GRANTED : DENIED)

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-base" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', ${initial});
        gtag('set', 'ads_data_redaction', ${consented ? 'false' : 'true'});
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  )
}
