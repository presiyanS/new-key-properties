/**
 * One-off patch for the Strelbishte listing (NK-1051):
 * - fixes the "юзозапад" typo to "югозапад" in the description
 * - uploads the video tour and attaches it to the listing
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/fix-strelbishte-typo-add-video.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'

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

const listingId = 'me1YO2PbyNCFsdk3O6UJL6'
const videoPath = '/Users/presiyansokolov/Downloads/NKP - Стрелбище - Watermarked - Vertical_1.mp4'

const listing = await client.fetch(`*[_id == $id][0]{ description }`, { id: listingId })
if (!listing) {
  console.error(`❌  Listing ${listingId} not found.`)
  process.exit(1)
}

const fixedDescription = listing.description.replace('юзозапад', 'югозапад')

console.log('Uploading video...')
const buffer = fs.readFileSync(videoPath)
const videoAsset = await client.assets.upload('file', buffer, {
  filename: 'nkp-strelbishte-video-tour.mp4',
  contentType: 'video/mp4',
})
console.log(`✅ Uploaded video → ${videoAsset._id}`)

await client
  .patch(listingId)
  .set({
    description: fixedDescription,
    video: { _type: 'file', asset: { _type: 'reference', _ref: videoAsset._id } },
  })
  .commit()

console.log(`✅ Listing ${listingId} patched: typo fixed, video attached.`)
