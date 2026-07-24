import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { getListingForWebhook } from '@/lib/sanity'
import { sendListingToMakeWebhook } from '@/lib/makeWebhook'

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

  // Sanity webhook (create/update, filtered to _type == "listing" in the
  // dashboard trigger) — forward the listing to Make.com for downstream
  // automations. Fetched fresh by id rather than trusting the webhook body,
  // since the dashboard trigger's payload projection can change independently
  // of this route.
  if (body._type === 'listing' && typeof body._id === 'string') {
    const id = body._id.replace(/^drafts\./, '')
    const listing = await getListingForWebhook(id)
    if (listing) {
      await sendListingToMakeWebhook({
        id,
        code: listing.code,
        title: listing.title,
        type: listing.type,
        category: listing.category,
        price: listing.price,
        area: listing.area,
        rooms: listing.rooms,
        floor: listing.floor,
        neighborhood: listing.neighborhood,
        description: listing.description,
        imageUrl: listing.imageUrl,
        url: `https://www.newkey.bg/listings/${id}`,
        status: listing.status,
        sold: listing.status === 'sold',
      })
    }
  }

  return NextResponse.json({ revalidated: applied })
}
