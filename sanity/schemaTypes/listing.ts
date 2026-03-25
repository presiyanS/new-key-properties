import { defineField, defineType } from 'sanity'
import { ExternalImagePreview } from '../components/ExternalImagePreview'

export const listingType = defineType({
  name: 'listing',
  title: 'Имот',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заглавие',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Тип',
      type: 'string',
      options: {
        list: [
          { title: 'Продажба', value: 'sale' },
          { title: 'Наем', value: 'rent' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Цена (EUR)',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'area',
      title: 'Площ (кв.м)',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'rooms',
      title: 'Брой стаи',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'floor',
      title: 'Етаж',
      type: 'number',
    }),
    defineField({
      name: 'totalFloors',
      title: 'Общо етажи в сградата',
      type: 'number',
    }),
    defineField({
      name: 'neighborhood',
      title: 'Квартал',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'images',
      title: 'Снимки (качване)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'externalImageUrls',
      title: 'Снимки (URL връзки)',
      type: 'array',
      of: [{ type: 'url', components: { input: ExternalImagePreview } }],
      description: 'Използва се автоматично — не е нужно ръчно редактиране',
    }),
    defineField({
      name: 'features',
      title: 'Особености',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Препоръчан имот',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      type: 'type',
      media: 'images.0',
    },
    prepare({ title, price, type, media }) {
      return {
        title,
        subtitle: `${type === 'sale' ? 'Продажба' : 'Наем'} · €${price?.toLocaleString('bg-BG')}`,
        media,
      }
    },
  },
})
