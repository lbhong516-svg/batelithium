import HomePageClient from '@/components/HomePageClient'
import { getAllProducts } from '@/lib/shopify'

export default async function HomePage() {
  const products = await getAllProducts()
  return <HomePageClient products={products} />
}
