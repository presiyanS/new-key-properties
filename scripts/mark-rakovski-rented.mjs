/**
 * Marks the Раковски street rental listing as rented (sold=true) so it
 * shows the "Отдадено" ribbon instead of appearing available.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/mark-rakovski-rented.mjs
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

const id = 'o3mQPUBUBxVVo14n0jm6tI'

await client.patch(id).set({ sold: true }).commit()
console.log('✅  Marked as rented:', id)
