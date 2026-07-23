import { defineField, defineType } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons/TrendUpward'

export const valuationRequestType = defineType({
  name: 'valuationRequest',
  title: 'Запитване за оценка',
  type: 'document',
  icon: TrendUpwardIcon,
  fields: [
    defineField({ name: 'name', title: 'Име', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Телефон', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Имейл', type: 'string' }),
    defineField({ name: 'neighborhood', title: 'Квартал', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'purpose',
      title: 'Цел',
      type: 'string',
      options: { list: [{ title: 'Продажба', value: 'sell' }, { title: 'Наем', value: 'rent' }] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Тип имот',
      type: 'string',
      options: {
        list: [
          { title: 'Апартамент', value: 'apartment' },
          { title: 'Къща', value: 'house' },
          { title: 'Гараж', value: 'garage' },
          { title: 'Офис', value: 'office' },
          { title: 'Магазин', value: 'store' },
        ],
      },
    }),
    defineField({ name: 'area', title: 'Площ (кв.м)', type: 'number' }),
    defineField({ name: 'rooms', title: 'Брой стаи', type: 'string' }),
    defineField({ name: 'floor', title: 'Етаж', type: 'string' }),
    defineField({
      name: 'condition',
      title: 'Състояние',
      type: 'string',
      options: {
        list: [
          { title: 'Ново строителство', value: 'new' },
          { title: 'Реновиран', value: 'renovated' },
          { title: 'Добро състояние', value: 'good' },
          { title: 'За основен ремонт', value: 'needs-renovation' },
        ],
      },
    }),
    defineField({ name: 'message', title: 'Съобщение', type: 'text', rows: 4 }),
    defineField({ name: 'createdAt', title: 'Изпратено на', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: { list: [{ title: 'Ново', value: 'new' }, { title: 'Свързахме се', value: 'contacted' }, { title: 'Приключено', value: 'closed' }] },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: { name: 'name', neighborhood: 'neighborhood', purpose: 'purpose', status: 'status' },
    prepare({ name, neighborhood, purpose, status }) {
      return {
        title: name,
        subtitle: [purpose === 'sell' ? 'Продажба' : 'Наем', neighborhood, status !== 'new' ? `(${status})` : null].filter(Boolean).join(' · '),
      }
    },
  },
})
