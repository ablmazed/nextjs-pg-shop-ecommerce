// lib/getSessionCartId.ts
'use server'
import { cookies } from 'next/headers'

export async function getSessionCartIdFromCookies() {
  const cookieStore = cookies()
  return (await cookieStore).get('sessionCartId')?.value
}
