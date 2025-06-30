import EcommerceFeatures from '@/components/shared/product/ecommerce-features'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ProductList from '@/components/shared/product/product-list'
import ProductPromotion from '@/components/shared/product/product-promotion'
import {
  getFeaturedProducts,
  getLatestProducts,
} from '@/lib/actions/product.actions'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

const latestProducts = await getLatestProducts()
const featuredProducts = await getFeaturedProducts()

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_DESCRIPTION}`,
}

export default async function Home() {
  const latestProducts = await getLatestProducts()
  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      <ProductList title="Newest Arrivals" data={latestProducts} />
      <ProductPromotion />
      <EcommerceFeatures />
    </div>
  )
}
