/**
 * Proofread fix + publish for the rental-yield draft (see add-rental-yield-2026-post.mjs):
 * removes a stray comma in one subheading in both BG and EN ("реалната, нетна доходност"
 * -> "реалната нетна доходност" / "the real, net yield" -> "the real net yield" - the
 * second adjective isn't a separate item in a list, so no comma belongs there).
 * Then converts the Sanity draft into a published document.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node publish-rental-yield-2026-post.mjs
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

const draftId = 'drafts.f4a8f75e0e63d90764ce57eb'
const publishedId = draftId.replace('drafts.', '')

const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId })
if (!draft) { console.error('❌  Draft not found:', draftId); process.exit(1) }

const content = draft.content.replace(
  '**Как се стига до реалната, нетна доходност**',
  '**Как се стига до реалната нетна доходност**'
)
const contentEn = draft.contentEn.replace(
  '**How you get to the real, net yield**',
  '**How you get to the real net yield**'
)

if (content === draft.content || contentEn === draft.contentEn) {
  console.error('❌  Expected text to fix was not found - aborting before publish so nothing goes live unreviewed.')
  process.exit(1)
}

const { _id, _rev, _createdAt, _updatedAt, ...rest } = draft
const publishedDoc = { ...rest, _id: publishedId, content, contentEn }

await client
  .transaction()
  .createOrReplace(publishedDoc)
  .delete(draftId)
  .commit()

console.log('✅  Published blog post:', publishedId, publishedDoc.slug.current)
