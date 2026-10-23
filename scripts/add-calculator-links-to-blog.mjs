/**
 * Adds a link to the new /kalkulator page in the two blog posts the
 * calculators are based on (BG + EN), right after each post's worked example.
 * Safe to re-run: skips any text that already links to /kalkulator.
 * Needs the blog renderer's [text](/path) link support to be live first.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-calculator-links-to-blog.mjs [--dry-run]
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// For each post: the paragraph to append to (identified by how it starts) and the sentence to add.
const posts = [
  {
    slug: 'razhodi-pri-pokupka-na-imot-v-sofia-danatsi-i-taksi',
    bg: {
      after: 'Общо: около 6 210-6 340 евро',
      add: 'Можете да изчислите тези разходи за всяка цена с нашия [калкулатор на разходите при покупка](/kalkulator).',
    },
    en: {
      after: 'Total: about €6,210-6,340',
      add: 'You can work out these costs for any price with our [buying costs calculator](/kalkulator).',
    },
  },
  {
    slug: 'danaci-pri-prodazhba-na-imot-koga-dalzhite-danak',
    bg: {
      after: 'На практика ефективната тежест',
      add: 'Можете да проверите дали дължите данък и колко с нашия [калкулатор за данък при продажба](/kalkulator#prodazhba) - той показва и от коя дата продажбата става необлагаема.',
    },
    en: {
      after: 'In practice the effective burden',
      add: "You can check whether you owe tax, and how much, with our [sale tax calculator](/kalkulator#prodazhba) - it also shows the date from which the sale becomes tax-free.",
    },
  },
]

function addSentence(content, { after, add }) {
  if (content.includes('](/kalkulator')) return null
  const paragraphs = content.split('\n\n')
  const matches = paragraphs.filter((p) => p.startsWith(after))
  if (matches.length !== 1) throw new Error(`expected one paragraph starting "${after}", found ${matches.length}`)
  return paragraphs.map((p) => (p.startsWith(after) ? `${p} ${add}` : p)).join('\n\n')
}

for (const post of posts) {
  // Patch the draft too if one exists, so publishing it later doesn't drop the link.
  const docs = await client.fetch(`*[_type == "blogPost" && slug.current == $slug]{ _id, content, contentEn }`, { slug: post.slug })
  if (docs.length === 0) { console.error('❌  Post not found:', post.slug); process.exit(1) }
  for (const doc of docs) {
    const content = addSentence(doc.content, post.bg)
    const contentEn = addSentence(doc.contentEn, post.en)
    const set = { ...(content && { content }), ...(contentEn && { contentEn }) }
    if (Object.keys(set).length === 0) { console.log('⏭️   Already linked:', doc._id); continue }
    if (dryRun) {
      for (const v of Object.values(set)) console.log(v.split('\n\n').find((p) => p.includes('](/kalkulator')))
      continue
    }
    await client.patch(doc._id).set(set).commit()
    console.log('✅  Linked', doc._id, Object.keys(set).join(' + '))
  }
}
