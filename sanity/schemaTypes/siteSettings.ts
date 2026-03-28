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

    // ── Contact Form ──────────────────────────────────────────────────
    defineField({ name: 'formNameLabel', title: 'Форма — Поле Име (надпис)', type: 'string' }),
    defineField({ name: 'formNamePlaceholder', title: 'Форма — Поле Име (пример)', type: 'string' }),
    defineField({ name: 'formPhoneLabel', title: 'Форма — Поле Телефон (надпис)', type: 'string' }),
    defineField({ name: 'formPhonePlaceholder', title: 'Форма — Поле Телефон (пример)', type: 'string' }),
    defineField({ name: 'formEmailLabel', title: 'Форма — Поле Имейл (надпис)', type: 'string' }),
    defineField({ name: 'formEmailPlaceholder', title: 'Форма — Поле Имейл (пример)', type: 'string' }),
    defineField({ name: 'formMessageLabel', title: 'Форма — Поле Съобщение (надпис)', type: 'string' }),
    defineField({ name: 'formMessagePlaceholder', title: 'Форма — Поле Съобщение (пример)', type: 'string' }),
    defineField({ name: 'formSubmitText', title: 'Форма — Бутон изпрати', type: 'string' }),
    defineField({ name: 'formLoadingText', title: 'Форма — Бутон (зарежда)', type: 'string' }),
    defineField({ name: 'formSuccessTitle', title: 'Форма — Успешно заглавие', type: 'string' }),
    defineField({ name: 'formSuccessMessage', title: 'Форма — Успешно съобщение', type: 'text', rows: 2 }),
    defineField({ name: 'formErrorMessage', title: 'Форма — Грешка съобщение', type: 'string' }),
    defineField({ name: 'formFooterNote', title: 'Форма — Бележка под формата', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Настройки на сайта' }) },
})
