// app/signin/page.tsx (or wherever your SignIn page is)

import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignInClient from './sign-in-client'
import { CardContent } from '@/components/ui/card'
import SeparatorWithOr from '@/components/shared/separator-or'
import CredentialsSignInForm from './credentials-signin-form'
import EmailSigninForm from './email-signin-form'

export default async function SignInPage() {
  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return (
    <>
      <SignInClient />
      <CardContent className="space-y-4">
        <EmailSigninForm />
        <SeparatorWithOr />
        <CredentialsSignInForm />
      </CardContent>
    </>
  )
}
