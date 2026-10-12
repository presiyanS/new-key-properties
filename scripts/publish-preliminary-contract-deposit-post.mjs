/**
 * Publishes the preliminary contract / deposit draft (see add-preliminary-contract-deposit-post.mjs)
 * after its proofread pass. The proofread fixes (owner-signature wording,
 * buyer's point of view in the court-claim section, ГПК abbreviation) were
 * applied in the add script before the draft was created, so this only
 * converts the draft into a published document.
 *
 * Rollback: delete the published doc in Studio (or re-run with a delete).
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/publish-preliminary-contract-deposit-post.mjs
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

const draftId = 'drafts.4d366b8c7b6aef9773470733'
const publishedId = draftId.replace('drafts.', '')

const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId })
if (!draft) { console.error('❌  Draft not found:', draftId); process.exit(1) }

const { _id, _rev, _createdAt, _updatedAt, ...rest } = draft

await client
  .transaction()
  .createOrReplace({ ...rest, _id: publishedId })
  .delete(draftId)
  .commit()

console.log('✅  Published blog post:', publishedId, draft.slug.current)
