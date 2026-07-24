/**
 * Uploads Apartment Б15 (Малинова Долина) to production.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-b15-production.mjs
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
  '/Users/presiyansokolov/Downloads/Ап. Б15.png',
  '/Users/presiyansokolov/Downloads/PlotArch_blocks_preview.RGB_color_00011 copy.jpg',
  '/Users/presiyansokolov/Downloads/PlotArch_blocks_preview.RGB_color_00014 copy.jpg',
  '/Users/presiyansokolov/Downloads/PlotArch_blocks_preview.RGB_color_00027 copy.jpg',
  '/Users/presiyansokolov/Downloads/PlotArch_blocks_preview.RGB_color_00028 copy.jpg',
]

console.log('Uploading images to production...')

const imageAssets = []
for (const imgPath of imagePaths) {
  const filename = path.basename(imgPath)
  const ext = path.extname(imgPath).toLowerCase()
  const contentType = ext === '.png' ? 'image/png' : 'image/jpeg'
  const buffer = fs.readFileSync(imgPath)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  })
  imageAssets.push(asset)
  console.log(`✅ Uploaded: ${filename} → ${asset._id}`)
}

const description = `Апартаментът е двустаен, разположен на първи етаж. Застроената площ на апартамента е 79,93 кв.м., а общата площ е 90,79 кв.м. Състои се от преддверие, голяма дневна (36,91 кв.м.) с обособена кухненска част, просторна спалня, баня с тоалетна, малко складово помещение и тераса. Изложението е юг и запад, като дневната гледа на юг и запад, а спалнята на юг.
Апартаментът е много просторен и светъл.

Цена – 196 106 евро

Апартаментът се предава по следния начин:
Подове - циментова замазка за спални, дневни, бани, санитарни възли, коридор, антре, килер. Нивелирана, за постигане на равна и гладка повърхност, без финишно покритие.
Тавани - положена гипсова шпакловка с монтирани ръбохранители по всички външни ъгли (опция за окачен таван от гипсокартон).
Врати - входни блиндирани врати; без монтирани интериорни врати.
ВиК инсталации - ВиК изводи на тапа за мивка, миялна машина, пералня, сушилня към кухня и килер;
ОВК инсталации - моно сплит система, като във всяка стая на апартаментите се предвижда вътрешно и външно тяло. От колекторното табло се пускат РЕX тръби за захранване на радиаторите във всяка стая.
Газова инсталация - Съгласно проекта по Газоснабдяване се изпълнява инсталация от медни тръби (твърда мед) и от общите части на всяка етажна площадка до газовия котел, намиращ се на терасите. От котела се изпълняват PPR тръби до колекторната кутия.
Ел. инсталация - завършена, окомплектована съгласно българските стандарти, с ключове и контакти, изградено апартаментно табло с автоматични предпазители и дефектнотокова защита, изводи за осветителни тела.
Инсталация за кабелна телевизия, Internet.
Окабеляване и захранващ блок за видео-домофонна уредба с възможност за отваряне на електрическа брава на входна врата; система за контрол на достъпа на входни врати на сградите.`

const listing = {
  _type: 'listing',
  title: 'Двустаен апартамент Б15 — Малинова Долина',
  type: 'sale',
  price: '196106',
  area: '90.79',
  rooms: '2',
  floor: '1',
  neighborhood: 'Малинова Долина',
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
