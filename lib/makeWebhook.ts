const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/b2b27o6o2evaf2731flq46xppq3ec1sc'

// Server-side only: called from the /api/* form routes after the bot check, so
// spam never reaches HubSpot and this address stays out of the public site code.
// Must be awaited or Vercel can freeze the function before the request is sent.
// Never throws - a Make.com problem must not block the visitor's submission.
export async function sendToMakeWebhook(source: string, data: Record<string, unknown>) {
  try {
    await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source, timestamp: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    })
  } catch (err) {
    console.error('Make.com webhook failed:', err)
  }
}

const MAKE_LISTING_WEBHOOK_URL = 'https://hook.eu1.make.com/vohraajqmjc44flutwfi5bkrqmba1jum'

export function sendListingToMakeWebhook(data: Record<string, unknown>) {
  fetch(MAKE_LISTING_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}
