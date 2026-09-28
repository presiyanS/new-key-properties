/**
 * Proofread pass + publish for the garages/parking-spaces draft
 * (see add-garages-investment-post.mjs):
 *
 * 1. Swaps the image: Business_Park_Sofia_E1.jpg didn't actually show any
 *    parking, garages, or cars - replaced with a Sofia parking-lot photo
 *    (upscale residential complex, cars visible) that isn't used on any
 *    other post yet.
 * 2. Fixes an internal contradiction: the intro correctly says the court
 *    "окончателно" (definitively/permanently) blocked the reform, but the
 *    closing sentence of that same paragraph then called it "временно"
 *    (temporarily) stopped - contradicts itself. Fixed in both BG and EN.
 * 3. Smooths an awkward comma construction in the second section
 *    ("въпросът е кога, не дали, ще се случи" -> "въпросът е не дали, а
 *    кога ще последва следващият опит").
 * 4. Fixes a missing "а" in the Bulgarian conclusion ("ще расте, не ще
 *    намалява" -> "ще расте, а не ще намалява").
 *
 * Then converts the Sanity draft into a published document.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/proofread-and-publish-garages-post.mjs
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

const draftId = 'drafts.784ce8dc81b100b3bc421937'
const publishedId = draftId.replace('drafts.', '')

const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId })
if (!draft) { console.error('❌  Draft not found:', draftId); process.exit(1) }

const fixes = [
  { field: 'content', from: 'Общината вече показа накъде се движи, дори временно спряна от съда.', to: 'Общината вече показа накъде се движи, макар и спряна от съда.' },
  { field: 'contentEn', from: "the Municipality has already shown which direction it's heading, even if temporarily stopped by the court.", to: "the Municipality has already shown which direction it's heading, even though this particular attempt was stopped by the court." },
  { field: 'content', from: 'въпросът е кога, не дали, ще се случи следващ опит.', to: 'въпросът е не дали, а кога ще последва следващият опит.' },
  { field: 'content', from: 'платеното и регулирано паркиране в столицата ще расте, не ще намалява.', to: 'платеното и регулирано паркиране в столицата ще расте, а не ще намалява.' },
]

const updated = { content: draft.content, contentEn: draft.contentEn }
for (const fix of fixes) {
  if (!updated[fix.field].includes(fix.from)) {
    console.error('❌  Expected text not found, aborting before publish:', fix.from)
    process.exit(1)
  }
  updated[fix.field] = updated[fix.field].replace(fix.from, fix.to)
}

const newImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Sofia_-_panoramio_-_zonemars_%2823%29.jpg'

const { _id, _rev, _createdAt, _updatedAt, ...rest } = draft
const publishedDoc = {
  ...rest,
  _id: publishedId,
  content: updated.content,
  contentEn: updated.contentEn,
  externalImageUrl: newImageUrl,
}

await client
  .transaction()
  .createOrReplace(publishedDoc)
  .delete(draftId)
  .commit()

console.log('✅  Published blog post:', publishedId, publishedDoc.slug.current)
console.log('   Image:', newImageUrl)
