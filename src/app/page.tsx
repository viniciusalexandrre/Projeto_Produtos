'use client'

import '../styles/globals.scss'
import Image from 'next/image'
import ContainerProducts, { Product } from '@/components/product'
import { Modal } from '@/components/modal/index'
import { useState } from 'react'
import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
import { Button } from '@/components/header/button'
import { Menu } from '@/components/product/filters/menu'
import { Search } from '@/components/product/filters/search'
import OrderSelect from '@/components/product/filters/select'
import { Pagination } from '@/components/product/filters/pagination'

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
              priority={false}
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
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
            }}
            onProductAdded={handleProductAdded}
          ></Modal>
          <Menu
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
            }}
          />
          <div>
            <Search />
            <OrderSelect />
          </div>
          <ContainerProducts newProduct={newProduct} />
          <Pagination />
        </div>
      </main>
    </>
  )
}

export default Page
