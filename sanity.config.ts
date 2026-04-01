import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemaTypes'
import { HomeIcon, DocumentTextIcon, UsersIcon, InfoOutlineIcon, EnvelopeIcon, StarIcon, CogIcon } from '@sanity/icons'

const previewOrigin = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000')

const stagingPreviewOrigin = 'https://new-key-properties-mqef43q92-presiyans-projects-e2f8b3d2.vercel.app'

function buildPlugins(previewUrl?: string) {
  return [
    presentationTool({
      previewUrl: {
        origin: previewUrl ?? previewOrigin,
        draftMode: { enable: '/api/draft' },
      },
    }),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Съдържание')
          .items([
            S.listItem().title('Начална страница').icon(HomeIcon).child(S.document().documentId('homePage').schemaType('homePage').title('Начална страница')),
            S.listItem().title('За нас').icon(InfoOutlineIcon).child(S.document().documentId('aboutPage').schemaType('aboutPage').title('За нас')),
            S.listItem().title('Контакти').icon(EnvelopeIcon).child(S.document().documentId('contactPage').schemaType('contactPage').title('Контакти')),
            S.listItem().title('Безплатна консултация').icon(StarIcon).child(S.document().documentId('consultationPage').schemaType('consultationPage').title('Безплатна консултация')),
            S.listItem().title('Блог страница').icon(DocumentTextIcon).child(S.document().documentId('blogPage').schemaType('blogPage').title('Блог страница')),
            S.listItem().title('Екипът ни страница').icon(UsersIcon).child(S.document().documentId('teamPage').schemaType('teamPage').title('Екипът ни страница')),
            S.listItem().title('Имоти страница').icon(HomeIcon).child(S.document().documentId('listingsPage').schemaType('listingsPage').title('Имоти страница')),
            S.listItem().title('Общи настройки').icon(CogIcon).child(S.document().documentId('siteSettings').schemaType('siteSettings').title('Общи настройки')),
            S.divider(),
            orderableDocumentListDeskItem({ type: 'listing', title: 'Имоти', icon: HomeIcon, S, context }),
            S.listItem().title('Блог статии').icon(DocumentTextIcon).child(S.documentTypeList('blogPost').title('Всички статии').defaultOrdering([{ field: 'date', direction: 'desc' }])),
            S.listItem().title('Екип').icon(UsersIcon).child(S.documentTypeList('teamMember').title('Членове на екипа').defaultOrdering([{ field: 'order', direction: 'asc' }])),
          ]),
    }),
    visionTool(),
  ]
}

export default defineConfig([
  {
    name: 'production',
    title: 'New Key Properties',
    basePath: '/studio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    plugins: buildPlugins(),
    schema: { types: schemaTypes },
  },
  {
    name: 'staging',
    title: 'New Key Properties — STAGING',
    basePath: '/studio-staging',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: 'staging',
    plugins: buildPlugins(stagingPreviewOrigin),
    schema: { types: schemaTypes },
  },
])
