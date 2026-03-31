import { defineField, defineType } from 'sanity'
import { BellIcon } from '@sanity/icons'

export const savedSearchType = defineType({
  name: 'savedSearch',
  title: 'Запазено търсене',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({ name: 'email', title: 'Имейл', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Тип имот',
      type: 'string',
      options: { list: ['any', 'sale', 'rent'] },
    }),
    defineField({ name: 'neighborhood', title: 'Квартал', type: 'string' }),
    defineField({ name: 'rooms', title: 'Брой стаи', type: 'number' }),
    defineField({ name: 'priceMin', title: 'Мин. цена (€)', type: 'number' }),
    defineField({ name: 'priceMax', title: 'Макс. цена (€)', type: 'number' }),
    defineField({ name: 'createdAt', title: 'Записано на', type: 'datetime' }),
    defineField({ name: 'active', title: 'Активно', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { email: 'email', neighborhood: 'neighborhood', type: 'type' },
    prepare({ email, neighborhood, type }) {
      return {
        title: email,
        subtitle: [type !== 'any' ? type : '', neighborhood].filter(Boolean).join(' · ') || 'Всички имоти',
      }
    },
  },
})
