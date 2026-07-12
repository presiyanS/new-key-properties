/**
 * Assigns a short reference code (NK-1001, NK-1002, ...) to any production
 * listing that doesn't have one yet, ordered by creation date.
 * Usage: SANITY_TOKEN=<write token> node scripts/backfill-listing-codes.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const listings = await client.fetch(
  `*[_type == "listing"] | order(_createdAt asc) { _id, code, _createdAt }`
)

const existingCodes = new Set(listings.map((l) => l.code).filter(Boolean))
let next = 1001

const tx = client.transaction()
let count = 0

for (const l of listings) {
  if (l.code) continue
  while (existingCodes.has(`NK-${next}`)) next++
  const code = `NK-${next}`
  existingCodes.add(code)
  next++
  tx.patch(l._id, { set: { code } })
  count++
}

if (count === 0) {
  console.log('Nothing to backfill — all listings already have a code.')
  process.exit(0)
}

await tx.commit()
console.log(`✅  Assigned codes to ${count} listing(s).`)
