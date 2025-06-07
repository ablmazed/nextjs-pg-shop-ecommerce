import * as schema from './schema'
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const isVercel = !!process.env.POSTGRES_URL // Vercel এ auto set হয়

const db = isVercel
  ? drizzleVercel(sql, { schema })
  : drizzleNode(
      new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
      { schema }
    )

export default db
