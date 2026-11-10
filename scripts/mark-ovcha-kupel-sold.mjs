/**
 * Marks the Ovcha Kupel apartment (NK-1053) as sold, at Presiyan's request on
 * 2026-11-10. The listing stays on the site with the "Продадено" / "Sold" badge
 * and the "already sold" notice. Rollback: set status back to 'active'.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/mark-ovcha-kupel-sold.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({ projectId: '9gz26s06', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false })

const listing = await client.fetch(`*[_type == "listing" && code == "NK-1053" && !(_id in path("drafts.**"))][0]{ _id, title, status }`)
if (!listing) { console.error('❌  NK-1053 not found'); process.exit(1) }
console.log(`Found ${listing._id} - "${listing.title}" (status: ${listing.status})`)

await client.patch(listing._id).set({ status: 'sold' }).commit()

// A draft copy in Studio would otherwise bring back the old status when published.
const draftId = `drafts.${listing._id}`
if (await client.fetch(`*[_id == $id][0]._id`, { id: draftId })) {
  await client.patch(draftId).set({ status: 'sold' }).commit()
  console.log('  (draft copy updated too)')
}
console.log('✅  NK-1053 marked as sold')
