import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      {modal}
      <Footer />
    </div>
  )
}
