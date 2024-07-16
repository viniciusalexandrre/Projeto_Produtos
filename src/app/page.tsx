// 'use client'

// import '../styles/globals.scss'
// import Image from 'next/image'
// import ContainerProducts, { Product } from '@/components/product'
// import { Modal } from '@/components/modal/index'
// import { useEffect, useState } from 'react'
// import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
// import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
// import { Button } from '@/components/header/button'
// import { Menu } from '@/components/product/filters/menu'
// import { Pagination } from '@/components/product/filters/pagination'
// import SearchBar from '@/components/product/filters/search'
// import { OrderSelect } from '@/components/product/filters/select'

// export default function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string
//     page?: number
//     category?: string
//   }
// }) {
//   const query = searchParams?.query ?? ''
//   const currentPage = Number(searchParams?.page) || 1
//   const category = searchParams?.category ?? ''
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)
//   const [product, setProduct] = useState([])

//   const handleProductAdded = (product: Product) => {
//     setNewProduct(product)
//     setIsModalOpen(false)
//   }
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen)
//   }
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch(`/?page=${currentPage}=${query}`)
//       const products = await response.json()
//       setProduct(products)
//     }
//     fetchProducts()
//   }, [query, currentPage])

//   console.log('page:', query)

//   return (
//     <>
//       <header>
//         <div>
//           <div>
//             <Image
//               src={FirstLogo}
//               alt="Logo"
//               unoptimized
//               style={{ width: '100%', maxWidth: '302px', height: '46px' }}
//               priority={false}
//             />
//             <Image
//               src={SecondLogo}
//               alt="Logo"
//               unoptimized
//               style={{ width: '100%', maxWidth: '52px', height: '55px' }}
//             />
//           </div>
//           <Button onClick={toggleModal} />
//         </div>
//       </header>
//       <main>
//         <div>
//           <Modal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             onProductAdded={handleProductAdded}
//           />
//           <Menu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//           <div>
//             <SearchBar />
//             <OrderSelect
//               options={[
//                 'Ordenar',
//                 'Menor Preco',
//                 'Maior Preco',
//                 'Ordem Crescente',
//                 'Ordem Decrescente',
//               ]}
//               defaultOption="Ordenar"
//               data={query}
//               setData={setProduct}
//             />
//           </div>
//           <ContainerProducts
//             newProduct={newProduct}
//             query={query}
//             currentPage={currentPage}
//             category={category}
//           />
//           <Pagination totalPages={2} />
//         </div>
//       </main>
//     </>
//   )
// }

// 'use client'

// import '../styles/globals.scss'
// import Image from 'next/image'
// import ContainerProducts, { Product } from '@/components/product'
// import { Modal } from '@/components/modal/index'
// import { useState } from 'react'
// import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
// import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
// import { Button } from '@/components/header/button'
// import { Menu } from '@/components/product/filters/menu'

// import { Pagination } from '@/components/product/filters/pagination'
// import SearchBar from '@/components/product/filters/search'
// import { OrderSelect } from '@/components/product/filters/select'

// export default function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string
//     page?: number
//   }
// }) {
//   const query = searchParams?.query || ''
//   const currentPage = Number(searchParams?.page) || 1
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)
//   const [productList, setProductList] = useState<Product[]>([])
//   const [order, setOrder] = useState<string>('')

//   const handleProductAdded = (product: Product) => {
//     setNewProduct(product)
//     setIsModalOpen(false)
//   }

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen)
//   }

//   return (
//     <>
//       <header>
//         <div>
//           <div>
//             <Image
//               src={FirstLogo}
//               alt="Logo"
//               unoptimized
//               style={{ width: '100%', maxWidth: '302px', height: '46px' }}
//               priority={false}
//             />
//             <Image
//               src={SecondLogo}
//               alt="Logo"
//               unoptimized
//               style={{ width: '100%', maxWidth: '52px', height: '55px' }}
//             />
//           </div>
//           <Button onClick={toggleModal} />
//         </div>
//       </header>
//       <main>
//         <div>
//           <Modal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             onProductAdded={handleProductAdded}
//           />
//           <Menu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//           <div>
//             <SearchBar />
//             <OrderSelect
//               options={[
//                 {label:'Ordenar', value: ''},
//                 {label:'Menor Preco', value: ''}
//                 'Maior Preco',
//                 'Ordem Crescente',
//                 'Ordem Decrescente',
//               ]}
//               defaultOption="Ordenar"
//               setOrder={setOrder}
//               data={[]}
//             />
//           </div>
//           <ContainerProducts
//             query={query}
//             currentPage={currentPage}
//             productList={productList}
//             setProductList={setProductList}
//             order={order}
//           />
//           <Pagination totalPages={2} />
//         </div>
//       </main>
//     </>
//   )
// }

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

import { Pagination } from '@/components/product/filters/pagination'
import SearchBar from '@/components/product/filters/search'
import { OrderSelect } from '@/components/product/filters/select'

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
  const [order, setOrder] = useState<string>('OrdemCrescente')

  const handleProductAdded = (product: Product) => {
    setNewProduct(product)
    setIsModalOpen(false) // Fechar o modal após adicionar o produto
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
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
              alt="Logo"
              unoptimized
              style={{ width: '100%', maxWidth: '52px', height: '55px' }}
            />
          </div>
          <Button onClick={toggleModal} />
        </div>
      </header>
      <main>
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onProductAdded={handleProductAdded}
          />
          <Menu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <div>
            <SearchBar />
            <OrderSelect
              options={[
                'Ordenar',
                'menor Preco',
                'maior Preco',
                'Ordem Crescente',
                'Ordem Decrescente',
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
          />
          <Pagination totalPages={3} />
        </div>
      </main>
    </>
  )
}
