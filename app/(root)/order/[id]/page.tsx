import Stripe from 'stripe'
import { getOrderById } from '@/lib/actions/order.actions'
import { APP_NAME } from '@/lib/constants'
import { notFound } from 'next/navigation'
import OrderDetailsForm from './order-details-form'
import { auth } from '@/auth'

type Props = {
  params: Promise<{
    id: string
  }>
}

export const metadata = {
  title: `Order Details - ${APP_NAME}`,
}

const OrderDetailsPage = async ({ params }: Props) => {
  // params এখন Promise, তাই await করতে হবে
  const { id } = await params
  const session = await auth()
  const order = await getOrderById(id)
  if (!order) notFound()

  let client_secret = null
  if (order.paymentMethod === 'Stripe' && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: 'USD',
      metadata: { orderId: order.id },
    })
    client_secret = paymentIntent.client_secret
  }

  return (
    <OrderDetailsForm
      order={order}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      isAdmin={session?.user.role === 'admin' || false}
      stripeClientSecret={client_secret}
    />
  )
}

export default OrderDetailsPage
