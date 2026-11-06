import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { screenSubmission } from '@/lib/leadGuard'

const sanity = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  const { email, type, neighborhood, rooms, priceMin, priceMax } = await request.json()

  if ((await screenSubmission()) === 'bot') {
    return NextResponse.json({ error: 'Blocked' }, { status: 403 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Невалиден имейл адрес.' }, { status: 400 })
  }

  // Check if this exact email+criteria combo already exists
  const existing = await sanity.fetch(
    `*[_type == "savedSearch" && email == $email && type == $type && neighborhood == $neighborhood && rooms == $rooms && priceMin == $priceMin && priceMax == $priceMax][0]._id`,
    { email, type: type ?? 'any', neighborhood: neighborhood ?? '', rooms: rooms ?? null, priceMin: priceMin ?? null, priceMax: priceMax ?? null }
  )

  if (existing) {
    return NextResponse.json({ success: true, alreadySaved: true })
  }

  await sanity.create({
    _type: 'savedSearch',
    email,
    type: type ?? 'any',
    neighborhood: neighborhood ?? '',
    rooms: rooms ?? null,
    priceMin: priceMin ?? null,
    priceMax: priceMax ?? null,
    createdAt: new Date().toISOString(),
    active: true,
  })

  return NextResponse.json({ success: true })
}
