import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify'
import { COLLECTIONS } from '@/lib/collections'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://batelithium.vercel.app'
  const products = await getAllProducts()

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/all`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ]

  const collectionPages = COLLECTIONS.map((c) => ({
    url: `${baseUrl}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...collectionPages, ...productPages]
}
