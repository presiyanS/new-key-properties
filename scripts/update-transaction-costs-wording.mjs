/**
 * Makes the "about 8% transaction costs" sentence in two older posts
 * (2026-07-18 rent-vs-buy, 2026-07-27 new construction) consistent with the
 * 2026-10-19 purchase-costs post: the 8% total stays, but it now says that
 * only ~3.5% is the legally set tax/fees and the rest is commission and loan
 * costs. Also drops two leftover lev amounts from the 2026-07-18 EN text
 * (euro-only rule).
 *
 * Each edit is an exact find-and-replace; the script stops without writing
 * anything if any old text isn't found exactly once.
 *
 * Rollback: swap `from`/`to` below and re-run.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/update-transaction-costs-wording.mjs
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
    id: 'ek3ozh0nsndlQANnSnxUs3', // 2026-07-18 naem-ili-kupuvane
    field: 'content',
    from: 'Към тази сума трябва да се добавят допълнителните разходи за трансакцията, включващи местен данък, нотариални такси, такси за вписване и комисиона за посредник, които възлизат на около 8% от стойността на имота, или още близо 15 600 евро.',
    to: 'Към тази сума трябва да се добавят допълнителните разходи по сделката - около 8% от стойността на имота, или още близо 15 600 евро. Около 3,5% от тях са законовите данъци и такси (местен данък, нотариална такса и такса за вписване), а останалото покрива комисионата за посредник и разходите по кредита.',
  },
  {
    id: 'ek3ozh0nsndlQANnSnxUs3',
    field: 'contentEn',
    from: "On top of that, you need to add the transaction's additional costs - local acquisition tax, notary fees, registration fees, and agency commission - which come to around 8% of the property's value, or close to another €15,600. So the upfront capital you need is around €54,600 (roughly 106,800 lev).",
    to: "On top of that, you need to add the transaction's additional costs - around 8% of the property's value, or close to another €15,600. About 3.5% of that is the legally set taxes and fees (local tax, notary fee and registration fee), and the rest covers the agency commission and the loan costs. So the upfront capital you need is around €54,600.",
  },
  {
    id: 'ek3ozh0nsndlQANnSnxUs3',
    field: 'contentEn',
    from: 'the monthly loan payment would be around €641 (1,254 lev).',
    to: 'the monthly loan payment would be around €641.',
  },
  {
    id: '3nD2txy2KIA4qXuPrao7Hx', // 2026-07-27 novo-stroitelstvo
    field: 'content',
    from: 'Към тези суми купувачите трябва да предвидят и около 8% допълнителни разходи по сделката за местен данък, нотариални такси, вписвания и комисиона.',
    to: 'Към тези суми купувачите трябва да предвидят и около 8% допълнителни разходи по сделката. Около 3,5% от тях са законовите данъци и такси (местен данък, нотариална такса и такса за вписване), а останалото покрива комисионата и евентуалните разходи по кредита.',
  },
  {
    id: '3nD2txy2KIA4qXuPrao7Hx',
    field: 'contentEn',
    from: 'On top of these amounts, buyers must also budget for about 8% additional transaction costs for local tax, notary fees, registrations and commission.',
    to: 'On top of these amounts, buyers must also budget for about 8% in additional transaction costs. About 3.5% of that is the legally set taxes and fees (local tax, notary fee and registration fee), and the rest covers the commission and any loan costs.',
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
