/**
 * Uploads the SoHome Residential Park listing to production.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-sohome-production.mjs
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
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const imagePaths = [
  '/tmp/sohome-upload/SoHome/38_small.jpg',
  '/tmp/sohome-upload/SoHome/4.jpg',
  '/tmp/sohome-upload/SoHome/1-1.jpg',
]

console.log('Uploading images to production...')

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

const description = `SoHome Residential Park е мащабен жилищен комплекс в район Лозенец, гр. София, ул. „Сребърна" 27 — непосредствено до Ловен парк и Зоологическата градина.

В комплекса са проектирани:
• 841 апартамента
• Ресторант-градина
• Детски център със занималня
• Фитнес център с уелнес зона
• 18 хранителни и нехранителни търговски обекта
• 9 детски площадки и зони за отдих
• 1188 подземни гаражи и паркоместа

Паркова среда: 30 дка паркове, градини, водни огледала, фонтани и открит детски фитнес.

Конструкция и материали:
Фасада: вентилируема с алуминиева конструкция, облицована с клинкерни плочи ABC – Klinkergruppe, изолация с 10 см каширана каменно-минерална вата с пародифузна и ветрозащитна мембрана. Дограма: алуминиева система Schüco AWS 75 SI със скрит обков. Стъклопакет: троен 46 мм стъкло Guardian Glass.

Отопление и охлаждане: индивидуална термопомпа въздух-вода Toshiba; водно подово отопление монтирано във всяка стая. Асансьори: безшумни, електрически Schindler.

Сигурност: контролиран достъп, видеонаблюдение и мобилен патрул 24/7. Управление и поддръжка от фирма, контролирана от инвеститора.

Подземен паркинг: изцяло подземен на 2 нива — без движение на автомобили във вътрешния двор.

Налични за продажба: тристайни и четиристайни апартаменти.

Етапи на строителство:
• Етап 1 — въведен в експлоатация Юли 2022 г. (сгради 6, 7, 8 и 9)
• Етап 2 — въведен в експлоатация Април 2024 г. (сгради 1, 2, 3, 4, 5 и 10)
• Етап 3 — сгради 11, 12, 13 (в процес на изграждане)`

const listing = {
  _type: 'listing',
  title: 'SoHome Residential Park',
  type: 'sale',
  price: 'По запитване',
  neighborhood: 'Лозенец',
  description,
  featured: false,
  images: imageAssets.map((asset) => ({
    _type: 'image',
    _key: asset._id,
    asset: { _type: 'reference', _ref: asset._id },
  })),
}

console.log('\nCreating listing in production...')
const created = await client.create(listing)
console.log(`✅ Listing created: ${created._id}`)
console.log(`\n🌐 Live URL: https://www.newkey.bg/listings/${created._id}`)
