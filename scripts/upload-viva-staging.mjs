/**
 * Uploads 4 VIVA apartments to staging.
 * Each listing: building view (cover) + apartment floor plan image.
 * Usage: SANITY_TOKEN=<token> node scripts/upload-viva-staging.mjs
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
  dataset: 'staging',
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

console.log('Uploading building view images...')
const view01 = await uploadImage('/tmp/viva-upload/VIVA/VIEW 01_result.jpg', 'VIVA_VIEW_01.jpg')
const view02 = await uploadImage('/tmp/viva-upload/VIVA/VIEW 02_result.jpg', 'VIVA_VIEW_02.jpg')
const view03 = await uploadImage('/tmp/viva-upload/VIVA/VIEW 03_result.jpg', 'VIVA_VIEW_03.jpg')

console.log('Uploading apartment floor plan images...')
const aptA2  = await uploadImage('/tmp/viva-upload/VIVA/A2.png',  'VIVA_A2.png',  'image/png')
const aptA18 = await uploadImage('/tmp/viva-upload/VIVA/A18.png', 'VIVA_A18.png', 'image/png')
const aptA40 = await uploadImage('/tmp/viva-upload/VIVA/A40.png', 'VIVA_A40.png', 'image/png')
const aptA51 = await uploadImage('/tmp/viva-upload/VIVA/A51.png', 'VIVA_A51.png', 'image/png')

const buildingDescription = `Тухлена зидария: външни стени — керамична тухла Wienerberger Porotherm 25 см; вътрешни стени — керамична тухла Wienerberger Porotherm 12 см. Фасадна система: BAUMIT с топлоизолация 12 см / окачена фасада от алуминиеви профили. Апартаменти: под — циментова замазка, стени и тавани — гипсова мазилка; монтирана входна блиндирана врата с падащ праг и MDF фурнир. Дограма: алуминиев профил „ETEM", система Е75 с прекъснат термомост и троен стъклопакет — отлична енергийна ефективност, дълготрайност и шумоизолация. Отопление: подово отопление на газ, разводки за монтаж на газово котле и климатици. Асансьори: 2 бр. за 8 лица — „KONE", електрически с автоматични врати, луксозен интериор. Общи части: луксозна и съвременна визия с декоративно осветление, подови настилки — камък, стенни облицовки по интериорен проект.

Етап на строителство: Акт 14.
Очаквани срокове: Акт 15 — Март 2027 г.; Акт 16 — Септември 2027 г.

Налични за продажба в сградата:
• Двустайни апартаменти (от 60,63 кв.м.) — от €230 500; 15 свободни.
• Тристайни апартаменти (от 104,49 кв.м.) — от €373 000; 13 свободни.
• Много стайни апартаменти (от 143,08 кв.м.) — от €496 000; 6 свободни.
• Паркоместа и гаражи (12,50 кв.м.) — от €23 500; 51 свободни.`

function makeImages(coverAsset, aptAsset) {
  return [
    { _type: 'image', _key: coverAsset._id, asset: { _type: 'reference', _ref: coverAsset._id } },
    { _type: 'image', _key: aptAsset._id,   asset: { _type: 'reference', _ref: aptAsset._id } },
  ]
}

const listings = [
  {
    title: 'Тристаен апартамент, Манастирски ливади - запад — Ап. 2',
    type: 'sale',
    price: '373000',
    area: '105.91',
    rooms: '3',
    floor: '1',
    neighborhood: 'Манастирски ливади - запад',
    constructionAct: 'act14',
    description: `Апартамент 2 е тристаен, разположен на първи етаж (над партер). Жилищната площ е 94,20 кв.м., а общата площ е 105,91 кв.м. Състои се от преддверие, просторна (30,5 кв.м.) дневна с обособена кухненска част, родителска спалня със собствена баня, втора спалня, баня с тоалетна и тераса. Изложението е изток и юг — дневната гледа на изток и юг, едната спалня на изток, другата на юг. Апартаментът е много просторен и светъл.\n\n${buildingDescription}`,
    images: makeImages(view01, aptA2),
  },
  {
    title: 'Тристаен апартамент, Манастирски ливади - запад — Ап. 18',
    type: 'sale',
    price: '383500',
    area: '110.49',
    rooms: '3',
    floor: '3',
    neighborhood: 'Манастирски ливади - запад',
    constructionAct: 'act14',
    description: `Апартамент 18 е тристаен, разположен на трети етаж (втори над партер). Жилищната площ е 98,27 кв.м., а общата площ е 110,49 кв.м. Състои се от Г-образно преддверие, голяма (35,2 кв.м.) дневна с обособена кухненска част, родителска спалня със собствена баня, втора спалня, баня с тоалетна и тераса. Изложението е изток и север — дневната гледа на изток и север, едната спалня на изток, другата на север.\n\n${buildingDescription}`,
    images: makeImages(view02, aptA18),
  },
  {
    title: 'Двустаен апартамент, Манастирски ливади - запад — Ап. 40',
    type: 'sale',
    price: '246000',
    area: '69.52',
    rooms: '2',
    floor: '5',
    neighborhood: 'Манастирски ливади - запад',
    constructionAct: 'act14',
    description: `Апартамент 40 е двустаен, разположен на пети етаж (четвърти над партер). Жилищната площ е 61,83 кв.м., а общата площ е 69,52 кв.м. Състои се от коридор, функционална дневна с обособена кухненска част, спалня, баня с тоалетна и тераса. Изложението е изток.\n\n${buildingDescription}`,
    images: makeImages(view03, aptA40),
  },
  {
    title: 'Двустаен апартамент, Манастирски ливади - запад — Ап. 51',
    type: 'sale',
    price: '248000',
    area: '64.16',
    rooms: '2',
    floor: '7',
    neighborhood: 'Манастирски ливади - запад',
    constructionAct: 'act14',
    description: `Апартамент 51 е двустаен, разположен на седми етаж (шести над партер). Жилищната площ е 57,07 кв.м., а общата площ е 64,16 кв.м. Състои се от коридор, функционална дневна с обособена кухненска част, спалня, баня с тоалетна и тераса. Изложението е изток.\n\n${buildingDescription}`,
    images: makeImages(view02, aptA51),
  },
]

console.log('\nCreating listings in staging...')
for (const listing of listings) {
  const { images, ...rest } = listing
  const created = await client.create({
    _type: 'listing',
    featured: false,
    ...rest,
    images,
  })
  console.log(`✅ ${listing.title}`)
  console.log(`   https://new-key-properties-git-staging-presiyans-projects-e2f8b3d2.vercel.app/listings/${created._id}`)
}

console.log('\nDone!')
