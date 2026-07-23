import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'

export const neighborhoodType = defineType({
  name: 'neighborhood',
  title: 'Квартален наръчник',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'Име на квартала', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'nameEn', title: 'Име на квартала (EN, транслитерация)', type: 'string', description: 'Напр. "Lozenets" за "Лозенец" — показва се на /en сайта' }),
    defineField({ name: 'slug', title: 'URL (slug)', type: 'slug', options: { source: 'name', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Кратък слоган', type: 'string' }),
    defineField({ name: 'taglineEn', title: 'Кратък слоган (EN)', type: 'string', description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 8 }),
    defineField({ name: 'descriptionEn', title: 'Описание (EN)', type: 'text', rows: 8, description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'transport', title: 'Транспорт и достъпност', type: 'text', rows: 3 }),
    defineField({ name: 'transportEn', title: 'Транспорт и достъпност (EN)', type: 'text', rows: 3, description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'priceRangeSale', title: 'Ценови диапазон — продажба', type: 'string', description: 'Напр. 2 000 – 3 500 €/кв.м' }),
    defineField({ name: 'priceRangeRent', title: 'Ценови диапазон — наем', type: 'string', description: 'Напр. 700 – 1 400 €/мес.' }),
    defineField({ name: 'targetAudience', title: 'За кого е подходящ', type: 'text', rows: 3 }),
    defineField({ name: 'targetAudienceEn', title: 'За кого е подходящ (EN)', type: 'text', rows: 3, description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'pros', title: 'Предимства', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'prosEn', title: 'Предимства (EN)', type: 'array', of: [{ type: 'string' }], description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'cons', title: 'Недостатъци', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'consEn', title: 'Недостатъци (EN)', type: 'array', of: [{ type: 'string' }], description: 'Английски превод — показва се на /en сайта' }),
    defineField({ name: 'externalImageUrl', title: 'Снимка (URL)', type: 'url' }),
    defineField({ name: 'metaDescription', title: 'SEO описание (до 155 знака)', type: 'string' }),
    defineField({ name: 'metaDescriptionEn', title: 'SEO описание (EN, до 155 знака)', type: 'string', description: 'Английски превод — показва се на /en сайта' }),
    defineField({
      name: 'faq',
      title: 'Често задавани въпроси (FAQ)',
      description: 'Въпроси и отговори за квартала — появяват се на страницата и в Google като rich results.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Въпрос',
          fields: [
            defineField({ name: 'question', title: 'Въпрос', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'questionEn', title: 'Въпрос (EN)', type: 'string', description: 'Английски превод — показва се на /en сайта' }),
            defineField({ name: 'answer', title: 'Отговор', type: 'text', rows: 4, validation: (r) => r.required() }),
            defineField({ name: 'answerEn', title: 'Отговор (EN)', type: 'text', rows: 4, description: 'Английски превод — показва се на /en сайта' }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({ name: 'seoKeywords', title: 'SEO ключови думи (вътрешно)', type: 'string', description: 'Наредени с запетая, само за вътрешна справка' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
})
