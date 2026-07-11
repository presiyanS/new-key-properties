import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const HUBSPOT_BASE = 'https://api.hubapi.com/crm/v3/objects/contacts'

function splitName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim()
  const idx = trimmed.indexOf(' ')
  if (idx === -1) return { firstname: trimmed, lastname: '' }
  return { firstname: trimmed.slice(0, idx), lastname: trimmed.slice(idx + 1) }
}

async function syncToHubSpot(properties: Record<string, string>, email?: string) {
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

export async function POST(req: Request) {
  const { name, phone, email, message } = await req.json()

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { firstname, lastname } = splitName(name)

  // Awaited so Vercel doesn't freeze the function before the request completes,
  // but syncToHubSpot never throws — CRM failures must never block the user-facing success state.
  await syncToHubSpot({ firstname, lastname, phone, message }, email || undefined)

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'New Key Properties <noreply@newkey.bg>',
    to: 'office@newkey.bg',
    bcc: process.env.PERSONAL_NOTIFY_EMAIL || undefined,
    replyTo: email || undefined,
    subject: `Ново запитване за консултация от ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a4d3a;">Ново запитване за консултация</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;">Име:</td>
            <td style="padding: 8px 0; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Телефон:</td>
            <td style="padding: 8px 0; font-weight: bold;">${phone}</td>
          </tr>
          ${email ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Имейл:</td>
            <td style="padding: 8px 0;">${email}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Съобщение:</td>
            <td style="padding: 8px 0;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    // Notification email failed, but the lead is still (attempting to be) in HubSpot — don't block the user.
  }

  return NextResponse.json({ success: true })
}
