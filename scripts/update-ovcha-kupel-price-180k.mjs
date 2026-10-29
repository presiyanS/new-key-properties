/**
 * One-off patch for the Ovcha Kupel listing (NK-1053), October 2026:
 * price reduced from €189 000 to €180 000 (apartment only, parking spaces
 * still sold separately). Updates price and the price line in the description
 * (BG + EN). Title, features and slug are left unchanged.
 * Usage: node --env-file=.env.local scripts/update-ovcha-kupel-price-180k.mjs
 */

import { createClient } from '@sanity/client'

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

const listing = await client.fetch(
  `*[_type == "listing" && code == "NK-1053"][0]{ _id, description, descriptionEn }`
)
if (!listing) {
  console.error('❌  Listing NK-1053 not found.')
  process.exit(1)
}

// Exact-string replacements; fail loudly if the text has changed since this was written.
const replaceAll = (text, pairs, label) =>
  pairs.reduce((acc, [from, to]) => {
    if (!acc.includes(from)) throw new Error(`${label}: text not found: "${from}"`)
    return acc.replace(from, to)
  }, text)

const description = replaceAll(listing.description, [
  ['Нова намалена цена: €189 000 (без паркоместата)', 'Нова намалена цена: €180 000 (без паркоместата)'],
], 'description')

const descriptionEn = replaceAll(listing.descriptionEn, [
  ['New reduced price: €189,000 (parking spaces not included)', 'New reduced price: €180,000 (parking spaces not included)'],
], 'descriptionEn')

await client
  .patch(listing._id)
  .set({ price: '180000', description, descriptionEn })
  .commit()

console.log('✅ NK-1053 updated: price €180 000 (BG + EN).')
