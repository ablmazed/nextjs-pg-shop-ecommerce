'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getMyCart } from '@/lib/actions/cart.actions'
import { useEffect, useState } from 'react'
import { Cart } from '@/types'

export default function CartButton() {
  const [cart, setCart] = useState<Cart | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getMyCart()
      setCart(res ?? null) // handle undefined safely
    }
    fetchCart()
  }, [])

  const itemCount = cart?.items?.reduce((a, c) => a + c.qty, 0) || 0

  return (
    <Button asChild variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="mr-1" />
        Cart
        {itemCount > 0 && <Badge className="ml-1">{itemCount}</Badge>}
      </Link>
    </Button>
  )
}
