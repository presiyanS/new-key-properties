/**
 * Detects floor-plan images (square/near-square aspect ratio) and moves them
 * to the end of each listing's externalImageUrls array.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/fix-image-order.mjs
 * Add --dry-run to preview changes without saving.
 */

import { createClient } from '@sanity/client'

const DRY_RUN = process.argv.includes('--dry-run')

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function fetchPartial(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
  const ab = await res.arrayBuffer()
  return Buffer.from(ab)
}

function getPngDimensions(buf) {
  // PNG signature is 8 bytes, then IHDR chunk: 4 length + 4 type + 4 width + 4 height
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    const w = buf.readUInt32BE(16)
    const h = buf.readUInt32BE(20)
    return { w, h }
  }
  return null
}

function getJpegDimensions(buf) {
  let i = 2 // skip SOI marker
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) break
    const marker = buf[i + 1]
    const len = buf.readUInt16BE(i + 2)
    // SOF markers: 0xC0–0xC3, 0xC5–0xC7, 0xC9–0xCB, 0xCD–0xCF
    if ((marker >= 0xc0 && marker <= 0xcf) && marker !== 0xc4 && marker !== 0xcc) {
      const h = buf.readUInt16BE(i + 5)
      const w = buf.readUInt16BE(i + 7)
      return { w, h }
    }
    i += 2 + len
  }
  return null
}

async function getAspectRatio(url) {
  try {
    const buf = await fetchPartial(url)
    const dims = getPngDimensions(buf) ?? getJpegDimensions(buf)
    if (!dims) return null
    return dims.w / dims.h
  } catch {
    return null
  }
}

// A ratio close to 1 (square) = likely floor plan
// Real photos are typically 4:3 (1.33), 3:2 (1.5), or 16:9 (1.78)
function isFloorPlan(ratio) {
  if (ratio === null) return false
  return ratio < 1.15 // square or portrait = floor plan
}

async function run() {
  const listings = await client.fetch(
    `*[_type == "listing" && defined(externalImageUrls) && count(externalImageUrls) > 1]{_id, title, externalImageUrls}`
  )

  console.log(`\nChecking ${listings.length} listings...\n`)

  let fixed = 0

  for (const listing of listings) {
    const urls = listing.externalImageUrls
    const firstRatio = await getAspectRatio(urls[0])

    if (!isFloorPlan(firstRatio)) {
      console.log(`✅  ${listing.title.substring(0, 45)} — first image OK (ratio: ${firstRatio?.toFixed(2) ?? 'unknown'})`)
      continue
    }

    // Find the first non-floor-plan image
    let swapIndex = -1
    for (let i = 1; i < urls.length; i++) {
      const r = await getAspectRatio(urls[i])
      if (!isFloorPlan(r)) {
        swapIndex = i
        break
      }
    }

    if (swapIndex === -1) {
      console.log(`⚠️   ${listing.title.substring(0, 45)} — all images look like floor plans, skipping`)
      continue
    }

    // Move all floor-plan images to the end
    const floorPlans = []
    const realPhotos = []
    for (let i = 0; i < urls.length; i++) {
      const r = await getAspectRatio(urls[i])
      if (isFloorPlan(r)) floorPlans.push(urls[i])
      else realPhotos.push(urls[i])
    }

    const reordered = [...realPhotos, ...floorPlans]

    console.log(`🔄  ${listing.title.substring(0, 45)} — moved ${floorPlans.length} floor plan(s) to end`)

    if (!DRY_RUN) {
      await client.patch(listing._id).set({ externalImageUrls: reordered }).commit()
    }

    fixed++
  }

  console.log(`\n${DRY_RUN ? '[DRY RUN] Would fix' : '✅  Fixed'} ${fixed} listing(s).`)
}

run().catch(console.error)
