import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export const teamPageType = defineType({
  name: 'teamPage',
  title: 'Екип страница',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'teamGridLabel', title: 'Екип — Малък надпис', type: 'string' }),
    defineField({ name: 'teamGridLabelEn', title: 'Екип — Малък надпис (English)', type: 'string' }),
    defineField({ name: 'teamGridTitle', title: 'Екип — Заглавие', type: 'string' }),
    defineField({ name: 'teamGridTitleEn', title: 'Екип — Заглавие (English)', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleEn', title: 'Hero — Заглавие (English)', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна фраза', type: 'string' }),
    defineField({ name: 'heroTitleGoldEn', title: 'Hero — Златна фраза (English)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({ name: 'heroSubtitleEn', title: 'Hero — Подзаглавие (English)', type: 'text', rows: 3 }),
    defineField({ name: 'philosophyTitle', title: 'Философия — Заглавие', type: 'string' }),
    defineField({ name: 'philosophyTitleEn', title: 'Философия — Заглавие (English)', type: 'string' }),
    defineField({
      name: 'philosophyItems',
      title: 'Философия — Точки',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'titleEn', title: 'Заглавие (English)', type: 'string' }),
          defineField({ name: 'text', title: 'Текст', type: 'text', rows: 3 }),
          defineField({ name: 'textEn', title: 'Текст (English)', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    }),
    defineField({ name: 'ctaTitle', title: 'Призив — Заглавие', type: 'string' }),
    defineField({ name: 'ctaTitleEn', title: 'Призив — Заглавие (English)', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Призив — Подзаглавие', type: 'text', rows: 2 }),
    defineField({ name: 'ctaSubtitleEn', title: 'Призив — Подзаглавие (English)', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Екип страница' }) },
})
