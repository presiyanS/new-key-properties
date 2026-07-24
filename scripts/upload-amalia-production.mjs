/**
 * Uploads the Amalia building listing to production dataset with local images.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-amalia-production.mjs
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
  '/tmp/amalia-upload/Amalia/amalia-rend-01.jpg',
  '/tmp/amalia-upload/Amalia/amalia-rend-02.jpg',
  '/tmp/amalia-upload/Amalia/amalia-rend-03.jpg',
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

const description = `Новостояща се жилищна сграда, намираща се в кв. Овча Купел 2, в близост до бул. „Президент Линкълн".

Налични за продажба:
• Двустайни апартаменти с площ от 70,89 кв.м. ОЗП — от €172 500 (включен прилежащ склад); 2 свободни апартамента.
• Тристайни апартаменти с площ от 107,01 кв.м. ОЗП — от €216 700 (включен прилежащ склад); 23 свободни апартамента.
• Офиси с площ от 71,91 кв.м. ОЗП — от €134 200 (включен прилежащ склад); 5 свободни офиса.
• Паркоместа и гаражи (14,40 кв.м.) — от €19 000; 30 свободни единици.

Конструкция и материали:
Тухлена зидария — външни стени: керамична тухла Wienerberger Porotherm 25 см; вътрешни стени: керамична тухла 12 см. Фасада: система Baumit/Ceresit с топлоизолация EPS 12 см. Дограма: ПВЦ, шесткамерен профил, троен стъклопакет, немски производител.

Апартаменти: циментова замазка под, гипсова мазилка стени/тавани, блиндирана входна врата с MDF фурнир и падащ праг, гранитогрес на тераси. Издава се на мазилка и замазка, без интериорни врати.

Гаражи: автоматична гаражна врата, шлайфан бетон под, мазилка на вароциментова основа.

Отопление и климатизация: ТЕЦ — изградена разводна и сградна инсталация; алуминиеви радиатори; изводи за климатизация/термопомпи.

Асансьори: 1 бр. във всеки вход, за 8 лица, електрически „ORONA".

Общи части: гипсова шпакловка и латекс по стени/тавани, гранит/гранитогрес под, метален парапет, по интериорен проект.

Етап на строителство: Акт 14.
Очаквани срокове: Акт 15 — Септември 2027 г.; Акт 16 — Февруари 2028 г.`

const listing = {
  _type: 'listing',
  title: 'Жилищна сграда в Овча Купел 2',
  type: 'sale',
  price: 'По запитване',
  neighborhood: 'Овча Купел 2',
  constructionAct: 'act14',
  description,
  featured: false,
  status: 'active',
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
