import { createClient } from '@sanity/client'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const sanity = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const PURPOSE_LABEL: Record<string, string> = { sell: 'Продажба', rent: 'Наем' }
const PROPERTY_TYPE_LABEL: Record<string, string> = {
  apartment: 'Апартамент',
  house: 'Къща',
  garage: 'Гараж',
  office: 'Офис',
  store: 'Магазин',
}
const CONDITION_LABEL: Record<string, string> = {
  new: 'Ново строителство',
  renovated: 'Реновиран',
  good: 'Добро състояние',
  'needs-renovation': 'За основен ремонт',
}

export async function POST(req: Request) {
  const { name, phone, email, neighborhood, purpose, propertyType, area, rooms, floor, condition, message } = await req.json()

  if (!name || !phone || !neighborhood || !purpose) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await sanity.create({
      _type: 'valuationRequest',
      name,
      phone,
      email: email || undefined,
      neighborhood,
      purpose,
      propertyType: propertyType || undefined,
      area: area ? Number(area) : undefined,
      rooms: rooms || undefined,
      floor: floor || undefined,
      condition: condition || undefined,
      message: message || undefined,
      createdAt: new Date().toISOString(),
      status: 'new',
    })
  } catch (err) {
    console.error('Sanity create error:', err)
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding: 8px 0; color: #666; width: 140px;">${label}:</td><td style="padding: 8px 0; font-weight: bold;">${value}</td></tr>` : ''

  const { error } = await resend.emails.send({
    from: 'New Key Properties <noreply@newkey.bg>',
    to: 'office@newkey.bg',
    replyTo: email || undefined,
    subject: `Нова заявка за оценка от ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a4d3a;">Нова заявка за безплатна оценка</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${row('Име', name)}
          ${row('Телефон', phone)}
          ${row('Имейл', email)}
          ${row('Цел', PURPOSE_LABEL[purpose] ?? purpose)}
          ${row('Квартал', neighborhood)}
          ${row('Тип имот', propertyType ? PROPERTY_TYPE_LABEL[propertyType] ?? propertyType : undefined)}
          ${row('Площ', area ? `${area} кв.м` : undefined)}
          ${row('Стаи', rooms)}
          ${row('Етаж', floor)}
          ${row('Състояние', condition ? CONDITION_LABEL[condition] ?? condition : undefined)}
          ${message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Съобщение:</td><td style="padding: 8px 0;">${String(message).replace(/\n/g, '<br>')}</td></tr>` : ''}
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    // Request is already saved in Sanity, so still report success to the user.
  }

  return NextResponse.json({ success: true })
}
