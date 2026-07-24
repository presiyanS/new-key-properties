const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/b2b27o6o2evaf2731flq46xppq3ec1sc'

export function sendToMakeWebhook(source: string, data: Record<string, unknown>) {
  fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}

// TODO: swap in the real scenario URL once it's created in Make.
const MAKE_LISTING_WEBHOOK_URL = 'https://hook.eu1.make.com/REPLACE_ME_LISTING_WEBHOOK'

export async function sendListingToMakeWebhook(data: Record<string, unknown>) {
  await fetch(MAKE_LISTING_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}
