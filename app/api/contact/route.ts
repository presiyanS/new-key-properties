import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { sendMetaLeadEvent } from '@/lib/metaConversionsApi'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, phone, email, message, metaEventId } = await req.json()

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Runs alongside the Resend send rather than after it, so a slow Meta API
  // (bounded by its own 5s timeout) doesn't add to the response latency.
  const metaLeadPromise = metaEventId
    ? sendMetaLeadEvent({
        eventId: metaEventId,
        eventSourceUrl: req.headers.get('referer') ?? 'https://www.newkey.bg/',
        email,
        phone,
        clientIp: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: req.headers.get('user-agent') ?? undefined,
      })
    : Promise.resolve()

  const { error } = await resend.emails.send({
    from: 'New Key Properties <noreply@newkey.bg>',
    to: 'office@newkey.bg',
    bcc: process.env.PERSONAL_NOTIFY_EMAIL || undefined,
    replyTo: email || undefined,
    subject: `Ново запитване от ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a4d3a;">Ново запитване от сайта</h2>
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

  await metaLeadPromise

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
