import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'

const Header = async () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/assets/icons/logo.svg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            {APP_NAME}
          </Link>
        </div>

        <div className="space-x-2">
          <Menu />
        </div>
        <div className="md:hidden block   px-5 pb-2">Search</div>
      </div>
    </header>
  )
}

export default Header
