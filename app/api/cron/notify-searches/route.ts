import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const sanity = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)

type SavedSearch = {
  _id: string
  email: string
  type: 'sale' | 'rent' | 'any'
  neighborhood: string
  rooms: number | null
  priceMin: number | null
  priceMax: number | null
}

type Listing = {
  _id: string
  title: string
  type: 'sale' | 'rent'
  price: number
  area: number
  rooms: number
  neighborhood: string
}

function matches(listing: Listing, search: SavedSearch): boolean {
  if (search.type !== 'any' && listing.type !== search.type) return false
  if (search.neighborhood && listing.neighborhood !== search.neighborhood) return false
  if (search.rooms != null && listing.rooms !== search.rooms) return false
  if (search.priceMin != null && listing.price < search.priceMin) return false
  if (search.priceMax != null && listing.price > search.priceMax) return false
  return true
}

function buildEmailHtml(listing: Listing, search: SavedSearch): string {
  const priceStr = listing.type === 'sale'
    ? `€${listing.price.toLocaleString('bg-BG')}`
    : `€${listing.price.toLocaleString('bg-BG')}/мес.`

  const listingUrl = `https://www.newkey.bg/listings/${listing._id}`

  const criteriaLines = [
    search.type !== 'any' ? `Тип: ${search.type === 'sale' ? 'Продажба' : 'Наем'}` : null,
    search.neighborhood ? `Квартал: ${search.neighborhood}` : null,
    search.rooms ? `Стаи: ${search.rooms}` : null,
    search.priceMin || search.priceMax
      ? `Цена: ${search.priceMin ? `от €${search.priceMin.toLocaleString('bg-BG')}` : ''} ${search.priceMax ? `до €${search.priceMax.toLocaleString('bg-BG')}` : ''}`.trim()
      : null,
  ].filter(Boolean)

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#1a4d3a;padding:32px 40px;">
      <p style="margin:0;color:#c9a84c;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;">New Key Properties</p>
      <h1 style="margin:12px 0 0;color:#fff;font-size:24px;line-height:1.3;">Нов имот отговаря на Вашето търсене</h1>
    </div>

    <!-- Listing card -->
    <div style="padding:32px 40px;">
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:11px;color:#6b7280;font-family:sans-serif;text-transform:uppercase;letter-spacing:1px;">
          ${listing.type === 'sale' ? 'Продажба' : 'Наем'} · ${listing.neighborhood}, София
        </p>
        <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">${listing.title}</h2>
        <div style="display:flex;gap:24px;flex-wrap:wrap;">
          <div>
            <p style="margin:0;font-size:11px;color:#6b7280;font-family:sans-serif;">ЦЕНА</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:bold;color:#c9a84c;">${priceStr}</p>
          </div>
          <div>
            <p style="margin:0;font-size:11px;color:#6b7280;font-family:sans-serif;">ПЛОЩ</p>
            <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#111827;">${listing.area} м²</p>
          </div>
          <div>
            <p style="margin:0;font-size:11px;color:#6b7280;font-family:sans-serif;">СТАИ</p>
            <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#111827;">${listing.rooms}</p>
          </div>
        </div>
      </div>

      <a href="${listingUrl}" style="display:block;background:#1a4d3a;color:#c9a84c;text-decoration:none;text-align:center;padding:16px;border-radius:12px;font-weight:bold;font-size:16px;font-family:sans-serif;margin-bottom:24px;">
        Разгледайте имота →
      </a>

      ${criteriaLines.length > 0 ? `
      <div style="border-top:1px solid #e5e7eb;padding-top:20px;">
        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;font-family:sans-serif;">Вашите критерии:</p>
        ${criteriaLines.map(c => `<p style="margin:2px 0;font-size:13px;color:#374151;font-family:sans-serif;">· ${c}</p>`).join('')}
      </div>` : ''}
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;font-family:sans-serif;">
        New Key Properties · office@newkey.bg · 0879 826 292<br>
        За да се отпишете от известията, моля пишете ни на office@newkey.bg
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()

  const [newListings, savedSearches]: [Listing[], SavedSearch[]] = await Promise.all([
    sanity.fetch(
      `*[_type == "listing" && _createdAt > $since]{ _id, title, type, price, area, rooms, neighborhood }`,
      { since }
    ),
    sanity.fetch(
      `*[_type == "savedSearch" && active == true]{ _id, email, type, neighborhood, rooms, priceMin, priceMax }`
    ),
  ])

  if (newListings.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: 'No new listings' })
  }

  let sent = 0
  // Group matches by email to avoid multiple emails to same person
  const emailToListings = new Map<string, { listing: Listing; search: SavedSearch }[]>()

  for (const search of savedSearches) {
    for (const listing of newListings) {
      if (matches(listing, search)) {
        if (!emailToListings.has(search.email)) emailToListings.set(search.email, [])
        emailToListings.get(search.email)!.push({ listing, search })
      }
    }
  }

  for (const [email, items] of emailToListings) {
    // Send one email per matching listing (or first match if multiple)
    for (const { listing, search } of items) {
      try {
        await resend.emails.send({
          from: 'New Key Properties <noreply@newkey.bg>',
          to: email,
          subject: `Нов имот: ${listing.title} — ${listing.neighborhood}`,
          html: buildEmailHtml(listing, search),
        })
        sent++
      } catch (e) {
        console.error(`Failed to send to ${email}:`, e)
      }
    }
  }

  return NextResponse.json({ success: true, sent, listings: newListings.length })
}
