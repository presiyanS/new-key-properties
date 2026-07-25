import { createHash } from 'crypto'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_ACCESS_TOKEN
// Temporary — set only while verifying in Events Manager's Test Events tab.
// Must be unset in normal production operation, or live traffic gets tagged as test data.
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

function hashField(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

// Meta's spec normalizes phone numbers to digits only (no +, spaces, or
// punctuation) before hashing.
function hashPhone(value: string): string {
  return hashField(value.replace(/[^\d]/g, ''))
}

type LeadEventInput = {
  eventId: string
  eventSourceUrl: string
  email?: string
  phone?: string
  clientIp?: string
  userAgent?: string
}

/**
 * Sends a Lead event to Meta's Conversions API, deduped against the
 * client-side fbq('track','Lead', …, {eventID}) call via the shared eventId.
 * Never throws and is bounded by a 5s timeout — a slow or unreachable Meta
 * API must never fail or meaningfully delay the form's response.
 */
export async function sendMetaLeadEvent({ eventId, eventSourceUrl, email, phone, clientIp, userAgent }: LeadEventInput) {
  if (!PIXEL_ID || !ACCESS_TOKEN) return

  const user_data: Record<string, unknown> = {}
  if (email) user_data.em = [hashField(email)]
  if (phone) user_data.ph = [hashPhone(phone)]
  if (clientIp) user_data.client_ip_address = clientIp
  if (userAgent) user_data.client_user_agent = userAgent

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: eventSourceUrl,
            action_source: 'website',
            user_data,
          },
        ],
        ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
      }),
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      console.error('Meta CAPI error:', res.status, await res.text())
    }
  } catch (err) {
    console.error('Meta CAPI request failed:', err)
  }
}
