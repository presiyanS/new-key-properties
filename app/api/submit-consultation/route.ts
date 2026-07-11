import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { splitName, syncHubSpotContact } from '@/lib/hubspot'

export async function POST(req: Request) {
  const { name, phone, email, message } = await req.json()

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { firstname, lastname } = splitName(name)

  // Awaited so Vercel doesn't freeze the function before the request completes,
  // but syncHubSpotContact never throws — CRM failures must never block the user-facing success state.
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
