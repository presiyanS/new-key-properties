/**
 * 1) Updates the English description of the Druzhba 2 garage (NK-1001) to match
 *    the revised Bulgarian text.
 * 2) Deletes the two Sozopol apartments (NK-1026, NK-1027) and the Hipodruma
 *    rental (NK-1050, which only existed as a draft). A JSON backup of every
 *    deleted document is written first so they can be restored if needed.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/update-garage-en-remove-sozopol-hipodruma.mjs [backupDir]
 */

import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
  perspective: 'raw',
})

const GARAGE_ID = '2mY9uloSfyIoI02t77GvIS'
const DESCRIPTION_EN =
  'A large underground garage (No. 8, 33.23 sq.m) in a newly built building. Allows for the installation of an EV charging station. Suitable for personal use or as an investment. Act 16 expected by the end of the year.'

const TO_DELETE = [
  '2mY9uloSfyIoI02t77Gxqg',        // NK-1026 Sozopol 70 sq.m
  'o3mQPUBUBxVVo14n0jm6RQ',        // NK-1027 Sozopol 75 sq.m
  'drafts.GAQq4ZGeWhT4W8RVOIFJAN', // NK-1050 Hipodruma rental (draft only)
]

// Include any draft/published twin so nothing is left behind in Studio.
const ids = [...new Set(TO_DELETE.flatMap((id) => {
  const base = id.replace(/^drafts\./, '')
  return [base, `drafts.${base}`]
}))]
const docs = await client.fetch(`*[_id in $ids]`, { ids })

const backupDir = process.argv[2] || '.'
const backupPath = join(backupDir, `deleted-listings-backup-${Date.now()}.json`)
writeFileSync(backupPath, JSON.stringify(docs, null, 2))
console.log(`💾 Backup of ${docs.length} document(s) → ${backupPath}`)

const tx = client.transaction().patch(GARAGE_ID, (p) => p.set({ descriptionEn: DESCRIPTION_EN }))
for (const d of docs) tx.delete(d._id)
await tx.commit()

console.log('✅ NK-1001 English description updated.')
for (const d of docs) console.log(`🗑️  Deleted ${d.code} (${d._id}) - ${d.title}`)
