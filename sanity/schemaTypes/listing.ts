import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { orderRankField } from '@sanity/orderable-document-list'
import { ExternalImagePreview } from '../components/ExternalImagePreview'
import { createExternalImageThumbnail } from '../components/ExternalImageThumbnail'
import { PricePrefixInput } from '../components/PricePrefixInput'

export const listingType = defineType({
  name: 'listing',
  title: 'Имот',
  type: 'document',
  icon: HomeIcon,
  fields: [
    orderRankField({ type: 'listing' }),
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
      type: 'string',
      description: 'Може да е число (650000) или текст (По договаряне, €650/мес.)',
      validation: (r) => r.required(),
      components: { input: PricePrefixInput },
    }),
    defineField({
      name: 'area',
      title: 'Площ (кв.м)',
      type: 'string',
      description: 'Може да е число (85) или текст (85 + 10 тераса)',
    }),
    defineField({
      name: 'rooms',
      title: 'Брой стаи',
      type: 'string',
      description: 'Може да е число (3) или текст (Студио, 3 + дневна)',
    }),
    defineField({
      name: 'floor',
      title: 'Етаж',
      type: 'string',
      description: 'Може да е число (0, 1, 2...) или текст (Партер, Подземен, Мансарда)',
    }),
    defineField({
      name: 'totalFloors',
      title: 'Общо етажи в сградата',
      type: 'number',
    }),
    defineField({
      name: 'constructionAct',
      title: 'Акт на строителство',
      type: 'string',
      options: {
        list: [
          { title: 'Акт 14', value: 'act14' },
          { title: 'Акт 15', value: 'act15' },
          { title: 'Акт 16', value: 'act16' },
        ],
        layout: 'radio',
      },
      description: 'Степента на завършеност на строителството (по желание)',
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
      name: 'googleMapsUrl',
      title: 'Google Maps — Embed URL',
      type: 'url',
      description: 'По желание: отворете Google Maps → намерете имота → Споделяне → Вграждане на карта → копирайте само src="..." URL-а от iframe кода.',
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
      externalUrl: 'externalImageUrls.0',
    },
    prepare({ title, price, type, media, externalUrl }) {
      return {
        title,
        subtitle: `${type === 'sale' ? 'Продажба' : 'Наем'} · €${price ?? '–'}`,
        media: media ?? (externalUrl ? createExternalImageThumbnail(externalUrl) : HomeIcon),
      }
    },
  },
})
