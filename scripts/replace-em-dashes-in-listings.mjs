/**
 * Replaces the long dash "—" with a short hyphen "-" in listing titles and
 * descriptions (BG + EN), per the house style. Writes a JSON backup of every
 * changed field first. Dry run by default; pass --apply to write.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/replace-em-dashes-in-listings.mjs [--apply] [backupDir]
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
  perspective: 'raw', // include drafts so a later Publish doesn't bring the dashes back
})

const FIELDS = ['title', 'titleEn', 'description', 'descriptionEn']
const apply = process.argv.includes('--apply')
const backupDir = process.argv.filter((a) => !a.startsWith('--'))[2] || '.'

const docs = await client.fetch(`*[_type == "listing"]{ _id, code, ${FIELDS.join(', ')} }`)
const changes = []
for (const d of docs) {
  const set = {}
  for (const f of FIELDS) if (typeof d[f] === 'string' && d[f].includes('—')) set[f] = d[f].replaceAll('—', '-')
  if (Object.keys(set).length) changes.push({ _id: d._id, code: d.code, before: Object.fromEntries(Object.keys(set).map((f) => [f, d[f]])), set })
}

console.log(`${changes.length} listing document(s) to update, ${changes.reduce((n, c) => n + Object.keys(c.set).length, 0)} field(s).`)
for (const c of changes.slice(0, 3)) console.log(`  ${c.code}: "${c.before.title ?? c.before.titleEn}" → "${c.set.title ?? c.set.titleEn}"`)

if (!apply) { console.log('Dry run - nothing written. Re-run with --apply.'); process.exit(0) }

const backupPath = join(backupDir, `em-dash-backup-${Date.now()}.json`)
writeFileSync(backupPath, JSON.stringify(changes.map(({ _id, code, before }) => ({ _id, code, before })), null, 2))
console.log(`💾 Backup → ${backupPath}`)

const tx = client.transaction()
for (const c of changes) tx.patch(c._id, (p) => p.set(c.set))
await tx.commit()
console.log(`✅ Updated ${changes.length} document(s).`)
