import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const ALL_TAGS = [
  'listings', 'blog', 'team', 'home-page', 'about-page', 'contact-page',
  'consultation-page', 'site-settings', 'blog-page', 'team-page', 'listings-page', 'neighborhoods',
]

// Maps a Sanity document `_type` to the cache tag(s) it affects — lets this
// route double as a Sanity webhook target later without changes, and lets
// scripts request revalidation by document type instead of memorizing tags.
const TYPE_TO_TAGS: Record<string, string[]> = {
  listing: ['listings', 'home-page'],
  blogPost: ['blog'],
  teamMember: ['team'],
  neighborhood: ['neighborhoods'],
  homePage: ['home-page'],
  aboutPage: ['about-page'],
  contactPage: ['contact-page'],
  consultationPage: ['consultation-page'],
  siteSettings: ['site-settings'],
  blogPage: ['blog-page'],
  teamPage: ['team-page'],
  listingsPage: ['listings-page'],
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))

  let tags: string[]
  if (Array.isArray(body.tags) && body.tags.length > 0) {
    tags = body.tags
  } else if (typeof body._type === 'string' && TYPE_TO_TAGS[body._type]) {
    // Sanity webhook payload shape: { _type, _id, ... }
    tags = TYPE_TO_TAGS[body._type]
  } else {
    // No hint given — revalidate everything.
    tags = ALL_TAGS
  }

  const applied = tags.filter((t) => ALL_TAGS.includes(t))
  for (const tag of applied) revalidateTag(tag, 'max')

  return NextResponse.json({ revalidated: applied })
}
