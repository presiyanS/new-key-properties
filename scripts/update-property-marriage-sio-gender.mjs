/**
 * Makes the Bulgarian text of the "buying property while married" post
 * (1a832ee548e346f6bf4ae6df) address both genders explicitly
 * (женен/омъжена, съпруг/съпруга), at Presiyan's request on 2026-11-10.
 * Where the law speaks generically, "единия съпруг" becomes the gender-neutral
 * "единия от съпрузите". English text is already neutral ("spouse", "they").
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/update-property-marriage-sio-gender.mjs
 *   node scripts/update-property-marriage-sio-gender.mjs --file <path>   (apply to a local file only)
 */

import { createClient } from '@sanity/client'
import fs from 'fs'

export const REPLACEMENTS = [
  ['Ако сте женени, отговорът', 'Ако сте женени или омъжени, отговорът'],
  ['Затова дори единият съпруг да е плащал всичко', 'Затова дори единият от съпрузите да е плащал всичко'],
  ['този съпруг, който твърди, че имотът (или част от него) е лично негов,', 'този от съпрузите, който твърди, че имотът (или част от него) е лично негов или неин,'],
  ['личната сметка на единия съпруг не е достатъчно', 'личната сметка на единия от съпрузите не е достатъчно'],
  ['ясно сте посочени като надарен,', 'ясно сте посочени като надарен или надарена,'],
  ['Това, че съпругът Ви е участвал в изплащането на кредита, не го прави съсобственик. То може да му даде право само', 'Участието на съпруга или съпругата Ви в изплащането на кредита не дава право на собственост върху имота. То може да даде право само'],
  ['само на името на единия съпруг и само той да плаща вноските', 'само на името на единия от съпрузите и само той или тя да плаща вноските'],
  ['Ако единият продаде общ имот без участието на другия, сделката може да бъде оспорена от другия съпруг', 'Ако единият от тях продаде общ имот без участието на другия, сделката може да бъде оспорена от другия съпруг или съпруга'],
  ['Ако купувате имот от продавач, който е бил женен към момента на придобиването му,', 'Ако купувате имот от продавач, който е бил женен, или от продавачка, която е била омъжена, към момента на придобиването му,'],
  ['лична собственост на единия съпруг и семейството няма друго жилище, то може да бъде продадено само със съгласието на другия съпруг', 'лична собственост на единия от съпрузите и семейството няма друго жилище, то може да бъде продадено само със съгласието на другия'],
  ['по-голям дял на единия съпруг само в изрично предвидени случаи - например ако неговият принос', 'по-голям дял на единия от съпрузите само в изрично предвидени случаи - например ако неговият или нейният принос'],
  ['ако при него остават да живеят', 'ако при него или нея остават да живеят'],
  ['да бъдат само негови, можете', 'да бъдат само на този, който ги купува, можете'],
  ['който единият съпруг е притежавал преди брака', 'който единият от съпрузите е притежавал преди брака'],
  ['когато единият съпруг има собствен бизнес', 'когато единият от съпрузите има собствен бизнес'],
  ['- Ако купувате от женен продавач, проверете', '- Ако продавачът е женен или продавачката е омъжена, проверете'],
  ['кога жилището е общо със съпруга Ви,', 'кога жилището е общо със съпруга или съпругата Ви,'],
]

function apply(text) {
  let out = text
  for (const [from, to] of REPLACEMENTS) {
    if (!out.includes(from)) throw new Error(`Text not found: "${from}"`)
    out = out.replace(from, to)
  }
  return out
}

const fileIdx = process.argv.indexOf('--file')
if (fileIdx !== -1) {
  const p = process.argv[fileIdx + 1]
  fs.writeFileSync(p, apply(fs.readFileSync(p, 'utf8')))
  console.log('✅  Applied to file:', p)
  process.exit(0)
}

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const id = '1a832ee548e346f6bf4ae6df'
const doc = await client.fetch(`*[_id == $id][0]{content, excerpt}`, { id })
if (!doc) { console.error('❌  Post not found:', id); process.exit(1) }

// Content and excerpt are joined so every replacement is checked once across both.
const SEP = '\n@@EXCERPT@@\n'
const [content, excerpt] = apply(doc.content + SEP + doc.excerpt).split(SEP)

await client.patch(id).set({ content, excerpt }).commit()
console.log('✅  Updated post', id)
