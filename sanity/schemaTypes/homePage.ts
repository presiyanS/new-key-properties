import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Начална страница',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroBadge', title: 'Hero — Значка (малък текст)', type: 'string' }),
    defineField({ name: 'heroLine1', title: 'Hero — Заглавие ред 1', type: 'string' }),
    defineField({ name: 'heroLineGold', title: 'Hero — Златна дума', type: 'string' }),
    defineField({ name: 'heroLine3', title: 'Hero — Заглавие ред 3', type: 'string' }),
    defineField({ name: 'heroLine4', title: 'Hero — Заглавие ред 4', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 3 }),
    defineField({ name: 'heroButton1', title: 'Hero — Бутон 1 (имоти)', type: 'string' }),
    defineField({ name: 'heroButton2', title: 'Hero — Бутон 2 (контакт)', type: 'string' }),
    defineField({ name: 'scrollIndicator', title: 'Hero — Текст на скрол индикатора', type: 'string' }),
    defineField({
      name: 'heroBadges',
      title: 'Hero — Плаващи карточки (4 броя)',
      description: 'Четирите анимирани карточки в дясната част на hero секцията.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Подзаглавие', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } },
      }],
    }),

    // ── Stats bar ─────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Статистики (4 броя)',
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

    // ── Services ──────────────────────────────────────────────────────
    defineField({ name: 'servicesTitle', title: 'Услуги — Заглавие', type: 'string' }),
    defineField({ name: 'servicesSubtitle', title: 'Услуги — Подзаглавие', type: 'string' }),
    defineField({
      name: 'services',
      title: 'Услуги (4 броя)',
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

    // ── Why Us ────────────────────────────────────────────────────────
    defineField({ name: 'whyUsTitle', title: 'Защо ние — Заглавие', type: 'string' }),
    defineField({ name: 'whyUsSubtitle', title: 'Защо ние — Подзаглавие', type: 'text', rows: 3 }),
    defineField({
      name: 'whyUsPoints',
      title: 'Защо ние — Точки (4 броя)',
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

    // ── Featured Listings Section ─────────────────────────────────────
    defineField({ name: 'featuredLabel', title: 'Избрани имоти — Надпис (малък)', type: 'string' }),
    defineField({ name: 'featuredTitle', title: 'Избрани имоти — Заглавие', type: 'string' }),
    defineField({ name: 'featuredSubtitle', title: 'Избрани имоти — Подзаглавие', type: 'string' }),
    defineField({ name: 'featuredLinkText', title: 'Избрани имоти — Текст на линка', type: 'string' }),
    defineField({ name: 'featuredMobileLinkText', title: 'Избрани имоти — Текст на мобилния линк', type: 'string' }),
    defineField({
      name: 'featuredListings',
      title: 'Избрани имоти — Имоти (ръчен избор)',
      description: 'Изберете и наредете имотите, които да се показват в секцията. Ако е празно, ще се показват всички маркирани като "Препоръчан имот".',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'listing' }] }],
    }),

    // ── Process Section ───────────────────────────────────────────────
    defineField({ name: 'processLabel', title: 'Как работим — Надпис (малък)', type: 'string' }),

    // ── Why Us ────────────────────────────────────────────────────────
    defineField({ name: 'whyUsLabel', title: 'Защо ние — Надпис (малък)', type: 'string' }),
    defineField({ name: 'whyUsButton', title: 'Защо ние — Текст на бутона', type: 'string' }),

    // ── CTA Card ──────────────────────────────────────────────────────
    defineField({ name: 'ctaCardLabel', title: 'CTA Карта — Надпис (малък)', type: 'string' }),
    defineField({ name: 'ctaCardTitle', title: 'CTA Карта — Заглавие', type: 'string' }),
    defineField({ name: 'ctaCardDesc', title: 'CTA Карта — Описание', type: 'text', rows: 3 }),
    defineField({ name: 'ctaCardButton1', title: 'CTA Карта — Бутон 1 (телефон)', type: 'string' }),
    defineField({ name: 'ctaCardButton2', title: 'CTA Карта — Бутон 2 (запитване)', type: 'string' }),
    defineField({ name: 'ctaCardTrustText', title: 'CTA Карта — Текст за доверие (под бутоните)', type: 'string' }),

    // ── Blog Section ──────────────────────────────────────────────────
    defineField({ name: 'blogLabel', title: 'Блог — Надпис (малък)', type: 'string' }),
    defineField({ name: 'blogTitle', title: 'Блог — Заглавие', type: 'string' }),
    defineField({ name: 'blogSubtitle', title: 'Блог — Подзаглавие', type: 'string' }),
    defineField({ name: 'blogLinkText', title: 'Блог — Текст на линка', type: 'string' }),

    // ── Final CTA ─────────────────────────────────────────────────────
    defineField({ name: 'finalCtaTitle', title: 'Финален призив — Заглавие', type: 'string' }),
    defineField({ name: 'finalCtaSubtitle', title: 'Финален призив — Подзаглавие', type: 'text', rows: 2 }),
    defineField({ name: 'finalCtaButton1', title: 'Финален призив — Бутон 1 (обаждане)', type: 'string' }),
    defineField({ name: 'finalCtaButton2', title: 'Финален призив — Бутон 2 (имейл)', type: 'string' }),

    // ── Process Steps ─────────────────────────────────────────────────
    defineField({ name: 'processTitle', title: 'Как работим — Заглавие', type: 'string' }),
    defineField({ name: 'processSubtitle', title: 'Как работим — Подзаглавие', type: 'text', rows: 2 }),
    defineField({
      name: 'processSteps',
      title: 'Как работим — Стъпки (3 броя)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заглавие', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } },
      }],
    }),
    defineField({ name: 'processButtonText', title: 'Как работим — Текст на бутона', type: 'string' }),

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'Често задавани въпроси',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'q', title: 'Въпрос', type: 'string' }),
          defineField({ name: 'a', title: 'Отговор', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'q', subtitle: 'a' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Начална страница' }) },
})
