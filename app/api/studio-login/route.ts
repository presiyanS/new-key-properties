import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password, next } = await request.json()

  // Staging studio login
  if (next === '/studio-staging') {
    if (password === 'newkey2024') {
      const response = NextResponse.json({ ok: true })
      response.cookies.set('studio_staging_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      return response
    }
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // Main studio login
  const correct = process.env.STUDIO_PASSWORD
  if (password === correct) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('studio_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
