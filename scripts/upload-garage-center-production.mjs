/**
 * Uploads garage for rent (Център, ул. Осогово) to production.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-garage-center-production.mjs
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

console.log('Uploading garage images...')
const img1 = await uploadImage('/Users/presiyansokolov/Downloads/1.jpg', 'garage_center_1.jpg')
const img2 = await uploadImage('/Users/presiyansokolov/Downloads/garage center.png', 'garage_center_2.png', 'image/png')
const img3 = await uploadImage('/Users/presiyansokolov/Downloads/4.jpg', 'garage_center_3.jpg')
const img4 = await uploadImage('/Users/presiyansokolov/Downloads/3.jpg', 'garage_center_4.jpg')

function makeImage(asset) {
  return { _type: 'image', _key: asset._id, asset: { _type: 'reference', _ref: asset._id } }
}

const description = `Гараж в Центъра на София – ул. Осогово между бул. Тодор Александров и ул. Пиротска.

Площ: 16 кв.м. (2,80 м. × 5,65 м.)
Самостоятелна партида за електроенергия.
Подходящ за лек автомобил, SUV или миниван.
Вход откъм голям вътрешен двор.

Условия:
• Наем: 130 евро/месец
• Договор за минимум 12 месеца
• Авансово плащане: първи наем + един наем депозит

Само за директни клиенти. Комисиона – един месечен наем.`

console.log('\nCreating garage listing in production...')
const created = await client.create({
  _type: 'listing',
  featured: false,
  title: 'Гараж под наем, Център – ул. Осогово',
  type: 'rent',
  price: '130',
  area: '16',
  floor: 'Партер',
  neighborhood: 'Център',
  description,
  images: [makeImage(img1), makeImage(img2), makeImage(img3), makeImage(img4)],
})

console.log(`✅ Гараж под наем, Център – ул. Осогово`)
console.log(`   https://www.newkey.bg/listings/${created._id}`)
console.log('\nDone!')
