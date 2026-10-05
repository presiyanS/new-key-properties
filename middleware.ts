import { NextRequest, NextResponse } from 'next/server'

// Looks up the readable slug for an old-style /listings/<raw-sanity-id> link.
// Listing slugs are always "<neighborhood>-<code>" (so they contain a hyphen);
// raw Sanity ids never do — that lets us skip this Sanity call entirely for
// the normal case and only pay for it on legacy links.
async function resolveLegacyListingSlug(id: string): Promise<string | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '9gz26s06'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  const query = encodeURIComponent('*[_type == "listing" && _id == $id][0].slug.current')
  const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}&$id=${encodeURIComponent(JSON.stringify(id))}`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.result === 'string' ? data.result : null
  } catch {
    return null
  }
}

// For a readable /listings/<slug> link, reports whether the listing is live
// ('live'), still exists but is marked "Скрит" in Studio ('hidden'), or is gone
// entirely - deleted or unpublished ('gone'). Uses the public API, which only
// ever sees published documents. Returns null on any error so a Sanity hiccup
// never redirects a real listing away.
async function listingSlugState(slug: string): Promise<'live' | 'hidden' | 'gone' | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '9gz26s06'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  const query = encodeURIComponent('*[_type == "listing" && slug.current == $slug][0]{ "status": coalesce(status, "active") }')
  const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}&$slug=${encodeURIComponent(JSON.stringify(slug))}`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (!('result' in data)) return null
    if (data.result === null) return 'gone'
    return data.result.status === 'hidden' ? 'hidden' : 'live'
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname: rawPathname } = request.nextUrl

  // English locale is served under an /en prefix; strip it so the rest of
  // this function (and the app's routes) only ever see the Bulgarian path.
  const isEnglish = rawPathname === '/en' || rawPathname.startsWith('/en/')
  const locale = isEnglish ? 'en' : 'bg'
  const pathname = isEnglish ? rawPathname.slice(3) || '/' : rawPathname

  // Protect /post-generator (but not the login page itself)
  if (pathname.startsWith('/post-generator') && !pathname.startsWith('/post-generator/login')) {
    const auth = request.cookies.get('pg_auth')?.value
    if (auth !== 'true') {
      const loginUrl = new URL('/post-generator/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect /studio-staging with its own password
  if (pathname.startsWith('/studio-staging')) {
    const auth = request.cookies.get('studio_staging_auth')?.value
    if (auth !== 'true') {
      return NextResponse.redirect(new URL('/nkp-admin?next=/studio-staging', request.url))
    }
  }

  // Protect /studio — redirect to secret login page if not authenticated
  if (pathname.startsWith('/studio') && !pathname.startsWith('/studio-staging')) {
    const auth = request.cookies.get('studio_auth')?.value
    if (auth !== 'true') {
      return NextResponse.redirect(new URL('/nkp-admin', request.url))
    }
  }

  // Old /listings/<raw-id> links → permanent redirect to the readable slug URL
  const legacyListingMatch = pathname.match(/^\/listings\/([^/]+)$/)
  if (legacyListingMatch && !legacyListingMatch[1].includes('-')) {
    const slug = await resolveLegacyListingSlug(legacyListingMatch[1])
    if (slug) {
      const newPath = `/listings/${slug}`
      const target = new URL((isEnglish ? `/en${newPath}` : newPath) + request.nextUrl.search, request.url)
      return NextResponse.redirect(target, 308)
    }
  }

  // Removed or hidden listings → send visitors (and Google) to the listings
  // page with a real redirect status, instead of a "not found" page that
  // Next.js can only serve as 200 here (see streaming note in the route).
  // Gone for good → 308 (permanent); hidden → 307 (temporary), so it can be
  // un-hidden later without browsers having cached the redirect forever.
  if (legacyListingMatch && legacyListingMatch[1].includes('-')) {
    const state = await listingSlugState(legacyListingMatch[1])
    if (state === 'gone' || state === 'hidden') {
      const target = new URL(isEnglish ? '/en/listings' : '/listings', request.url)
      return NextResponse.redirect(target, state === 'gone' ? 308 : 307)
    }
  }

  // Forward pathname/locale as headers so the root layout can read them
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  requestHeaders.set('x-locale', locale)

  if (isEnglish) {
    const rewriteUrl = new URL(pathname + request.nextUrl.search, request.url)
    return NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
