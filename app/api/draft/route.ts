import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const token = process.env.SANITY_API_WRITE_TOKEN!

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '9gz26s06',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

export async function GET(req: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(sanityClient, req.url)
  if (!isValid) return new Response('Invalid preview secret', { status: 401 })
  const dm = await draftMode()
  dm.enable()
  redirect(redirectTo)
}
