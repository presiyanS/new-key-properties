import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const listingsPageType = defineType({
  name: 'listingsPage',
  title: 'Имоти страница',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна дума', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({
      name: 'saleCountOverride',
      title: 'Брой имоти за продажба (ръчно)',
      description: 'Ако е зададено, се показва вместо автоматично броения брой от обявите. Полезно когато в сграда има повече апартаменти отколкото обяви.',
      type: 'number',
    }),
    defineField({
      name: 'rentCountOverride',
      title: 'Брой имоти под наем (ръчно)',
      description: 'Ако е зададено, се показва вместо автоматично броения брой от обявите.',
      type: 'number',
    }),
    defineField({ name: 'bottomCtaTitle', title: 'Долен призив — Заглавие', type: 'string' }),
    defineField({ name: 'bottomCtaSubtitle', title: 'Долен призив — Подзаглавие', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Имоти страница' }) },
})
