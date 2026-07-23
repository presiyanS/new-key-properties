import { createClient } from '@sanity/client'
import fs from 'fs'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const filePath = new URL('../public/team/alexander-sokolov.jpg', import.meta.url)
const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
  filename: 'alexander-sokolov.jpg',
})

const patched = await client
  .patch('2mY9uloSfyIoI02t77B448') // teamMember: Александър Соколов
  .set({ image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
  .commit()

console.log('✅  Uploaded asset', asset._id, 'and patched teamMember', patched._id)
