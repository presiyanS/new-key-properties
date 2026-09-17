/**
 * Uploads the Hadzhi Dimitar four-room apartment to production, marked as featured/recommended.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/upload-hadzhi-dimitar-production.mjs
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
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (4).jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (3).jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.06.06.jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (19).jpeg',
  '/Users/presiyansokolov/Downloads/hadzhi dimitar.png',
  '/Users/presiyansokolov/Downloads/wide_angle_interior_photograph_of_the_same_bedroom.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.06.07.jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.07.05.jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.33.09.jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.34.03.jpeg',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.03.35.jpeg',
]

console.log('Uploading images to production...')

const imageAssets = []
for (const imgPath of imagePaths) {
  const filename = path.basename(imgPath)
  const buffer = fs.readFileSync(imgPath)
  const contentType = filename.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
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

const description = `New Key Properties предлага за продажба просторен четиристаен непреходен апартамент в ж.к. Хаджи Димитър.
Апартаментът е с чиста жилищна площ 110 кв.м, към който има и прилежащо мазе с площ 8 кв.м. Жилището се намира на пети етаж в добре поддържана сграда само с два апартамента на етаж.
Разпределението включва просторна дневна (хол) с площ около 21 кв.м, три самостоятелни спални, отделна кухня, баня, отделна тоалетна, мокро помещение и три тераси, осигуряващи отлична светлина и удобство.
На апартамента е направен цялостен основен ремонт с материали от най-висок клас и луксозно изпълнени довършителни работи. Метална входна врата с вградена камера, интериорни врати от масивна естествена дървесина, външни ролетни щори и висок клас външна изолация.
Жилището е стилно обзаведено и напълно оборудвано - мебелите в кухнята и хола са от масивна естествена дървесина, а електроуредите са висок клас. Мебелите в спалните са изработени по поръчка. Готов за незабавно нанасяне или за отдаване под наем без допълнителни разходи.
Локацията е изключително удобна - в близост до градски транспорт, магазини, училища, детски градини, с бърз достъп до центъра на София.
Имотът е отличен избор както за просторно семейно жилище, така и за инвестиция с цел отдаване под наем.
Работим с ограничен брой клиенти на месец, за да гарантираме индивидуално внимание и коректна информация на всеки етап от сделката.
Цена: €359 000
За оглед и повече информация се свържете с нас: 0879 826 292 | office@newkey.bg
New Key Properties - защото Вашият имот заслужава честност.`

const descriptionEn = `New Key Properties is offering for sale a spacious four-room apartment with no pass-through rooms in the Hadzhi Dimitar district.
The apartment has a net living area of 110 sq.m, plus an adjoining basement storage room of 8 sq.m. It is located on the 5th floor of a well-maintained building with only two apartments per floor.
The layout includes a spacious living room of about 21 sq.m, three separate bedrooms, a separate kitchen, a bathroom, a separate toilet, a utility room, and three terraces providing excellent light and comfort.
The apartment has undergone a complete major renovation, using top-class materials and luxuriously executed finishing work. It features a metal entry door with a built-in camera, solid natural wood interior doors, external roller shutters, and high-grade exterior insulation.
The home is stylishly furnished and fully equipped - the kitchen and living room furniture is made of solid natural wood, and the appliances are high-end. The bedroom furniture was custom-made. Ready for immediate move-in or for renting out with no additional costs.
The location is extremely convenient - close to public transport, shops, schools, and kindergartens, with quick access to the center of Sofia.
The property is an excellent choice both as a spacious family home and as a rental investment.
We work with a limited number of clients per month, to guarantee individual attention and accurate information at every stage of the deal.
Price: €359,000
For viewings and more information, contact us: 0879 826 292 | office@newkey.bg
New Key Properties - because your property deserves honesty.`

const listing = {
  _type: 'listing',
  code,
  title: 'Четиристаен апартамент, Хаджи Димитър',
  titleEn: 'Four-room apartment, Hadzhi Dimitar',
  type: 'sale',
  category: 'apartment',
  price: '359000',
  area: '110',
  rooms: '4',
  floor: '5',
  neighborhood: 'Хаджи Димитър',
  description,
  descriptionEn,
  features: [
    'Луксозен ремонт',
    'Готов за нанасяне',
    'Мазе 8 кв.м',
    'Три тераси',
    'Само два апартамента на етаж',
    'Метална врата с камера',
  ],
  featuresEn: [
    'Luxury renovation',
    'Move-in ready',
    '8 sq.m basement storage',
    'Three terraces',
    'Only two apartments per floor',
    'Metal door with built-in camera',
  ],
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
