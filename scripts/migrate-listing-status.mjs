/**
 * One-off migration: replaces the old `sold` boolean with the new three-state
 * `status` field (active / under_offer / sold). sold: true -> 'sold',
 * sold: false -> 'active'. Existing listings never had an "under offer" state,
 * so nothing maps to it here — set it manually in Studio afterwards.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/migrate-listing-status.mjs [dataset]
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const dataset = process.argv[2] || 'production'

const client = createClient({
  projectId: '9gz26s06',
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const docs = await client.fetch(`*[_type == "listing" && !defined(status)]{ _id, sold }`)

if (docs.length === 0) {
  console.log(`✅  Nothing to migrate on "${dataset}" — every listing already has a status.`)
  process.exit(0)
}

console.log(`Migrating ${docs.length} listing(s) on "${dataset}"...`)

for (const doc of docs) {
  const status = doc.sold === true ? 'sold' : 'active'
  await client.patch(doc._id).set({ status }).unset(['sold']).commit()
  console.log(`  ${doc._id}: sold=${doc.sold ?? false} -> status=${status}`)
}

console.log('✅  Done.')
