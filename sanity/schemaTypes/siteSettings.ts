import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Настройки на сайта',
  type: 'document',
  icon: CogIcon,
  fields: [
    // ── Contact ───────────────────────────────────────────────────────────
    defineField({ name: 'phone', title: 'Телефон (без интервали)', type: 'string', description: 'Пример: 0879826292' }),
    defineField({ name: 'phoneDisplay', title: 'Телефон (форматиран)', type: 'string', description: 'Пример: 0879 826 292' }),
    defineField({ name: 'email', title: 'Имейл', type: 'string' }),
    defineField({ name: 'address', title: 'Адрес', type: 'string' }),

    // ── Social ────────────────────────────────────────────────────────────
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),

    // ── Footer ────────────────────────────────────────────────────────────
    defineField({ name: 'footerTagline', title: 'Footer — Описание', type: 'text', rows: 2 }),
    defineField({ name: 'footerQuote', title: 'Footer — Цитат (курсив)', type: 'text', rows: 2 }),
    defineField({ name: 'footerCopyright', title: 'Footer — Авторски права', type: 'string', description: 'Пример: New Key Properties. Всички права запазени.' }),
    defineField({ name: 'footerSubline', title: 'Footer — Подред', type: 'string', description: 'Пример: Агенция за недвижими имоти – София, България' }),
  ],
  preview: { prepare: () => ({ title: 'Настройки на сайта' }) },
})
