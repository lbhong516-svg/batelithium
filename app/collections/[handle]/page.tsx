import { COLLECTIONS } from '@/lib/collections'
import CollectionContent from './CollectionContent'

export function generateStaticParams() {
  return [
    ...COLLECTIONS.map((c) => ({ handle: c.handle })),
    { handle: 'all' },
  ]
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  return <CollectionContent handle={handle} />
}
