// 'use client'

// import { useEffect, useState } from 'react'
// import { collection, doc, getDocs } from 'firebase/firestore'
// import { db } from '../../../config/firebase-config'
// import styles from '@/components/product/product.module.scss'
// import Image from 'next/image'
// import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
// import Link from 'next/link'

// export interface Product {
//   id: string
//   name: string
//   equipamento: string
//   price: number
//   image: string
// }

// interface ContainerProductsProps {
//   newProduct?: Product
// }

// const ContainerProducts = ({ newProduct }: ContainerProductsProps) => {
//   const [productList, setProductList] = useState<Product[]>([])

//   const getProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, 'electronicProducts'))
//     const productList = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       equipamento: doc.data().equipamento,
//       price: doc.data().price,
//       image: doc.data().image,
//       name: doc.data().name,
//     }))
//     setProductList(productList)
//   }
//   const searchProduct = async ({ query }: { query: string }) => {
//     const products = await getProducts()
//     const filteredProducts = Array.isArray(products)
//       ? products.filter((product) =>
//           product.name.toLowerCase().includes(query.toLowerCase()),
//         )
//       : []
//   }
//   useEffect(() => {
//     getProducts()
//   }, [])

//   useEffect(() => {
//     if (newProduct) {
//       setProductList((prevProducts) => [...prevProducts, newProduct])
//     }
//   }, [newProduct])

//   return (
//     <div className={styles.containerProduct}>
//       {productList.map((product, index) => (
//         <div key={index} className={styles.product}>
//           <div>
//             <div>
//               <Image
//                 src={product.image}
//                 alt="Imagem do produto"
//                 height={206}
//                 width={240}
//                 unoptimized
//                 priority={false}
//               />
//             </div>
//             <h2>{product.name}</h2>
//           </div>
//           <div>
//             <strong>R$: {product.price}</strong>
//             <button>
//               <Link href={'/'}>
//                 <span>🚧 Em breve</span>
//               </Link>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ContainerProducts

'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import styles from '@/components/product/product.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
}

const ContainerProducts: React.FC<ContainerProductsProps> = ({
  query,
  currentPage,
}) => {
  const [productList, setProductList] = useState<Product[]>([])

  const fetchProducts = async (
    currentPage: number,
    category?: string,
  ): Promise<Product[]> => {
    const pageSize = 5
    const querySnapshot = await getDocs(collection(db, 'electronicProducts'))
    const offset = (currentPage - 1) * pageSize
    // const first = query(
    //   collection(db, 'electronicProducts'),
    //   orderBy('name'),
    //   limit(5),
    // )
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equipamento: doc.data().equipamento,
      price: doc.data().price,
      image: doc.data().image,
      name: doc.data().name,
    }))

    if (!query) return products // Early return if no query

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    )
    return filteredProducts
  }

  useEffect(() => {
    fetchProducts(currentPage).then(setProductList)
  }, [query, currentPage])

  console.log('produtos', currentPage)
  return (
    <div className={styles.containerProduct}>
      {productList.map((product) => (
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
export default ContainerProducts
