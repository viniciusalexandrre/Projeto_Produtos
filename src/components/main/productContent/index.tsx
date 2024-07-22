'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query as firestoreQuery,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'

import styles from './product.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../../public/images/desktop/desktop_project 1.png'
import Link from 'next/link'
import { db } from '../../../../config/firebase-config'

export interface Product {
  id: string
  name: string
  equipamento: string
  price: number
  image: string
}

interface ContainerProductsProps {
  query: string
  currentPage: number
  category?: string
  newProduct?: Product
  setProductList: (product: Product[]) => void
  productList: Product[]
  order: string
  filters: { equipamento: string[] }
  menuOpen: boolean
}

export const ContainerProducts = ({
  query,
  currentPage,
  category,
  newProduct,
  setProductList,
  productList,
  order,
  filters,
  menuOpen,
}: ContainerProductsProps) => {
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [localProductList, setLocalProductList] =
    useState<Product[]>(productList)

  const fetchProducts = async (
    currentPage: number,
    query: string,
    category?: string,
    order?: string,
    filters?: { equipamento: string[] },
  ): Promise<Product[]> => {
    const pageSize = 6
    let collectionRef = collection(db, 'electronicProducts')

    // Build the query
    let q = firestoreQuery(
      collectionRef,
      limit(pageSize),
      orderBy(
        order === 'menor preco' || order === 'maior preco' ? 'price' : 'name',
        order === 'menor preco' || order === 'ordem crescente' ? 'asc' : 'desc',
      ),
    )
    // Apply filters
    if (category) {
      q = firestoreQuery(q, where('category', '==', category))
    }

    if (query) {
      q = firestoreQuery(
        q,
        where('name', '>=', query),
        where('name', '<=', query + '\uf8ff'),
      )
    }

    // Filtrando por equipamento
    if (filters?.equipamento.length) {
      const equipamentos = filters.equipamento
      q = firestoreQuery(q, where('equipamento', 'in', equipamentos))
      console.log('produtos', filters)
    }

    if (lastVisible && currentPage > 1) {
      // Pagination
      q = firestoreQuery(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equipamento: doc.data().equipamento,
      price: doc.data().price,
      image: doc.data().image,
      name: doc.data().name,
    }))

    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null)

    console.log('produtos', products)
    return products
  }

  useEffect(() => {
    fetchProducts(currentPage, query, category, order, filters).then(
      setLocalProductList,
    )
  }, [query, currentPage, category, order, filters])

  useEffect(() => {
    if (newProduct) {
      setLocalProductList((prevProducts) => [...prevProducts, newProduct])
    }
  }, [newProduct])

  useEffect(() => {
    setProductList(localProductList)
  }, [localProductList, setProductList])

  return (
    <div
      className={`${styles.containerProduct} ${menuOpen ? styles.menuOpen : ''}`}
    >
      {localProductList.map((product) => (
        <div key={product.id} className={styles.product}>
          <div>
            <div>
              <Image
                src={ImageProduct}
                alt="Imagem do produto"
                height={206}
                width={240}
                unoptimized
                priority={false}
              />
            </div>
            <h2>{product.name}</h2>
          </div>
          <div>
            <strong>R$: {product.price}</strong>
            <button>
              <Link href={'/'}>
                <span> Em breve</span>
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
