/**
 * Swaps the rental-yield post's image - the original pick (Sofia_skyline.jpg)
 * turned out to already be reused on 3 other posts. Checked every image URL
 * currently used across all 21 blog posts and picked one not used anywhere
 * else: a Sofia city-center square photo (Wikimedia Commons, CC BY 3.0).
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node update-rental-yield-post-image.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const id = 'f4a8f75e0e63d90764ce57eb'
const newImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Sofia_Center%2C_1000_Sofia%2C_Bulgaria_-_panoramio_%2861%29.jpg'

const updated = await client.patch(id).set({ externalImageUrl: newImageUrl }).commit()
console.log('✅  Updated image for blog post:', updated._id, '->', newImageUrl)
