import Link from 'next/link'
import '../styles/globals.scss'
import Image from 'next/image'
import ImageBackground from '../../public/images/background.jpg'
import localFont from 'next/font/local'
import { GetServerSideProps } from 'next'
import ContainerProducts from '@/components/product'

const font_primary = localFont({
  src: './fonts/mona-sans/TTF/Mona-Sans-BoldWide.ttf',
  display: 'swap',
})

interface Product {
  id: number
  name: string
  equipamento: string
  price: number
  image: string
}

interface PageProps {
  products: Product[]
}

const Page = ({ products }: PageProps) => {
  return (
    <div>
      <header>
        <div>
          <h1 className={font_primary.className}>Vini Store</h1>
        </div>
        <button>
          <Link href={'/'}>
            <span className={font_primary.className}>ADICIONAR</span>
          </Link>
        </button>
      </header>
      <main>
        {/* <Image
          src={ImageBackground}
          alt="teste"
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        /> */}
        <ContainerProducts products={products} />
      </main>
    </div>
  )
}

export default Page
