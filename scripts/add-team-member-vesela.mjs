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

const doc = {
  _type: 'teamMember',
  name: 'Весела Йорданова',
  nameEn: 'Vesela Yordanova',
  role: 'Консултант недвижими имоти',
  roleEn: 'Real Estate Consultant',
  bio: 'Весела работи рамо до рамо с клиентите на New Key Properties, помагайки им да намерят правилния имот в София. Отличава се с внимание, честност и истинска грижа за всеки клиент.',
  bioEn: "Vesela works closely with New Key Properties' clients, helping them find the right property in Sofia. She stands out for her attention to detail, honesty, and genuine care for every client.",
  phone: '0885094752',
  order: 4,
}

const created = await client.create(doc)
console.log('✅  Created teamMember', created._id, created.name)
