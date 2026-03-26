import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Член на екипа',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Имe',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Позиция',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Биография',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Имейл',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Снимка',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Ред на показване',
      description: 'По-малко число = показва се по-напред (1, 2, 3...)',
      type: 'number',
      initialValue: 99,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
