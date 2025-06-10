'use client'
import { Button } from '@/components/ui/button'
import { removeItemFromCart, addItemToCart } from '@/lib/actions/cart.actions'
import { round2 } from '@/lib/utils'
import { Cart, CartItem } from '@/types'
import { Loader, Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function AddToCart({
  cart,
  item,
}: {
  cart?: Cart
  item: Omit<CartItem, 'cartId'>
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)
  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await removeItemFromCart(item.productId)
            toast(
              res.success
                ? toast.success(res.message)
                : toast.error(res.message)
            )
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await addItemToCart({
              ...item,
              price: item.price,
            })
            toast(toast.success(res.message))
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart({
            ...item,
            price: round2(item.price),
          })
          if (!res.success) {
            toast(toast.error(res.message))
            return
          }
          toast(' Event has been', {
            description: `${item.name} added to the cart`,
            action: {
              label: 'Go to cart',
              onClick: () => router.push('/cart'),
            },
          })
        })
      }}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      Add to cart
    </Button>
  )
}
