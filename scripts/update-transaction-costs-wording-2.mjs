/**
 * Second pass of update-transaction-costs-wording.mjs, for two more posts
 * whose buyer-cost figures didn't match the 2026-10-19 purchase-costs post:
 * - 2025-01-20 kak-da-kupim-imot-bez-greshki: "notary fees around 3-4%" was
 *   wrong (the tariff gives ~0.3-0.4%), and the transfer tax in Sofia is 3%,
 *   not "2-3%".
 * - 2026-08-31 propuski-kupuvachi: "3% to 6%" (EUR 4,500-9,000 on EUR 150,000)
 *   replaced with the legally set ~3.5% (about EUR 5,200-5,350 incl. notary
 *   VAT; see the worked example in researchNotes of the purchase-costs post).
 *
 * Each edit is an exact find-and-replace; the script stops without writing
 * anything if any old text isn't found exactly once.
 *
 * Rollback: swap `from`/`to` below and re-run.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/update-transaction-costs-wording-2.mjs
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

const edits = [
  {
    id: 'o3mQPUBUBxVVo14n0jYWDc', // 2025-01-20 kak-da-kupim-imot-bez-greshki
    field: 'content',
    from: 'Включете всички разходи: цена, нотариални такси (около 3–4%), данък придобиване (около 2–3%), агентска комисионна.',
    to: 'Включете всички разходи: цена, местен данък при придобиване (3% в София), нотариална такса и такса за вписване (заедно под 1%), агентска комисионна.',
  },
  {
    id: 'o3mQPUBUBxVVo14n0jYWDc',
    field: 'contentEn',
    from: 'Include all costs: purchase price, notary fees (around 3–4%), transfer tax (around 2–3%), and agency commission.',
    to: 'Include all costs: purchase price, local transfer tax (3% in Sofia), notary fee and registration fee (together under 1%), and agency commission.',
  },
  {
    id: 'market-post-2026-08-31-01dd928d', // 2026-08-31 propuski-kupuvachi
    field: 'content',
    from: 'Освен цената на имота, купувачът обичайно плаща местен данък за придобиване, нотариална такса, такса за вписване в Агенцията по вписванията и юридически такси - общо между 3% и 6% от стойността на имота, отделно от самия кредит. При имот за 150 000 евро това са между 4 500 и 9 000 евро в брой, които трябва да са на разположение в деня на сделката, а не "някак си после".',
    to: 'Освен цената на имота, купувачът обичайно плаща местен данък за придобиване, нотариална такса и такса за вписване в Агенцията по вписванията - в София общо около 3,5% от стойността на имота, отделно от самия кредит. При имот за 150 000 евро това са около 5 200-5 350 евро в брой, които трябва да са на разположение в деня на сделката, а не "някак си после". Ако ползвате юридическа помощ, предвидете и нейната цена.',
  },
  {
    id: 'market-post-2026-08-31-01dd928d',
    field: 'contentEn',
    from: 'Besides the property price, a buyer typically pays a local property-transfer tax, a notary fee, a registration fee with the Registry Agency, and legal fees - together roughly 3% to 6% of the property\'s value, separate from the loan itself. On a €150,000 property, that is between €4,500 and €9,000 in cash that must be available on the day of the deal, not "figured out somehow later."',
    to: 'Besides the property price, a buyer typically pays a local property-transfer tax, a notary fee and a registration fee with the Registry Agency - in Sofia, about 3.5% of the property\'s value in total, separate from the loan itself. On a €150,000 property, that is about €5,200-5,350 in cash that must be available on the day of the deal, not "figured out somehow later." If you use legal help, budget for that too.',
  },
]

const ids = [...new Set(edits.map((e) => e.id))]
const docs = Object.fromEntries(
  (await client.fetch(`*[_id in $ids]{_id, content, contentEn}`, { ids })).map((d) => [d._id, d])
)

// Apply all edits in memory first, so nothing is written unless every one matches.
for (const e of edits) {
  const doc = docs[e.id]
  if (!doc) { console.error('❌  Post not found:', e.id); process.exit(1) }
  const count = doc[e.field].split(e.from).length - 1
  if (count !== 1) { console.error(`❌  Expected 1 match in ${e.id}.${e.field}, found ${count}:`, e.from.slice(0, 60)); process.exit(1) }
  doc[e.field] = doc[e.field].replace(e.from, e.to)
}

const tx = client.transaction()
for (const id of ids) tx.patch(id, (p) => p.set({ content: docs[id].content, contentEn: docs[id].contentEn }))
await tx.commit()

console.log('✅  Updated posts:', ids.join(', '))
