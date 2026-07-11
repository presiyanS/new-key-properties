const HUBSPOT_BASE = 'https://api.hubapi.com/crm/v3/objects/contacts'

export function splitName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim()
  const idx = trimmed.indexOf(' ')
  if (idx === -1) return { firstname: trimmed, lastname: '' }
  return { firstname: trimmed.slice(0, idx), lastname: trimmed.slice(idx + 1) }
}

/**
 * Upserts a HubSpot contact by email (PATCH first, falling back to a create
 * on 404). Never throws — CRM failures must never block the caller's
 * user-facing success response, only get logged server-side.
 */
export async function syncHubSpotContact(properties: Record<string, string>, email?: string) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    console.error('HubSpot sync skipped: HUBSPOT_PRIVATE_APP_TOKEN is not set')
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    if (email) {
      // Upsert by email: try updating an existing contact first.
      const patchRes = await fetch(`${HUBSPOT_BASE}/${encodeURIComponent(email)}?idProperty=email`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties }),
      })

      if (patchRes.ok) return

      if (patchRes.status !== 404) {
        console.error('HubSpot PATCH failed:', patchRes.status, await patchRes.text())
        return
      }
      // 404 = no existing contact with this email, fall through to create.
    }

    const createRes = await fetch(HUBSPOT_BASE, {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties: { ...properties, ...(email ? { email } : {}) } }),
    })

    if (!createRes.ok) {
      console.error('HubSpot POST failed:', createRes.status, await createRes.text())
    }
  } catch (err) {
    console.error('HubSpot sync error:', err)
  }
}
