import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const consultationPageType = defineType({
  name: 'consultationPage',
  title: 'Безплатна консултация',
  type: 'document',
  icon: StarIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroBadge', title: 'Hero — Значка', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие ред 1', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна дума', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),

    // ── Benefits ──────────────────────────────────────────────────────
    defineField({ name: 'benefitsTitle', title: 'Какво получавате — Заглавие', type: 'string' }),
    defineField({ name: 'benefitsSubtitle', title: 'Какво получавате — Подзаглавие', type: 'string' }),
    defineField({
      name: 'benefits',
      title: 'Предимства (4 броя)',
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

    // ── Stats ─────────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Статистики (3 броя)',
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

    // ── Steps ─────────────────────────────────────────────────────────
    defineField({
      name: 'steps',
      title: 'Стъпки (4 броя)',
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

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'Често задавани въпроси',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'q', title: 'Въпрос', type: 'string' }),
          defineField({ name: 'a', title: 'Отговор', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'q', subtitle: 'a' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Безплатна консултация' }) },
})
