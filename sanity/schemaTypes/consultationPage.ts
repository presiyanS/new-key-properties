import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons/Star'

export const consultationPageType = defineType({
  name: 'consultationPage',
  title: 'Безплатна консултация',
  type: 'document',
  icon: StarIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroBadge', title: 'Hero — Значка', type: 'string' }),
    defineField({ name: 'heroBadgeEn', title: 'Hero — Значка (English)', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие ред 1', type: 'string' }),
    defineField({ name: 'heroTitleEn', title: 'Hero — Заглавие ред 1 (English)', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна дума', type: 'string' }),
    defineField({ name: 'heroTitleGoldEn', title: 'Hero — Златна дума (English)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({ name: 'heroSubtitleEn', title: 'Hero — Подзаглавие (English)', type: 'text', rows: 3 }),

    // ── Benefits ──────────────────────────────────────────────────────
    defineField({ name: 'benefitsTitle', title: 'Какво получавате — Заглавие', type: 'string' }),
    defineField({ name: 'benefitsTitleEn', title: 'Какво получавате — Заглавие (English)', type: 'string' }),
    defineField({ name: 'benefitsSubtitle', title: 'Какво получавате — Подзаглавие', type: 'string' }),
    defineField({ name: 'benefitsSubtitleEn', title: 'Какво получавате — Подзаглавие (English)', type: 'string' }),
    defineField({
      name: 'benefits',
      title: 'Предимства (4 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'titleEn', title: 'Заглавие (English)', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 2 }),
          defineField({ name: 'descEn', title: 'Описание (English)', type: 'text', rows: 2 }),
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
          defineField({ name: 'valueEn', title: 'Стойност (English)', type: 'string' }),
          defineField({ name: 'label', title: 'Надпис', type: 'string' }),
          defineField({ name: 'labelEn', title: 'Надпис (English)', type: 'string' }),
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
          defineField({ name: 'titleEn', title: 'Заглавие (English)', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 2 }),
          defineField({ name: 'descEn', title: 'Описание (English)', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } },
      }],
    }),

    // ── Hero buttons ──────────────────────────────────────────────────
    defineField({ name: 'heroBookButton', title: 'Hero — Бутон "Запишете се"', type: 'string' }),
    defineField({ name: 'heroBookButtonEn', title: 'Hero — Бутон "Запишете се" (English)', type: 'string' }),
    defineField({ name: 'heroCallButton', title: 'Hero — Бутон "Обадете се"', type: 'string' }),
    defineField({ name: 'heroCallButtonEn', title: 'Hero — Бутон "Обадете се" (English)', type: 'string' }),

    // ── Form section ──────────────────────────────────────────────────
    defineField({ name: 'formSectionTitle', title: 'Форма — Заглавие на секцията', type: 'string' }),
    defineField({ name: 'formSectionTitleEn', title: 'Форма — Заглавие на секцията (English)', type: 'string' }),
    defineField({ name: 'formSectionSubtitle', title: 'Форма — Подзаглавие на секцията', type: 'text', rows: 2 }),
    defineField({ name: 'formSectionSubtitleEn', title: 'Форма — Подзаглавие на секцията (English)', type: 'text', rows: 2 }),
    defineField({ name: 'formCardBadge', title: 'Форма — Значка ("Безплатно")', type: 'string' }),
    defineField({ name: 'formCardBadgeEn', title: 'Форма — Значка (English)', type: 'string' }),
    defineField({ name: 'formCardTitle', title: 'Форма — Заглавие на картата', type: 'string' }),
    defineField({ name: 'formCardTitleEn', title: 'Форма — Заглавие на картата (English)', type: 'string' }),
    defineField({ name: 'formCardSubtitle', title: 'Форма — Подзаглавие на картата', type: 'string' }),
    defineField({ name: 'formCardSubtitleEn', title: 'Форма — Подзаглавие на картата (English)', type: 'string' }),

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({ name: 'faqTitle', title: 'FAQ — Заглавие', type: 'string' }),
    defineField({ name: 'faqTitleEn', title: 'FAQ — Заглавие (English)', type: 'string' }),
    defineField({
      name: 'faq',
      title: 'Често задавани въпроси',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'q', title: 'Въпрос', type: 'string' }),
          defineField({ name: 'qEn', title: 'Въпрос (English)', type: 'string' }),
          defineField({ name: 'a', title: 'Отговор', type: 'text', rows: 3 }),
          defineField({ name: 'aEn', title: 'Отговор (English)', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'q', subtitle: 'a' } },
      }],
    }),

    // ── Bottom CTA ────────────────────────────────────────────────────
    defineField({ name: 'bottomCtaTitle', title: 'Долен призив — Заглавие', type: 'string' }),
    defineField({ name: 'bottomCtaTitleEn', title: 'Долен призив — Заглавие (English)', type: 'string' }),
    defineField({ name: 'bottomCtaSubtitle', title: 'Долен призив — Подзаглавие', type: 'text', rows: 2 }),
    defineField({ name: 'bottomCtaSubtitleEn', title: 'Долен призив — Подзаглавие (English)', type: 'text', rows: 2 }),
    defineField({ name: 'bottomCtaButton1', title: 'Долен призив — Бутон 1', type: 'string' }),
    defineField({ name: 'bottomCtaButton1En', title: 'Долен призив — Бутон 1 (English)', type: 'string' }),
    defineField({ name: 'bottomCtaButton2', title: 'Долен призив — Бутон 2', type: 'string' }),
    defineField({ name: 'bottomCtaButton2En', title: 'Долен призив — Бутон 2 (English)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Безплатна консултация' }) },
})
