import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const sessionCartId = request.cookies.get('sessionCartId')

  if (!sessionCartId) {
    const newSessionId = uuidv4()
    response.cookies.set('sessionCartId', newSessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return response
}
