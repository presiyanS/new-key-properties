import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { escapeHtml } from '@/lib/escapeHtml'
import { splitName, syncHubSpotContact } from '@/lib/hubspot'
import { screenSubmission } from '@/lib/leadGuard'
import { sendToMakeWebhook } from '@/lib/makeWebhook'

export async function POST(req: Request) {
  const { name, phone, email, message, website } = await req.json()

  const verdict = await screenSubmission(website)
  if (verdict === 'honeypot') return NextResponse.json({ success: true })
  if (verdict === 'bot') return NextResponse.json({ error: 'Blocked' }, { status: 403 })

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  await sendToMakeWebhook('Website Consultation Form', { name, phone, email, message })

  const { firstname, lastname } = splitName(name)

  // Awaited so Vercel doesn't freeze the function before the request completes,
  // but syncHubSpotContact never throws - CRM failures must never block the user-facing success state.
  await syncHubSpotContact({ firstname, lastname, phone, message }, email || undefined)

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
            <td style="padding: 8px 0; font-weight: bold;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Телефон:</td>
            <td style="padding: 8px 0; font-weight: bold;">${escapeHtml(phone)}</td>
          </tr>
          ${email ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Имейл:</td>
            <td style="padding: 8px 0;">${escapeHtml(email)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Съобщение:</td>
            <td style="padding: 8px 0;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    // Notification email failed, but the lead is still (attempting to be) in HubSpot - don't block the user.
  }

  return NextResponse.json({ success: true })
}
