/**
 * Updates garage listing (Център, ул. Осогово) from rent to sale in production.
 * Replaces images with new ones and updates all details.
 * Usage: SANITY_TOKEN=<token> node scripts/update-garage-center-to-sale.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'

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

async function uploadImage(filePath, filename, contentType = 'image/jpeg') {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  console.log(`  ✅ ${filename} → ${asset._id}`)
  return asset
}

function makeImage(asset) {
  return { _type: 'image', _key: asset._id, asset: { _type: 'reference', _ref: asset._id } }
}

// Find existing garage listing
console.log('Finding existing garage listing...')
const existing = await client.fetch(
  `*[_type == "listing" && neighborhood == "Център" && title match "Гараж*"][0]{ _id, title, type }`
)

if (!existing) {
  console.error('❌  Could not find existing garage listing. Aborting.')
  process.exit(1)
}
console.log(`  Found: ${existing._id} — "${existing.title}" (${existing.type})`)

// Upload new images
console.log('\nUploading new garage images...')
const img1 = await uploadImage('/Users/presiyansokolov/Downloads/1.png', 'garage_center_sale_1.png', 'image/png')
const img2 = await uploadImage('/Users/presiyansokolov/Downloads/2-2.jpg', 'garage_center_sale_2.jpg', 'image/jpeg')

const description = `Гараж в Центъра на София – ул. Осогово между бул. Тодор Александров и ул. Пиротска.

Площ: 18,30 кв.м.
Самостоятелна партида за електроенергия.
Подходящ за лек автомобил, SUV или миниван.
Вход откъм голям вътрешен двор.

Цена: 52 000 евро.
Само за директни клиенти. Комисиона 1,5%.`

// Patch the existing document
console.log('\nUpdating listing in production...')
const updated = await client
  .patch(existing._id)
  .set({
    title: 'Гараж за продажба, Център – ул. Осогово',
    type: 'sale',
    price: '52000',
    area: '18.30',
    description,
    images: [makeImage(img1), makeImage(img2)],
  })
  .commit()

console.log(`✅ Updated: Гараж за продажба, Център – ул. Осогово`)
console.log(`   https://www.newkey.bg/listings/${updated._id}`)
console.log('\nDone!')
