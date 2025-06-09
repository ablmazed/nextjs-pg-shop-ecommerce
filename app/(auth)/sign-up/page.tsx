import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignUpClient from './sign-up-client'
export default async function SignInPage() {
  const session = await auth()
  if (session) {
    return redirect('/')
  }
  return <SignUpClient />
}
