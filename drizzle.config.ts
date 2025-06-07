import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

loadEnvConfig(cwd())

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config

// // // drizzle.config.ts
// import type { Config } from 'drizzle-kit'

// export default {
//   schema: './db/schema.ts',
//   out: './drizzle/migrations',
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// } satisfies Config
