import { redirect } from 'next/navigation'

export default async function QuickViewPage(params: Promise<{ slug: string }>) {
  redirect(`/product/${(await params).slug}`)
}
