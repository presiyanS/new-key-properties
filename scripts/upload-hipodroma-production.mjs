/**
 * Uploads тристаен апартамент — Хиподрума (rental) to production.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-hipodroma-production.mjs
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
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/1_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/2.png',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/3.png',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/3_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/4_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/5_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/6_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/7_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/8_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/9_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/10_converted.jpg',
  '/Users/presiyansokolov/Downloads/drive-download-20260622T063910Z-3-001/11_converted.jpg',
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

const description = `New Key Properties отдава под наем луксозен и просторен тристаен в ж.к. Хиподрума.

Апартаментът се намира в ЕПК от края на 70. години с контролиран достъп и добре поддържани общи части. Етаж 2. от 14. В непосредствена близост до детска площадка, няколко детски градини, училища, спирки на градския транспорт (метростанция Красно село е на 500 м.), множество магазини и ресторанти, медицински и болнични заведения.

Разпределение: голям Г-образен коридор, дневна, отделна трапезария и кухненски бокс, голяма спалня, втора стая, баня с тоалетна, отделна тоалетна, мокро помещение и две големи остъклени тераси.

Апартаментът е стилно обзаведен.

Наем: 850 евро.`

const listing = {
  _type: 'listing',
  title: 'Тристаен апартамент — Хиподрума',
  type: 'rent',
  price: '850',
  rooms: '3',
  floor: '2',
  neighborhood: 'Хиподрума',
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
