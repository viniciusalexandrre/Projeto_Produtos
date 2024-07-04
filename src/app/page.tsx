'use client'

import '../styles/globals.scss'
import Image from 'next/image'
import ContainerProducts, { Product } from '@/components/product'
import { Modal } from '@/components/modal/index'
import { useState } from 'react'
import FirstLogo from '../../public/icon/ViniStore.svg'
import SecondLogo from '../../public/icon/Vs.svg'
import { Button } from '@/components/header/button'

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)

  const handleProductAdded = (product: Product) => {
    setNewProduct(product)
  }

  return (
    <>
      <header>
        <div>
          <div>
            <Image
              src={FirstLogo}
              alt="Logo"
              unoptimized
              style={{ width: '100%', maxWidth: '302px', height: '46px' }}
            />
            <Image
              src={SecondLogo}
              alt='"Logo'
              unoptimized
              style={{ width: '100%', maxWidth: '52px', height: '55px' }}
            />
          </div>
          <Button
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
        </div>
      </header>
      <main>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onProductAdded={handleProductAdded}
        ></Modal>
        <ContainerProducts newProduct={newProduct} />
      </main>
    </>
  )
}

export default Page
