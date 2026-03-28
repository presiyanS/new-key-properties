import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'За нас',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие ред 1', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна фраза', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({
      name: 'heroStats',
      title: 'Hero — Статистики (3 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Стойност', type: 'string' }),
          defineField({ name: 'label', title: 'Надпис', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),

    // ── Mission ───────────────────────────────────────────────────────
    defineField({ name: 'missionTitle', title: 'Мисия — Заглавие', type: 'string' }),
    defineField({
      name: 'missionParagraphs',
      title: 'Мисия — Параграфи',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Добавете 2-3 параграфа',
    }),
    defineField({ name: 'missionCardTitle', title: 'Мисия — Карта заглавие', type: 'string' }),
    defineField({
      name: 'missionValues',
      title: 'Мисия — Ценности (3 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'label', subtitle: 'desc' } },
      }],
    }),

    // ── Values ────────────────────────────────────────────────────────
    defineField({ name: 'valuesTitle', title: 'Ценности — Заглавие', type: 'string' }),
    defineField({ name: 'valuesSubtitle', title: 'Ценности — Подзаглавие', type: 'string' }),
    defineField({
      name: 'values',
      title: 'Ценности (6 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } },
      }],
    }),

    // ── Specialization ────────────────────────────────────────────────
    defineField({ name: 'specializationTitle', title: 'Специализация — Заглавие', type: 'string' }),
    defineField({ name: 'specializationSubtitle', title: 'Специализация — Подзаглавие', type: 'text', rows: 3 }),
    defineField({
      name: 'specializations',
      title: 'Специализация — Колони (3 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({
            name: 'items',
            title: 'Точки',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),

    // ── CTA ───────────────────────────────────────────────────────────
    defineField({ name: 'ctaTitle', title: 'Призив — Заглавие', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Призив — Подзаглавие', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'За нас' }) },
})
