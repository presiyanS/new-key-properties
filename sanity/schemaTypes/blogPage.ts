import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const blogPageType = defineType({
  name: 'blogPage',
  title: 'Блог страница',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна дума', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({ name: 'ctaTitle', title: 'Призив — Заглавие', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Призив — Подзаглавие', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Блог страница' }) },
})
