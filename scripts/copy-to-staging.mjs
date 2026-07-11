/**
 * Copies all documents from production to staging dataset.
 * Copies image assets first, then all other documents.
 * Usage: SANITY_TOKEN=<token> node scripts/copy-to-staging.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN.')
  process.exit(1)
}

const production = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const staging = createClient({
  projectId: '9gz26s06',
  dataset: 'staging',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function copyBatch(docs, label) {
  const BATCH = 50
  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH)
    const tx = staging.transaction()
    for (const doc of batch) tx.createOrReplace(doc)
    await tx.commit()
    console.log(`✅ ${label}: ${Math.min(i + BATCH, docs.length)} / ${docs.length}`)
  }
}

// Fetch assets and documents separately
const assets = await production.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]`)
const docs = await production.fetch(`*[!(_id in path("_.**")) && !(_type in ["sanity.imageAsset", "sanity.fileAsset"])]`)

console.log(`Found ${assets.length} assets and ${docs.length} documents in production`)

// Copy assets first (documents reference them)
await copyBatch(assets, 'Assets')
await copyBatch(docs, 'Documents')

console.log('\nDone. Staging is now a full copy of production.')
