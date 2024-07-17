//Antigo Page

'use client'

import '../styles/globals.scss'
import Image from 'next/image'
import ContainerProducts, { Product } from '@/components/product'
import { Modal } from '@/components/modal/index'
import { useState } from 'react'
import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
import { Button } from '@/components/header/button'

import { Pagination } from '@/components/product/filters/pagination'
import SearchBar from '@/components/product/filters/search'
import { OrderSelect } from '@/components/product/filters/select'
import Menu from '@/components/product/filters/menu'
import Main from '@/components/main'

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
          <Menu />
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
            newProduct={newProduct}
          />
          <Pagination totalPages={2} />
        </div>
      </main>
    </>
  )
}

// 'use client'

// import '../styles/globals.scss'
// import Image from 'next/image'
// import { Product } from '@/components/product'
// import { Modal } from '@/components/modal/index'
// import { useState } from 'react'
// import FirstLogo from '../../public/icon/Header/logo/ViniStore.svg'
// import SecondLogo from '../../public/icon/Header/logo/Vs.svg'
// import { Button } from '@/components/header/button'
// import Main from '@/components/main'

// export default function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string
//     page?: number
//   }
// }) {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen)
//   }
//   const handleProductAdded = (product: Product) => {
//     setNewProduct(product)
//     setIsModalOpen(false) // Fechar o modal após adicionar o produto
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
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onProductAdded={handleProductAdded}
//       />
//       <Main />
//     </>
//   )
// }
