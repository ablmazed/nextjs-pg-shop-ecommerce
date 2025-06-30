import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function QuickViewPage({ params }: Props) {
  redirect(`/product/${(await params).slug}`)
}
