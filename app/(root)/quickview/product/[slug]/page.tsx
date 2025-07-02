import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function QuickViewPage({ params }: Props) {
  const { slug } = await params
  redirect(`/product/${slug}`)
}
