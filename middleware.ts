import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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

  // Forward pathname as header so root layout can read it
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
