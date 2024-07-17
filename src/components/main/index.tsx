import { useState } from 'react'
import { Modal } from '../modal'
import ContainerProducts, { Product } from '../product'
import Menu from '../product/filters/menu'
import { Pagination } from '../product/filters/pagination'
import SearchBar from '../product/filters/search'
import { OrderSelect } from '../product/filters/select'

export default function Main({
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
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [newProduct, setNewProduct] = useState<Product | undefined>(undefined)
  const [productList, setProductList] = useState<Product[]>([])
  const [order, setOrder] = useState<string>('OrdemCrescente')

  return (
    <main>
      <div>
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
        />
        <Pagination totalPages={2} />
      </div>
    </main>
  )
}
