export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Amazona Modern'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An Amazon clone built with Next.js, Postgres, Shgfdgdfadcn'

export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery']
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 3

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user']

// export const reviewFormDefaultValues = {
//   title: '',
//   comment: '',
//   rating: 0,
// }

// constants file এ
export const reviewFormDefaultValues = {
  userId: '',
  productId: '',
  title: '',
  description: '',
  rating: 1,
  isVerifiedPurchase: false, // যদি schema তে থাকে
}
