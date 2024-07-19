// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   collection,
//   getDocs,
//   query as firestoreQuery,
//   where,
//   orderBy,
//   limit,
//   startAfter,
//   QueryDocumentSnapshot,
//   DocumentData,
// } from 'firebase/firestore'
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
//   query: string
//   currentPage: number
//   category?: string
//   newProduct?: Product
//   setProductList: (product: Product[]) => void
//   productList: Product[]
//   order: string
//   filters: { equipamento: string[]; price: string[] }
// }

// const ContainerProducts = ({
//   query,
//   currentPage,
//   category,
//   newProduct,
//   setProductList,
//   productList,
//   order,
//   filters,
// }: ContainerProductsProps) => {
//   const [lastVisible, setLastVisible] =
//     useState<QueryDocumentSnapshot<DocumentData> | null>(null)

//   const fetchProducts = async (
//     currentPage: number,
//     query: string,
//     category?: string,
//     order?: string,
//   ): Promise<Product[]> => {
//     const pageSize = 6
//     let collectionRef = collection(db, 'electronicProducts')

//     // Build the query
//     let q = firestoreQuery(
//       collectionRef,
//       limit(pageSize),
//       // where('equipamento', '==', 'notebook'),
//       orderBy(
//         order === 'menor' ? 'price' : 'nome',
//         order === 'menor preco' || order === 'ordem decrescente'
//           ? 'asc'
//           : 'desc',
//       ),
//       // orderBy('equipamento', 'asc'),
//     )
//     // Apply filters
//     if (category) {
//       q = firestoreQuery(q, where('category', '==', category))
//     }

//     if (query) {
//       q = firestoreQuery(
//         q,
//         where('name', '>=', query),
//         where('name', '<=', query + '\uf8ff'),
//       )
//     }

//     if (filters.equipamento.length > 0 && filters.price.length > 0) {
//       q = firestoreQuery(
//         q,
//         where('price', '>=', filters.price[0]),
//         where('price', '<=', filters.price[1]),
//       )
//     }

//     // if (filters.price) {
//     //   q = firestoreQuery(q, orderBy('price', filters.price === 'lowestPrice' ? 'asc' : 'desc'))
//     // }
//     if (lastVisible && currentPage > 1) {
//       // Pagination
//       q = firestoreQuery(q, startAfter(lastVisible))
//     }

//     const querySnapshot = await getDocs(q)

//     const products = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       equipamento: doc.data().equipamento,
//       price: doc.data().price,
//       image: doc.data().image,
//       name: doc.data().name,
//     }))

//     // console.log('produtos', products)
//     setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null)

//     console.log('produtos', products)
//     return products
//   }

//   useEffect(() => {
//     fetchProducts(currentPage, query, category, order).then(setProductList)
//   }, [query, currentPage, category, order])

//   // useEffect(() => {
//   //   if (newProduct) {
//   //     setProductList((prevProducts: any) => [...prevProducts, newProduct])
//   //   }
//   // }, [newProduct])

//   return (
//     <div className={styles.containerProduct}>
//       {productList.map((product) => (
//         <div key={product.id} className={styles.product}>
//           <div>
//             <div>
//               <Image
//                 src={ImageProduct}
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
//                 <span> Em breve</span>
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
  query: string
  currentPage: number
  category?: string
  newProduct?: Product
  setProductList: (product: Product[]) => void
  productList: Product[]
  order: string
  filters: { equipamento: string[] }
}

const ContainerProducts = ({
  query,
  currentPage,
  category,
  newProduct,
  setProductList,
  productList,
  order,
  filters,
}: ContainerProductsProps) => {
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)

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

    //Filtrando por equipamento
    if (filters?.equipamento?.length) {
      q = firestoreQuery(q, where('equipamento', '==', 'Notebook'))
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
      setProductList,
    )
  }, [query, currentPage, category, order, filters])

  // useEffect(() => {
  //   if (newProduct) {
  //     setProductList((prevProducts: any) => [...prevProducts, newProduct])
  //   }
  // }, [newProduct])

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
