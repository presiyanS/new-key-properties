import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
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
