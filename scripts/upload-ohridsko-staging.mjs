/**
 * Uploads Комплекс Охридско езеро парк to staging.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-ohridsko-staging.mjs
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
  { file: '/tmp/ohridsko-upload/Охридско езеро/AVG_ Ohridsko_Vol.02 CGI 06.02.jpg', name: 'ohridsko-CGI-06.jpg' },
  { file: '/tmp/ohridsko-upload/Охридско езеро/AVG_ Ohridsko_Vol.02 CGI_AE 02.02.jpg', name: 'ohridsko-CGI-AE-02.jpg' },
  { file: '/tmp/ohridsko-upload/Охридско езеро/Ситуация1 (1).jpg', name: 'ohridsko-situacia.jpg' },
  { file: '/tmp/ohridsko-upload/Охридско езеро/СЕКЦИЯ 1 ФОАЙЕ 04.jpg', name: 'ohridsko-foaje.jpg' },
]

console.log('Uploading images to staging...')

const imageAssets = []
for (const { file, name } of imagePaths) {
  const buffer = fs.readFileSync(file)
  const asset = await client.assets.upload('image', buffer, { filename: name, contentType: 'image/jpeg' })
  imageAssets.push(asset)
  console.log(`✅ ${name} → ${asset._id}`)
}

const description = `Комплекс „Охридско езеро парк" се намира на ул. „Охридско езеро" 3 – на тиха и зелена улица, в близост до центъра на София, с бърз достъп до паркове, метро, училища, детски градини, болници, магазини и всичко необходимо за активния семеен живот. Локацията съчетава спокойствие, сигурност и отлична градска инфраструктура – идеална среда за отглеждане на деца.

Проектът представлява модерен, мащабен жилищен комплекс с разнообразие от апартаменти с 1, 2, 3 и 4 спални, включително жилища със собствен озеленен двор и пентхауси с просторни тераси.

Комплексът разполага с:
• Детска площадка
• Вътрешен пешеходен двор
• Магазини и ресторант-градина
• Подземни и надземни паркоместа
• 24/7 управление и поддръжка

Сградите са изпълнени с висококачествени материали, отлична изолация, енергоефективни системи за отопление и охлаждане и модерна дограма, които гарантират ниски разходи, комфорт и здравословна среда за живот.

„Охридско езеро парк" е създаден като истинска семейна среда – пространство, в което децата имат свобода и сигурност, а родителите – спокойствие, удобство и качество на живот в дългосрочен план.`

const listing = {
  _type: 'listing',
  title: 'Комплекс Охридско езеро парк',
  type: 'sale',
  price: 'По запитване',
  neighborhood: 'Красно село',
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
