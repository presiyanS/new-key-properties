/**
 * One-off patch for the Ovcha Kupel listing (NK-1053), October 2026:
 * price reduced from €225 000 to €189 000. The new price is for the apartment
 * only - the two parking spaces are no longer included and can be bought
 * separately. Updates price, title, description and features (BG + EN).
 * Slug is left unchanged so existing links (and running ads) keep working.
 * Usage: node --env-file=.env.local scripts/update-ovcha-kupel-price-189k.mjs
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
  [
    'предлага за продажба 2-стаен апартамент с две паркоместа в ж.к. Овча купел.',
    'предлага за продажба 2-стаен апартамент в ж.к. Овча купел.',
  ],
  [
    'мазе с площ 2.5 кв.м. и две наземни паркоместа.',
    'мазе с площ 2.5 кв.м.\nОтделно от апартамента могат да бъдат закупени и две наземни паркоместа - свържете се с нас за подробности.',
  ],
  ['Цена: €225 000', 'Нова намалена цена: €189 000 (без паркоместата)'],
], 'description')

const descriptionEn = replaceAll(listing.descriptionEn, [
  [
    'a 2-room apartment with two parking spaces in the Ovcha Kupel district.',
    'a 2-room apartment in the Ovcha Kupel district.',
  ],
  [
    'basement storage room of 2.5 sq.m and two ground-level parking spaces.',
    'basement storage room of 2.5 sq.m.\nTwo ground-level parking spaces can also be purchased separately from the apartment - contact us for details.',
  ],
  ['Price: €225,000', 'New reduced price: €189,000 (parking spaces not included)'],
], 'descriptionEn')

await client
  .patch(listing._id)
  .set({
    price: '189000',
    title: 'Двустаен апартамент, Овча купел - с възможност за две паркоместа',
    titleEn: 'Two-room apartment, Ovcha Kupel - two parking spaces available separately',
    description,
    descriptionEn,
    features: ['Паркоместа (продават се отделно)', 'Мазе', 'Обзаведен', 'Готов за нанасяне', 'Блиндирана врата'],
    featuresEn: ['Parking spaces (sold separately)', 'Basement storage', 'Furnished', 'Move-in ready', 'Armored door'],
  })
  .commit()

console.log('✅ NK-1053 updated: price €189 000, parking spaces marked as sold separately (BG + EN).')
