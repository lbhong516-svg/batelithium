const SHOPIFY_DOMAIN = 'd9db04-dd.myshopify.com'

export interface ShopifyProduct {
  id: number
  title: string
  handle: string
  body_html: string
  vendor: string
  product_type: string
  tags: string
  variants: ShopifyVariant[]
  images: ShopifyImage[]
  image: ShopifyImage
}

export interface ShopifyVariant {
  id: number
  title: string
  price: string
  compare_at_price: string | null
  sku: string
  inventory_quantity: number
}

export interface ShopifyImage {
  id: number
  src: string
  alt: string | null
  width: number
  height: number
}

export interface ShopifyCollection {
  id: number
  handle: string
  title: string
  body_html: string
  image: ShopifyImage | null
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/products.json?limit=250`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.products || []
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/products/${handle}.json`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.product || null
}

export async function getCollectionProducts(handle: string): Promise<ShopifyProduct[]> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/collections/${handle}/products.json?limit=250`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.products || []
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseInt(price, 10) : price
  if (!num || num <= 1) return 'Liên hệ báo giá'
  return num.toLocaleString('vi-VN') + '₫'
}

export function getCartAddUrl(variantId: number): string {
  return `https://${SHOPIFY_DOMAIN}/cart/add`
}

export function getCheckoutUrl(): string {
  return `https://${SHOPIFY_DOMAIN}/cart`
}

export const SHOPIFY_STORE_DOMAIN = SHOPIFY_DOMAIN
