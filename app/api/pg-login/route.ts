import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correct = process.env.POST_GENERATOR_PASSWORD

  if (password === correct) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('pg_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
