'use client'

import '../styles/globals.scss'
import Image from 'next/image'
import { useState } from 'react'
import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
import { Button } from '@/components/header/button'
import { MainContent } from '@/components/main'
import { Product } from '@/components/main/productContent'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: number
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)
  const [productList, setProductList] = useState<Product[]>([])
  const [order, setOrder] = useState<string>('')
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<{ equipamento: string[] }>({
    equipamento: [],
  })

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleProductAdded = (product: Product) => {
    setNewProduct(product)
    setIsModalOpen(false)
  }

  const [menuOpen, setMenuOpen] = useState(false)

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
              alt="Logo"
              unoptimized
              style={{ width: '100%', maxWidth: '52px', height: '55px' }}
            />
          </div>
          <Button onClick={toggleModal} />
        </div>
      </header>
      <MainContent
        query={query}
        currentPage={currentPage}
        setProductList={setProductList}
        productList={productList}
        order={order}
        category={category}
        filters={filters}
        modalOpen={isModalOpen}
        setCategory={setCategory}
        setFilters={setFilters}
        setOrder={setOrder}
        setIsModalOpen={setIsModalOpen}
        setNewProduct={setNewProduct}
        newProduct={newProduct}
        menuOpen={menuOpen}
      />
    </>
  )
}
