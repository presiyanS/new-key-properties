/**
 * Patches the homePage document with new fields added in the latest update.
 * Uses setIfMissing so it never overwrites values already edited in Sanity Studio.
 * Usage: SANITY_TOKEN=<editor-token> node scripts/patch-homepage-new-fields.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN. Run: SANITY_TOKEN=<token> node scripts/patch-homepage-new-fields.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const newFields = {
  // Hero
  heroLine4: 'Тук',
  heroButton1: 'Разгледайте Имотите',
  heroButton2: 'Свържете се с нас',
  scrollIndicator: 'Разгледайте',

  // Process section
  processLabel: 'Нашият метод',

  // Featured listings
  featuredMobileLinkText: 'Всички имоти',

  // Why Us
  whyUsLabel: 'Нашата разлика',
  whyUsButton: 'Научете повече за нас',

  // CTA Card
  ctaCardLabel: 'Безплатна консултация',
  ctaCardButton1: '0879 826 292',
  ctaCardButton2: 'Изпратете запитване',
  ctaCardTrustText: '100% безплатно и без ангажименти',

  // Blog section
  blogLabel: 'Знания',
  blogTitle: 'Полезна Информация',
  blogSubtitle: 'Анализи, съвети и новини от пазара на недвижими имоти',
  blogLinkText: 'Всички статии',

  // Final CTA
  finalCtaButton1: 'Обадете се сега',
  finalCtaButton2: 'office@newkey.bg',
}

async function patch() {
  await client.patch('homePage').setIfMissing(newFields).commit()
  console.log('✅  homePage patched with new fields (existing values preserved)')
}

patch().catch(console.error)
