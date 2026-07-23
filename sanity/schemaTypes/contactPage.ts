import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Контакти',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleEn', title: 'Hero — Заглавие (English)', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна фраза', type: 'string' }),
    defineField({ name: 'heroTitleGoldEn', title: 'Hero — Златна фраза (English)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubtitleEn', title: 'Hero — Подзаглавие (English)', type: 'text', rows: 2 }),

    // ── Contact info section ──────────────────────────────────────────
    defineField({ name: 'contactInfoLabel', title: 'Контакт секция — Малък надпис', type: 'string' }),
    defineField({ name: 'contactInfoLabelEn', title: 'Контакт секция — Малък надпис (English)', type: 'string' }),
    defineField({ name: 'contactInfoTitle', title: 'Контакт секция — Заглавие', type: 'string' }),
    defineField({ name: 'contactInfoTitleEn', title: 'Контакт секция — Заглавие (English)', type: 'string' }),

    // ── Contact info ──────────────────────────────────────────────────
    defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
    defineField({ name: 'phoneHours', title: 'Работно време', type: 'string', description: 'Пр. Пон – Пет: 09:00 – 18:00, Сб: 10:00 – 15:00' }),
    defineField({ name: 'phoneHoursEn', title: 'Работно време (English)', type: 'string', description: 'e.g. Mon – Fri: 9:00 AM – 6:00 PM, Sat: 10:00 AM – 3:00 PM' }),
    defineField({ name: 'email', title: 'Имейл', type: 'string' }),
    defineField({ name: 'emailNote', title: 'Имейл — бележка', type: 'string', description: 'Пр. Отговаряме в рамките на 24 часа' }),
    defineField({ name: 'emailNoteEn', title: 'Имейл — бележка (English)', type: 'string' }),
    defineField({ name: 'address', title: 'Адрес', type: 'string' }),
    defineField({ name: 'addressEn', title: 'Адрес (English)', type: 'string' }),
    defineField({ name: 'addressNote', title: 'Адрес — бележка', type: 'string' }),
    defineField({ name: 'addressNoteEn', title: 'Адрес — бележка (English)', type: 'string' }),

    // ── Urgency box ───────────────────────────────────────────────────
    defineField({ name: 'urgencyTitle', title: 'Спешност — Заглавие', type: 'string' }),
    defineField({ name: 'urgencyTitleEn', title: 'Спешност — Заглавие (English)', type: 'string' }),
    defineField({ name: 'urgencyMessage', title: 'Спешност — Съобщение', type: 'text', rows: 3 }),
    defineField({ name: 'urgencyMessageEn', title: 'Спешност — Съобщение (English)', type: 'text', rows: 3 }),

    // ── Form section ──────────────────────────────────────────────────
    defineField({ name: 'formTitle', title: 'Форма — Заглавие', type: 'string' }),
    defineField({ name: 'formTitleEn', title: 'Форма — Заглавие (English)', type: 'string' }),
    defineField({ name: 'formSubtitle', title: 'Форма — Подзаглавие', type: 'string' }),
    defineField({ name: 'formSubtitleEn', title: 'Форма — Подзаглавие (English)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Контакти' }) },
})
