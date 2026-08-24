/**
 * Replaces the long AI-generated em dash (—) with a short hyphen (-) across
 * all blog post text fields. Leaves the en dash (–) alone — it's used
 * correctly for numeric ranges (e.g. "2 400–2 600 EUR/кв.м").
 *
 * Usage:
 *   SANITY_TOKEN=<write token> node scripts/fix-blog-em-dashes.mjs
 *   SANITY_TOKEN=<write token> SANITY_DATASET=staging node scripts/fix-blog-em-dashes.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN.')
  process.exit(1)
}

const dataset = process.env.SANITY_DATASET ?? 'production'

const client = createClient({
  projectId: '9gz26s06',
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const FIELDS = ['title', 'titleEn', 'excerpt', 'excerptEn', 'content', 'contentEn']

const posts = await client.fetch(
  `*[_type == "blogPost"]{ _id, ${FIELDS.join(', ')} }`
)

const tx = client.transaction()
let count = 0

for (const post of posts) {
  const patch = {}
  for (const field of FIELDS) {
    const value = post[field]
    if (typeof value === 'string' && value.includes('—')) {
      patch[field] = value.replaceAll('—', '-')
    }
  }
  if (Object.keys(patch).length > 0) {
    tx.patch(post._id, { set: patch })
    count++
  }
}

if (count === 0) {
  console.log(`Nothing to fix on "${dataset}" — no em dashes found.`)
  process.exit(0)
}

await tx.commit()
console.log(`✅  Fixed em dashes in ${count} blog post(s) on "${dataset}".`)
