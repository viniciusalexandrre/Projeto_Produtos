'use client'

import React, { useState } from 'react'
import { Dispatch, SetStateAction } from 'react'

import Menu from './productContent/filters/menu'
import { Pagination } from './productContent/filters/pagination'
import SearchBar from './productContent/filters/search'
import { OrderSelect } from './productContent/filters/select'
import styles from './main.module.scss'
import { Modal } from './productContent/modal'
import { ContainerProducts, Product } from './productContent'

interface MainProps {
  query: string
  currentPage: number
  setProductList: Dispatch<SetStateAction<Product[]>>
  productList: Product[]
  order: string
  category?: string
  filters: { equipamento: string[] }
  modalOpen: boolean
  menuOpen: boolean
  setCategory: Dispatch<SetStateAction<string | undefined>>
  setFilters: Dispatch<SetStateAction<{ equipamento: string[] }>>
  setOrder: Dispatch<SetStateAction<string>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setNewProduct: Dispatch<SetStateAction<Product | undefined>>
  newProduct?: Product
}

export const MainContent = ({
  query,
  currentPage,
  setProductList,
  productList,
  order,
  category,
  filters,
  modalOpen,
  menuOpen,
  setCategory,
  setFilters,
  setOrder,
  setIsModalOpen,
  setNewProduct,
  newProduct,
}: MainProps) => {
  const [menuVisible, setMenuVisible] = useState(menuOpen)
  const totalPages = useState()

  const handleProductAdded = (product: Product) => {
    setNewProduct(product)
    setIsModalOpen(false)
  }

  const handleMenuToggle = (isVisible: boolean) => {
    setMenuVisible(isVisible)
  }

  return (
    <main
      className={`${styles.mainContent} ${menuVisible ? styles.changeBackground : ''}`}
    >
      <div
        className={`${styles.content} ${menuVisible ? styles.menuOpen : ''}`}
      >
        <Modal
          isOpen={modalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
        <Menu
          setCategory={setCategory}
          setFilters={setFilters}
          onMenuToggle={handleMenuToggle}
        />
        <div>
          <SearchBar />
          <OrderSelect
            options={[
              'Ordenar',
              'menor preco',
              'maior preco',
              'ordem crescente',
              'ordem decrescente',
            ]}
            defaultOption="Ordenar"
            setOrder={setOrder}
          />
        </div>
        <ContainerProducts
          query={query}
          currentPage={currentPage}
          productList={productList}
          setProductList={setProductList}
          order={order}
          newProduct={newProduct}
          category={category}
          filters={filters}
          menuOpen={menuVisible}
        />
        <Pagination totalPages={2} />
      </div>
    </main>
  )
}
