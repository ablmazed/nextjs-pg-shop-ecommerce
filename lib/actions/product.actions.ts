'use server'

import db from '@/db/drizzle'
import { products } from '@/db/schema'
import { and, count, desc, eq, ilike, sql } from 'drizzle-orm'
import { PAGE_SIZE } from '../constants'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'
import { formatError } from '../utils'

export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 4,
  })
  return data
}

export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug),
  })
}

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  category: string
  limit?: number
  page: number
  price?: string
  rating?: string
  sort?: string
}) {
  const queryFilter =
    query && query !== 'all' ? ilike(products.name, `%${query}%`) : undefined
  const categoryFilter =
    category && category !== 'all' ? eq(products.category, category) : undefined
  const ratingFilter =
    rating && rating !== 'all'
      ? sql`${products.rating} >= ${rating}`
      : undefined
  const priceFilter =
    price && price !== 'all'
      ? sql`${products.price} >= ${price.split('-')[0]} AND ${
          products.price
        } <= ${price.split('-')[1]}`
      : undefined
  const order =
    sort === 'lowest'
      ? products.price
      : sort === 'highest'
      ? desc(products.price)
      : sort === 'rating'
      ? desc(products.rating)
      : desc(products.createdAt)

  const condition = and(queryFilter, categoryFilter, ratingFilter, priceFilter)
  const data = await db
    .select()
    .from(products)
    .where(condition)
    .orderBy(order)
    .offset((page - 1) * limit)
    .limit(limit)

  const dataCount = await db
    .select({ count: count() })
    .from(products)
    .where(condition)

  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

// DELETE
export async function deleteProduct(id: string) {
  try {
    const productExists = await db.query.products.findFirst({
      where: eq(products.id, id),
    })
    if (!productExists) throw new Error('Product not found')
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function getAllCategories() {
  const data = await db
    .selectDistinctOn([products.category], { name: products.category })
    .from(products)
    .orderBy(products.category)
  return data
}
export async function getFeaturedProducts() {
  const data = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
    orderBy: [desc(products.createdAt)],
    limit: 4,
  })
  return data
}
