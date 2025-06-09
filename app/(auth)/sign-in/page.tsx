// app/signin/page.tsx (or wherever your SignIn page is)

import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignInClient from './sign-in-client'

export default async function SignInPage() {
  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return <SignInClient />
}
