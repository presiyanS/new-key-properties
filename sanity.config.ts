import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { HomeIcon, DocumentTextIcon, UsersIcon, InfoOutlineIcon, EnvelopeIcon, StarIcon } from '@sanity/icons'

export default defineConfig({
  name: 'new-key-properties',
  title: 'New Key Properties',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Съдържание')
          .items([
            // ── Pages ─────────────────────────────────────────────────
            S.listItem()
              .title('Начална страница')
              .icon(HomeIcon)
              .child(S.document().documentId('homePage').schemaType('homePage').title('Начална страница')),

            S.listItem()
              .title('За нас')
              .icon(InfoOutlineIcon)
              .child(S.document().documentId('aboutPage').schemaType('aboutPage').title('За нас')),

            S.listItem()
              .title('Контакти')
              .icon(EnvelopeIcon)
              .child(S.document().documentId('contactPage').schemaType('contactPage').title('Контакти')),

            S.listItem()
              .title('Безплатна консултация')
              .icon(StarIcon)
              .child(S.document().documentId('consultationPage').schemaType('consultationPage').title('Безплатна консултация')),

            S.divider(),

            // ── Content ───────────────────────────────────────────────
            S.listItem()
              .title('Имоти')
              .icon(HomeIcon)
              .child(
                S.documentTypeList('listing')
                  .title('Всички имоти')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            S.listItem()
              .title('Блог статии')
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList('blogPost')
                  .title('Всички статии')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),

            S.listItem()
              .title('Екип')
              .icon(UsersIcon)
              .child(
                S.documentTypeList('teamMember')
                  .title('Членове на екипа')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
