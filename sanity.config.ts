import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { HomeIcon, DocumentTextIcon, UsersIcon } from '@sanity/icons'

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
            S.listItem()
              .title('Имоти')
              .icon(HomeIcon)
              .child(
                S.documentTypeList('listing')
                  .title('Всички имоти')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Блог статии')
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList('blogPost')
                  .title('Всички статии')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.divider(),
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
