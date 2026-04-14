import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const neighborhoodType = defineType({
  name: 'neighborhood',
  title: 'Квартален наръчник',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'Име на квартала', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL (slug)', type: 'slug', options: { source: 'name', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Кратък слоган', type: 'string' }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 8 }),
    defineField({ name: 'transport', title: 'Транспорт и достъпност', type: 'text', rows: 3 }),
    defineField({ name: 'priceRangeSale', title: 'Ценови диапазон — продажба', type: 'string', description: 'Напр. 2 000 – 3 500 €/кв.м' }),
    defineField({ name: 'priceRangeRent', title: 'Ценови диапазон — наем', type: 'string', description: 'Напр. 700 – 1 400 €/мес.' }),
    defineField({ name: 'targetAudience', title: 'За кого е подходящ', type: 'text', rows: 3 }),
    defineField({ name: 'pros', title: 'Предимства', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'cons', title: 'Недостатъци', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'externalImageUrl', title: 'Снимка (URL)', type: 'url' }),
    defineField({ name: 'metaDescription', title: 'SEO описание (до 155 знака)', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
})
