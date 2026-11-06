import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { escapeHtml } from '@/lib/escapeHtml'
import { screenSubmission } from '@/lib/leadGuard'
import { sendToMakeWebhook } from '@/lib/makeWebhook'
import { hasMarketingConsent, sendMetaLeadEvent } from '@/lib/metaConversionsApi'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, phone, email, message, metaEventId, listingTitle, listingUrl, website } = await req.json()

  const verdict = await screenSubmission(website)
  if (verdict === 'honeypot') return NextResponse.json({ success: true })
  if (verdict === 'bot') return NextResponse.json({ error: 'Blocked' }, { status: 403 })

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // This route serves both the /contact page and the listing quick-inquiry box.
  await sendToMakeWebhook(listingTitle ? 'Website Listing Inquiry' : 'Website Contact Form', {
    name, phone, email, message, listingTitle, listingUrl,
  })

  // Runs alongside the Resend send rather than after it, so a slow Meta API
  // (bounded by its own 5s timeout) doesn't add to the response latency.
  const metaLeadPromise = metaEventId && hasMarketingConsent(req)
    ? sendMetaLeadEvent({
        eventId: metaEventId,
        eventSourceUrl: req.headers.get('referer') ?? 'https://www.newkey.bg/',
        email,
        phone,
        clientIp: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: req.headers.get('user-agent') ?? undefined,
      })
    : Promise.resolve()

  // Only ever link to our own site, whatever the request claims.
  const safeListingUrl = String(listingUrl ?? '').startsWith('https://www.newkey.bg/') ? listingUrl : null

  const { error } = await resend.emails.send({
    from: 'New Key Properties <noreply@newkey.bg>',
    to: 'office@newkey.bg',
    bcc: process.env.PERSONAL_NOTIFY_EMAIL || undefined,
    replyTo: email || undefined,
    subject: listingTitle ? `Ново запитване от ${name} за обява: ${listingTitle}` : `Ново запитване от ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a4d3a;">Ново запитване от сайта</h2>
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
          ${listingTitle ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Обява:</td>
            <td style="padding: 8px 0; font-weight: bold;">${safeListingUrl ? `<a href="${escapeHtml(safeListingUrl)}" style="color: #1a4d3a;">${escapeHtml(listingTitle)}</a>` : escapeHtml(listingTitle)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Съобщение:</td>
            <td style="padding: 8px 0;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
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
