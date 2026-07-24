const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/b2b27o6o2evaf2731flq46xppq3ec1sc'

export function sendToMakeWebhook(source: string, data: Record<string, unknown>) {
  fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}

const MAKE_LISTING_WEBHOOK_URL = 'https://hook.eu1.make.com/vohraajqmjc44flutwfi5bkrqmba1jum'

export function sendListingToMakeWebhook(data: Record<string, unknown>) {
  fetch(MAKE_LISTING_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}
