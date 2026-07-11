/**
 * Converts price, area, rooms, and floor from numbers to strings on all listings.
 * Formats prices as "299 720 €" (sale) or "650 €/мес." (rent).
 * Usage: SANITY_TOKEN=<token> node scripts/fix-numeric-fields.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN. Run: SANITY_TOKEN=<token> node scripts/fix-numeric-fields.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function formatPrice(raw, type) {
  const n = Number(String(raw).replace(/[^0-9]/g, ''))
  if (isNaN(n) || n === 0) return String(raw)
  const formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return type === 'rent' ? `${formatted} €/мес.` : `${formatted} €`
}

const listings = await client.fetch(`*[_type == "listing"]{ _id, type, price, area, rooms, floor }`)

console.log(`Found ${listings.length} listings. Patching...`)

let fixed = 0
for (const listing of listings) {
  const patch = {}

  // Re-format price regardless of current type (ensures correct format)
  const rawPrice = String(listing.price ?? '').replace(/[^0-9]/g, '')
  if (rawPrice) {
    patch.price = formatPrice(rawPrice, listing.type)
  }

  if (typeof listing.area === 'number') patch.area = String(listing.area)
  if (typeof listing.rooms === 'number') patch.rooms = String(listing.rooms)
  if (typeof listing.floor === 'number') patch.floor = String(listing.floor)

  if (Object.keys(patch).length > 0) {
    await client.patch(listing._id).set(patch).commit()
    console.log(`✅ Fixed: ${listing._id}`, patch)
    fixed++
  }
}

console.log(`\nDone. Fixed ${fixed} listings.`)
