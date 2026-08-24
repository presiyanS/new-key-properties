/**
 * Assigns a readable URL slug (e.g. "strelbishte-nk-1042") to any listing
 * that doesn't have one yet, built from its neighborhood + code. Existing
 * listing links (which use the raw Sanity id) keep working — the site
 * redirects them to the new slug automatically once this has run.
 *
 * Usage:
 *   SANITY_TOKEN=<write token> node scripts/backfill-listing-slugs.mjs
 *   SANITY_TOKEN=<write token> SANITY_DATASET=staging node scripts/backfill-listing-slugs.mjs
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

// Kept in sync with lib/slugify.ts (that file imports 'server-only'-free code
// but lives in the Next.js app; this script runs standalone under plain Node).
const BG_TO_LATIN = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
  т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht',
  ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
}

function slugify(text) {
  return text
    .toLowerCase()
    .split('')
    .map((ch) => BG_TO_LATIN[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const listings = await client.fetch(
  `*[_type == "listing"] | order(_createdAt asc) { _id, "slug": slug.current, neighborhood, code }`
)

const existingSlugs = new Set(listings.map((l) => l.slug).filter(Boolean))

const tx = client.transaction()
let count = 0

for (const l of listings) {
  if (l.slug) continue
  const base = slugify(`${l.neighborhood ?? ''} ${l.code ?? l._id}`) || l._id
  let slug = base
  let suffix = 2
  while (existingSlugs.has(slug)) {
    slug = `${base}-${suffix}`
    suffix++
  }
  existingSlugs.add(slug)
  tx.patch(l._id, { set: { slug: { _type: 'slug', current: slug } } })
  count++
}

if (count === 0) {
  console.log(`Nothing to backfill on "${dataset}" — all listings already have a slug.`)
  process.exit(0)
}

await tx.commit()
console.log(`✅  Assigned slugs to ${count} listing(s) on "${dataset}".`)
