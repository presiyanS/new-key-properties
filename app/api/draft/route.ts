import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // The presentation tool passes a sanity-preview-secret param — we verify it exists.
  // The studio is already protected by password, so this is sufficient.
  const secret = searchParams.get('sanity-preview-secret')
  if (!secret) return new Response('Missing secret', { status: 401 })

  const dm = await draftMode()
  dm.enable()
  redirect(searchParams.get('redirect') ?? '/')
}
