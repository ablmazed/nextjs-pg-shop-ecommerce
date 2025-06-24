// app/api/auth/[...nextauth]/route.ts
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { compareSync } from 'bcrypt-ts-edge'
import { eq } from 'drizzle-orm'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import db from '@/db/drizzle'
import { carts, users } from '@/db/schema'
import { getSessionCartIdFromCookies } from '@/lib/getSessionCartId'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        })

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]
          await db
            .update(users)
            .set({
              name: token.name,
            })
            .where(eq(users.id, user.id))
        }

        token.role = user.role

        if (trigger === 'signIn' || trigger === 'signUp') {
          const sessionCartId = await getSessionCartIdFromCookies()
          if (!sessionCartId) throw new Error('Session Cart Not Found')

          const sessionCartExists = await db.query.carts.findFirst({
            where: eq(carts.sessionCartId, sessionCartId),
          })

          if (sessionCartExists && !sessionCartExists.userId) {
            const userCartExists = await db.query.carts.findFirst({
              where: eq(carts.userId, user.id),
            })

            if (!userCartExists) {
              await db
                .update(carts)
                .set({
                  userId: user.id,
                })
                .where(eq(carts.id, sessionCartExists.id))
            }

            // ⚠️ cookie.set() not allowed here — do this in client after login
          }
        }
      }

      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name
      }

      return token
    },
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub
      session.user.role = token.role
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
