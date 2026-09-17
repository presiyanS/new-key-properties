/**
 * Moves the Hadzhi Dimitar listing (NK-1052) to the top of the manually-ordered
 * properties list (orderRank), so it's the first one shown on /listings.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/reorder-hadzhi-dimitar-first.mjs
 */

import { createClient } from '@sanity/client'
import { LexoRank } from 'lexorank'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const target = await client.fetch(`*[_type == "listing" && code == "NK-1052"][0]{ _id, orderRank }`)
if (!target) {
  console.error('❌  Listing NK-1052 not found.')
  process.exit(1)
}

const currentFirst = await client.fetch(
  `*[_type == "listing" && code != "NK-1052"] | order(orderRank asc) [0]{ orderRank }`
)

const firstRank = currentFirst?.orderRank
  ? LexoRank.parse(currentFirst.orderRank)
  : LexoRank.max()
const newRank = LexoRank.min().between(firstRank).toString()

await client.patch(target._id).set({ orderRank: newRank }).commit()
console.log(`✅ NK-1052 moved to top. New orderRank: ${newRank}`)
