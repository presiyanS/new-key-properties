import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { createExternalImageThumbnail } from '../components/ExternalImageThumbnail'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Блог статия',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Заглавие',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL адрес (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Кратко описание',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Съдържание',
      type: 'text',
      rows: 20,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Дата',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Пазарен анализ', value: 'Пазарен анализ' },
          { title: 'Съвети', value: 'Съвети' },
          { title: 'Инвестиции', value: 'Инвестиции' },
          { title: 'Ръководства', value: 'Ръководства' },
          { title: 'Анализи', value: 'Анализи' },
          { title: 'Правни съвети', value: 'Правни съвети' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Снимка (качване)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Снимка (URL връзка)',
      type: 'url',
      description: 'Използвайте ако не качвате снимка — поставете URL адрес на снимка от интернет',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'image',
      externalUrl: 'externalImageUrl',
    },
    prepare({ title, category, date, media, externalUrl }) {
      return {
        title,
        subtitle: `${category ?? ''} · ${date ?? ''}`,
        media: media ?? (externalUrl ? createExternalImageThumbnail(externalUrl) : DocumentTextIcon),
      }
    },
  },
})
