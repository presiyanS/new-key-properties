/**
 * Publishes the rental income tax draft (see add-rental-income-tax-post.mjs)
 * after Presiyan's go-ahead on 2026-11-02. No content changes.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/publish-rental-income-tax-post.mjs
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

const draftId = 'drafts.8c8d58a2c2ed457ea813bbd3'
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
