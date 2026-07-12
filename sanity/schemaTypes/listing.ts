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
      name: 'code',
      title: 'Код на имота',
      type: 'string',
      description: 'Кратък уникален код за търсене и споделяне по телефон (напр. NK-1042).',
      validation: (r) =>
        r.required().custom(async (code, context) => {
          if (!code) return true
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id.replace(/^drafts\./, '') ?? ''
          const params = { draft: `drafts.${id}`, published: id, code }
          const isUnique = await client.fetch(
            `!defined(*[_type == "listing" && !(_id in [$draft, $published]) && code == $code][0]._id)`,
            params
          )
          return isUnique || 'Този код вече се използва от друг имот'
        }),
    }),
    defineField({
      name: 'title',
      title: 'Заглавие',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Заглавие (EN)',
      type: 'string',
      description: 'Английски превод — показва се на /en сайта',
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
      name: 'category',
      title: 'Категория имот',
      type: 'string',
      options: {
        list: [
          { title: 'Апартамент', value: 'apartment' },
          { title: 'Гараж', value: 'garage' },
          { title: 'Офис', value: 'office' },
          { title: 'Магазин', value: 'store' },
        ],
        layout: 'radio',
      },
      initialValue: 'apartment',
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
      name: 'descriptionEn',
      title: 'Описание (EN)',
      type: 'text',
      rows: 5,
      description: 'Английски превод — показва се на /en сайта',
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
      name: 'featuresEn',
      title: 'Особености (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Английски превод — показва се на /en сайта',
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
    defineField({
      name: 'sold',
      title: 'Продаден / Отдаден',
      type: 'boolean',
      initialValue: false,
      description: 'Маркирайте ако имотът вече е продаден или отдаден под наем.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      type: 'type',
      code: 'code',
      media: 'images.0',
      externalUrl: 'externalImageUrls.0',
    },
    prepare({ title, price, type, code, media, externalUrl }) {
      return {
        title,
        subtitle: `${code ? code + ' · ' : ''}${type === 'sale' ? 'Продажба' : 'Наем'} · €${price ?? '–'}`,
        media: media ?? (externalUrl ? createExternalImageThumbnail(externalUrl) : HomeIcon),
      }
    },
  },
})
