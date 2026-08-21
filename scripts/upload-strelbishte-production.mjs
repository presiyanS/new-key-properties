/**
 * Uploads the Strelbishte three-room apartment to production, marked as featured/recommended.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/upload-strelbishte-production.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

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

const imagePaths = [
  '/Users/presiyansokolov/Downloads/IMG_2521-nkp.png',
  '/Users/presiyansokolov/Downloads/DC7C9176-4C10-4DB6-AEAB-72634A9401C8-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2529-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2544-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2543-nkp.png',
  '/Users/presiyansokolov/Downloads/image-nkp.png',
]

console.log('Uploading images to production...')

const imageAssets = []
for (const imgPath of imagePaths) {
  const filename = path.basename(imgPath)
  const buffer = fs.readFileSync(imgPath)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/png',
  })
  imageAssets.push(asset)
  console.log(`✅ Uploaded: ${filename} → ${asset._id}`)
}

console.log('\nAssigning listing code...')
const existing = await client.fetch(`*[_type == "listing"]{ code }`)
const existingCodes = new Set(existing.map((l) => l.code).filter(Boolean))
let next = 1001
while (existingCodes.has(`NK-${next}`)) next++
const code = `NK-${next}`
console.log(`✅ Code: ${code}`)

const description = `New Key Properties предлага ексклузивно тристаен апартамент в сърцето на ж.к. Стрелбище, само на пет минути пеша от Южен парк.
Апартаментът е с чиста площ 79.36 кв.м. и е разположен на първи (висок) етаж в панелна сграда от началото на 80-те години, с добре поддържани общи части и контролиран достъп. Изложението североизток-юзозапад осигурява слънце сутрин и следобед, без жилището да прегрява през летните месеци.
Разпределението включва Т-образен коридор, светла дневна, две спални, отделна кухня, голяма баня с тоалетна, допълнителна отделна тоалетна, мокро помещенидора.
Локацията е сред силните страни на имота - в непосредствена близост до магазин Фантастико, спирки на градския транспорт, ресторанти, магазини и фитнес зали, а до Южен парк се стига пеша за пет минути.
Работим с ограничен брой клиенти на месец, за да гарантираме индивидуално внимание и коректна информация на всеки етап от сделката.
Цена: €310 000
За оглед и повече информация се свържете с нас: 0879 826 292 | office@newkey.bg
New Key Properties – защото Вашият имот заслужава честност.`

const descriptionEn = `New Key Properties is exclusively offering a three-room apartment in the heart of the Strelbishte district, just a five-minute walk from South Park.
The apartment has a net area of 79.36 sq.m. and is located on the first (elevated) floor of a panel building from the early 1980s, with well-maintained common areas and controlled access. The northeast-southwest exposure lets in sun in the morning and afternoon, without the home overheating during the summer months.
The layout includes a T-shaped hallway, a bright living room, two bedrooms, a separate kitchen, a large bathroom with toilet, an additional separate toilet, and a utility/wet room.
The location is one of the property's strengths — close to the Fantastico store, public transport stops, restaurants, shops, and gyms, with South Park just a five-minute walk away.
We work with a limited number of clients per month, to guarantee individual attention and accurate information at every stage of the deal.
Price: €310,000
For viewings and more information, contact us: 0879 826 292 | office@newkey.bg
New Key Properties – because your property deserves honesty.`

const listing = {
  _type: 'listing',
  code,
  title: 'Тристаен апартамент, Стрелбище',
  titleEn: 'Three-room apartment, Strelbishte',
  type: 'sale',
  category: 'apartment',
  price: '310000',
  area: '79.36',
  rooms: '3',
  floor: '1',
  neighborhood: 'Стрелбище',
  description,
  descriptionEn,
  features: ['Готов за нанасяне'],
  featuresEn: ['Move-in ready'],
  featured: true,
  status: 'active',
  images: imageAssets.map((asset) => ({
    _type: 'image',
    _key: asset._id,
    asset: { _type: 'reference', _ref: asset._id },
  })),
}

console.log('\nCreating listing in production...')
const created = await client.create(listing)
console.log(`✅ Listing created: ${created._id} (${code})`)
console.log(`\n🌐 Live URL: https://www.newkey.bg/listings/${created._id}`)
