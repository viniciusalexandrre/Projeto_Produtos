'use client'

import Link from 'next/link'
import '../styles/globals.scss'
import Image from 'next/image'
import ImageBackground from '../../public/images/background.jpg'
import localFont from 'next/font/local'
import { GetServerSideProps } from 'next'
import ContainerProducts from '@/components/product'
import { Modal } from '@/components/modal/modal'
import { useState } from 'react'
import IconAdd from '../../public/icon/add_icon.svg'

export const font_primary = localFont({
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header>
        <div>
          <div>
            <h1 className={font_primary.className}>Vini Store</h1>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            <Link href={'/'}>
              <span className={font_primary.className}>ADICIONAR</span>
            </Link>
          </button>
          <button>
            <Link href={'/'}>
              <Image src={IconAdd} alt="Icon Adição" />
            </Link>
          </button>
        </div>
      </header>
      <main>
        {/* <Image
          src={ImageBackground}
          alt="teste"
          sizes="100vw"
          style={{
            width: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
        /> */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
        >
          <p>Teste</p>
        </Modal>
        <ContainerProducts products={products} />
      </main>
    </>
  )
}

export default Page
