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
