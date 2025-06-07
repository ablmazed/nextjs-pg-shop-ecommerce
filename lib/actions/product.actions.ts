'use server'

// import { desc } from 'drizzle-orm'

// import db from '@/db/drizzle'
// import { products } from '@/db/schema'

// export async function getLatestProducts() {
//   const data = await db.query.products.findMany({
//     orderBy: [desc(products.createdAt)],
//     limit: 4,
//   })
//   return data
// }

import { desc } from 'drizzle-orm'
import db from '@/db/drizzle' // Your actual DB connection
import { products } from '@/db/schema' // Your schema definition

export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 4,
  })
  return data
}
