/**
 * Republishes the Hadzhi Dimitar listing (NK-1052) with watermarked photos,
 * replacing the draft's images and moving it back to the live site.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/republish-hadzhi-dimitar-watermarked.mjs
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
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (4)-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (20)-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 15.56.45 (19)-nkp.png',
  '/Users/presiyansokolov/Downloads/hadzhi dimitar-nkp.png',
  '/Users/presiyansokolov/Downloads/wide_angle_interior_photograph_of_the_same_bedroom-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.06.07-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.06.06-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-16 at 14.07.05-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.33.09-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.34.03-nkp.png',
  '/Users/presiyansokolov/Downloads/WhatsApp Image 2026-09-14 at 21.03.35-nkp.png',
]

console.log('Uploading watermarked images...')
const imageAssets = []
for (const imgPath of imagePaths) {
  const filename = path.basename(imgPath)
  const buffer = fs.readFileSync(imgPath)
  const asset = await client.assets.upload('image', buffer, { filename, contentType: 'image/png' })
  imageAssets.push(asset)
  console.log(`✅ Uploaded: ${filename} → ${asset._id}`)
}

const publishedId = '9uJyLAmDiZnW9HXrSjMoOu'
const draftId = `drafts.${publishedId}`

const draft = await client.fetch(`*[_id == $draftId][0]`, { draftId })
if (!draft) {
  console.error(`❌  Draft ${draftId} not found. Was NK-1052 already published or deleted?`)
  process.exit(1)
}

const publishedDoc = {
  ...draft,
  _id: publishedId,
  images: imageAssets.map((asset) => ({
    _type: 'image',
    _key: asset._id,
    asset: { _type: 'reference', _ref: asset._id },
  })),
}

console.log('\nRepublishing with watermarked photos...')
await client.transaction().createOrReplace(publishedDoc).delete(draftId).commit()

console.log(`✅ NK-1052 is live again with watermarked photos.`)
console.log(`\n🌐 Live URL: https://www.newkey.bg/listings/${publishedId}`)
