'use client'

import { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import styles from '@/components/product/product.module.scss'
import Image from 'next/image'
import ImageBackground from '../../../public/images/desktop/desktop_project 1.jpg'
import Link from 'next/link'

// const font_secondary = localFont({
//   src: './'
// })

interface Product {
  id: string
  name: string
  equipamento: string
  price: number
  image: string
}

const ContainerProducts = () => {
  const [productList, setProductList] = useState<Product[]>([])

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'electronicProducts'))
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equipamento: doc.data().equipamento,
      price: doc.data().price,
      image: doc.data().image,
      name: doc.data().name, // ...doc.data(),
    }))
    setProductList(productList)
  }

  useEffect(() => {
    getProducts()
  }, [])

  console.log(productList)

  return (
    <div className={styles.containerProduct}>
      {productList.map((product, index) => (
        <div key={index}>
          <div>
            <Image
              src={ImageBackground}
              alt="Imagem do produto"
              width={214}
              height={214}
            />
          </div>
          <h2>{product.name}</h2>
          <div>
            <strong>Preço: {product.price}</strong>
            <button>
              <Link href={'/'}>
                <span>VEJA EM DETALHES</span>
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContainerProducts
