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

  // Protect /studio — redirect to secret login page if not authenticated
  if (pathname.startsWith('/studio')) {
    const auth = request.cookies.get('studio_auth')?.value
    if (auth !== 'true') {
      return NextResponse.redirect(new URL('/nkp-admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/post-generator/:path*', '/studio/:path*', '/studio'],
}
