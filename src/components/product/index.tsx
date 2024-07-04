'use client'

import { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import styles from '@/components/product/product.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
import Link from 'next/link'

export interface Product {
  id: string
  name: string
  equipamento: string
  price: number
  image: string
}

interface ContainerProductsProps {
  newProduct?: Product
}

const ContainerProducts = ({ newProduct }: ContainerProductsProps) => {
  const [productList, setProductList] = useState<Product[]>([])

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'electronicProducts'))
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equipamento: doc.data().equipamento,
      price: doc.data().price,
      image: doc.data().image,
      name: doc.data().name,
    }))
    setProductList(productList)
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (newProduct) {
      setProductList((prevProducts) => [...prevProducts, newProduct])
    }
  }, [newProduct])

  return (
    <div className={styles.container}>
      <div className={styles.containerProduct}>
        {productList.map((product, index) => (
          <div key={index} className={styles.product}>
            <div>
              <div>
                <Image
                  src={ImageProduct}
                  alt="Imagem do produto"
                  height={206}
                  style={{ width: '100%', maxWidth: '240px' }}
                  unoptimized={false}
                />
              </div>
              <h2>{product.name}</h2>
            </div>
            <div>
              <strong>R$: {product.price}</strong>
              <button>
                <Link href={'/'}>
                  <span>🚧 Em breve</span>
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContainerProducts
