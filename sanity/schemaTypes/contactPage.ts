import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Контакти',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle', title: 'Hero — Заглавие', type: 'string' }),
    defineField({ name: 'heroTitleGold', title: 'Hero — Златна фраза', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Подзаглавие', type: 'text', rows: 2 }),

    // ── Contact info section ──────────────────────────────────────────
    defineField({ name: 'contactInfoLabel', title: 'Контакт секция — Малък надпис', type: 'string' }),
    defineField({ name: 'contactInfoTitle', title: 'Контакт секция — Заглавие', type: 'string' }),

    // ── Contact info ──────────────────────────────────────────────────
    defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
    defineField({ name: 'phoneHours', title: 'Работно време', type: 'string', description: 'Пр. Пон – Пет: 09:00 – 18:00, Сб: 10:00 – 15:00' }),
    defineField({ name: 'email', title: 'Имейл', type: 'string' }),
    defineField({ name: 'emailNote', title: 'Имейл — бележка', type: 'string', description: 'Пр. Отговаряме в рамките на 24 часа' }),
    defineField({ name: 'address', title: 'Адрес', type: 'string' }),
    defineField({ name: 'addressNote', title: 'Адрес — бележка', type: 'string' }),

    // ── Urgency box ───────────────────────────────────────────────────
    defineField({ name: 'urgencyTitle', title: 'Спешност — Заглавие', type: 'string' }),
    defineField({ name: 'urgencyMessage', title: 'Спешност — Съобщение', type: 'text', rows: 3 }),

    // ── Form section ──────────────────────────────────────────────────
    defineField({ name: 'formTitle', title: 'Форма — Заглавие', type: 'string' }),
    defineField({ name: 'formSubtitle', title: 'Форма — Подзаглавие', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Контакти' }) },
})
