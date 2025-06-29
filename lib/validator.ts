import { z } from 'zod'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { formatNumberWithDecimal } from './utils'
import { PAYMENT_METHODS } from './constants'
import { orderItems, orders, products, reviews } from '@/db/schema'

// USER
export const signInFormSchema = z.object({
  email: z.string().email().min(3, 'Email must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
})

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email().min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z
      .string()
      .min(3, 'Confirm password must be at least 3 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email().min(3, 'Email must be at least 3 characters'),
})

// PRODUCT
export const insertProductSchema = createSelectSchema(products, {
  // images: z.array(z.string()).min(1, 'Product must have at least one image'),
  // stock: z.coerce.number().min(0, 'Stock must be at least 0'),
}).omit({
  id: true,
  rating: true,
  numReviews: true,
  createdAt: true,
})

export const updateProductSchema = createSelectSchema(products, {
  // images: z.array(z.string()).min(1, 'Product must have at least one image'),
  // stock: z.coerce.number().min(0, 'Stock must be at least 0'),
}).omit({
  rating: true,
  numReviews: true,
  createdAt: true,
})

// export const insertReviewSchema = createInsertSchema(reviews, {
//   rating: z.coerce
//     .number()
//     .int()
//     .min(1, 'Rating must be at least 1')
//     .max(5, 'Rating must be at most 5'),
// })

// CART
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number().int().nonnegative('Quantity must be a non-negative number'),
  image: z.string().min(1, 'Image is required'),
  price: z
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      'Price must have exactly two decimal places (e.g., 49.99)'
    ),
})
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'city must be at least 3 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method is required'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  })

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})

export const insertOrderSchema = createInsertSchema(
  orders
  //    {
  //   shippingAddress: shippingAddressSchema,
  //   paymentResult: z
  //     .object({
  //       id: z.string(),
  //       status: z.string(),
  //       email_address: z.string(),
  //       pricePaid: z.string(),
  //     })
  //     .optional(),
  // }
)

export const insertOrderItemSchema = createInsertSchema(
  orderItems
  //   {
  //   price: z.number(),
  // }
)

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id is required'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  role: z.string().min(1, 'Role is required'),
})

// export const insertReviewSchema = createInsertSchema(
//   reviews
//   //   {
//   //   rating: z.coerce
//   //     .number()
//   //     .int()
//   //     .min(1, 'Rating must be at least 1')
//   //     .max(5, 'Rating must be at most 5'),
//   // }
// )

// export const insertReviewSchema = z.object({
//   id: z.string().uuid().optional(),
//   userId: z.string().uuid(),
//   productId: z.string().uuid(),
//   rating: z.number().int().min(1).max(5),
//   title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
//   description: z
//     .string()
//     .min(1, 'Description is required')
//     .max(1000, 'Description too long'),
//   isVerifiedPurchase?: z.boolean().optional().default(false),
//   createdAt: z.date().optional(),
// })

// আপনার validator file এ insertReviewSchema check করুন
export const insertReviewSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  rating: z.number().min(1).max(5),
  isVerifiedPurchase: z.boolean().optional(), // অথবা .default(false)
  id: z.string().optional(),
  createdAt: z.date().optional(),
})
