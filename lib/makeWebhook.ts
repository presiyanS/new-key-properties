// Server-side only: called from the /api/* form routes after the bot check, so
// spam never reaches HubSpot and this address stays out of the public site code.
// Must be awaited or Vercel can freeze the function before the request is sent.
// Never throws - a Make.com problem must not block the visitor's submission.
export async function sendToMakeWebhook(source: string, data: Record<string, unknown>) {
  // Kept in a private Vercel setting because this code repository is public:
  // anyone with the address could create fake leads in HubSpot.
  const url = process.env.MAKE_LEAD_WEBHOOK_URL
  if (!url) {
    console.error('MAKE_LEAD_WEBHOOK_URL is not set - lead was not sent to Make.com')
    return
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source, timestamp: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    })
  } catch (err) {
    console.error('Make.com webhook failed:', err)
  }
}
