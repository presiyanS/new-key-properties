/**
 * Uploads the Ovcha Kupel 1 two-room apartment (two parking spaces) to production.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/upload-ovcha-kupel-1-production.mjs
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
  '/Users/presiyansokolov/Downloads/5FE0C931-9E21-4195-8473-D4170ACFE7EC-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2706-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2709-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2712-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2704-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2707-nkp.png',
  '/Users/presiyansokolov/Downloads/IMG_2705-nkp.png',
  '/Users/presiyansokolov/Downloads/ovcha kupel 2-nkp.png',
  '/Users/presiyansokolov/Downloads/ovcha kupel 1-nkp.png',
  '/Users/presiyansokolov/Downloads/ovcha kupel 3-nkp.png',
  '/Users/presiyansokolov/Downloads/ovcha kupel 4-nkp.png',
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

// Mirrors lib/slugify.ts so the slug matches what Studio would auto-generate
// from neighborhood + code (see commit a03aae8 re: the missing-slug gap).
const BG_TO_LATIN = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
  т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht',
  ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
}
const slugify = (text) =>
  text
    .toLowerCase()
    .split('')
    .map((ch) => BG_TO_LATIN[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const slug = slugify(`Овча купел 1 ${code}`)
console.log(`✅ Slug: ${slug}`)

const description = `New Key Properties предлага за продажба 2-стаен апартамент с две паркоместа в ж.к. Овча купел 1.
Апартаментът е със застроена площ 61.39 кв.м. Към него има и прилежащо мазе с площ 2.5 кв.м. и две наземни паркоместа.
Жилището се намира на 2-ри етаж в добре поддържана 6-етажна сграда от 2016 г.
Разпределение: коридор, дневна с обособена кухненска част, спалня, голяма баня с тоалетна, тераса.
Изложението е югоизток (дневна) - северозапад (спалня).
Апартаментът е в много добро състояние и се продава с наличните мебели и оборудване. Блиндирана входна врата. Отлично поддържани общи части. Прокарани инсталации за СОТ и климатик.
Апартаментът е готов за нанасяне или отдаване под наем.
Локацията е изключително удобна - в близост до градски транспорт (метростанция Мизия е на 700 м.), магазини, училища, детски градини. Нов Български Университет е само на 550 м.
Имотът е отличен избор както за жилище, така и за инвестиция с цел отдаване под наем на студенти в НБУ.
Работим с ограничен брой клиенти на месец, за да гарантираме индивидуално внимание и коректна информация на всеки етап от сделката.
Цена: €225 000
За оглед и повече информация се свържете с нас: 0879 826 292 | office@newkey.bg
New Key Properties - защото Вашият имот заслужава честност.`

const descriptionEn = `New Key Properties is offering for sale a 2-room apartment with two parking spaces in the Ovcha Kupel 1 district.
The apartment has a built-up area of 61.39 sq.m, plus an adjoining basement storage room of 2.5 sq.m and two ground-level parking spaces.
It is located on the 2nd floor of a well-maintained 6-storey building built in 2016.
Layout: hallway, living room with an open kitchen area, bedroom, large bathroom with toilet, terrace.
The exposure is southeast (living room) - northwest (bedroom).
The apartment is in very good condition and is sold with the available furniture and equipment. Armored entry door. Excellently maintained common areas. Wiring in place for an alarm system and air conditioning.
The apartment is ready for immediate move-in or for renting out.
The location is extremely convenient - close to public transport (Mizia metro station is 700 m away), shops, schools, and kindergartens. New Bulgarian University is only 550 m away.
The property is an excellent choice both as a home and as an investment for renting out to New Bulgarian University students.
We work with a limited number of clients per month, to guarantee individual attention and accurate information at every stage of the deal.
Price: €225,000
For viewings and more information, contact us: 0879 826 292 | office@newkey.bg
New Key Properties - because your property deserves honesty.`

const listing = {
  _type: 'listing',
  code,
  slug: { _type: 'slug', current: slug },
  title: 'Двустаен апартамент с две паркоместа, Овча купел 1',
  titleEn: 'Two-room apartment with two parking spaces, Ovcha Kupel 1',
  type: 'sale',
  category: 'apartment',
  price: '225000',
  area: '61.39',
  rooms: '2',
  floor: '2',
  totalFloors: 6,
  neighborhood: 'Овча купел 1',
  description,
  descriptionEn,
  features: ['Две паркоместа', 'Мазе', 'Обзаведен', 'Готов за нанасяне', 'Блиндирана врата'],
  featuresEn: ['Two parking spaces', 'Basement storage', 'Furnished', 'Move-in ready', 'Armored door'],
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
console.log(`✅ Listing created: ${created._id} (${code})`)
console.log(`\n🌐 Live URL: https://www.newkey.bg/listings/${created._id}`)
