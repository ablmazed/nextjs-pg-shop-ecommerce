import { redirect } from 'next/navigation'

export default function QuickViewPage(context: {
  params: Promise<{ slug: string }>
}) {
  redirect(`/product/${context.params.slug}`)
}
