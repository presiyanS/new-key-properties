import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamPageType = defineType({
  name: 'teamPage',
  title: 'Екип страница',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна фраза', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({ name: 'philosophyTitle', title: 'Философия — Заглавие', type: 'string' }),
    defineField({
      name: 'philosophyItems',
      title: 'Философия — Точки',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'text', title: 'Текст', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    }),
    defineField({ name: 'ctaTitle', title: 'Призив — Заглавие', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Призив — Подзаглавие', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Екип страница' }) },
})
