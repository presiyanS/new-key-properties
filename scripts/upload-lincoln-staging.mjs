/**
 * Uploads the Lincoln Legacy building listing to staging dataset with local images.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-lincoln-staging.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'staging',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const imagePaths = [
  '/tmp/lincoln-upload/Lincoln Legacy/LINCOLN_VIEW 01_02.jpg',
  '/tmp/lincoln-upload/Lincoln Legacy/LINCOLN_VIEW 02_02.jpg',
  '/tmp/lincoln-upload/Lincoln Legacy/LINCOLN_VIEW 04_02.jpg',
]

console.log('Uploading images to staging...')

const imageAssets = []
for (const imgPath of imagePaths) {
  const filename = path.basename(imgPath)
  const buffer = fs.readFileSync(imgPath)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  imageAssets.push(asset)
  console.log(`✅ Uploaded: ${filename} → ${asset._id}`)
}

const description = `Бутикова луксозна сграда, намираща се в кв. Овча Купел 2, в близост до бул. „Президент Линкълн". Състои се от два сутерена, приземен етаж и осем жилищни етажа. Функционални разпределения с просторни и светли помещения. Общ озеленен двор за всички живущи с кът за отдих.

Налични за продажба:
• Двустайни апартаменти с площ от 64,14 кв.м. ОЗП — от €151 000; 8 свободни апартамента.
• Тристайни апартаменти с площ от 103,57 кв.м. ОЗП — от €217 000; 36 свободни апартамента.
• Четиристайни апартаменти с площ от 166,61 кв.м. ОЗП — от €550 000; 2 свободни апартамента.

Конструкция и материали:
Фасада: окачена фасада с широкоформатни керамични плочи и алуминиеви плоскости. Топлоизолация: 12 см каменна вата. Тухлена зидария — външни стени: керамична тухла Wienerberger Porotherm 25 см; вътрешни стени: керамична тухла Wienerberger Porotherm 12 см. Алуминиева дограма с троен стъклопакет.

Отопление и климатизация: ГАЗ — разводки за монтаж на радиатори и котле; изводи за климатизация/термопомпи.

Асансьори: ORONA за 8 лица — 2 броя.

Общи части: луксозна и съвременна визия, подови настилки — камък, стенни облицовки по интериорен проект.

Двор: богато озеленен с висока растителност, автоматична поливна система.

Етап на строителство: на зелено.
Планирано начало на строителство: Април 2026 г.
Краен планиран срок Акт 16: Юни 2029 г. (общ срок 36–42 месеца).
За проекта е осигурено банково финансиране, което гарантира завършването му в срок.`

const listing = {
  _type: 'listing',
  title: 'Луксозна сграда в Овча Купел 2',
  type: 'sale',
  price: 'По запитване',
  neighborhood: 'Овча Купел 2',
  description,
  featured: false,
  images: imageAssets.map((asset) => ({
    _type: 'image',
    _key: asset._id,
    asset: { _type: 'reference', _ref: asset._id },
  })),
}

console.log('\nCreating listing in staging...')
const created = await client.create(listing)
console.log(`✅ Listing created: ${created._id}`)
console.log(`\n🔗 Staging URL: https://new-key-properties-git-staging-presiyans-projects-e2f8b3d2.vercel.app/listings/${created._id}`)
