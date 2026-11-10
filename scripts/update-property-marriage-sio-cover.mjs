/**
 * Replaces the cover photo of the "buying property while married" post
 * (1a832ee548e346f6bf4ae6df): Mladost panel blocks -> a historic residential
 * building in central Sofia (Wikimedia Commons, CC BY-SA 3.0), at Presiyan's
 * request on 2026-11-10. Rollback: set externalImageUrl back to
 * https://upload.wikimedia.org/wikipedia/commons/b/b0/Mladost_Sofia_Bulgaria_-_panoramio.jpg
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/update-property-marriage-sio-cover.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({ projectId: '9gz26s06', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false })

await client
  .patch('1a832ee548e346f6bf4ae6df')
  .set({ externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Sofia_-_panoramio_-_zonemars_%2814%29.jpg' })
  .commit()
console.log('✅  Cover photo updated')
