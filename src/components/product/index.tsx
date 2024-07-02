// 'use client'

// import { useEffect, useState } from 'react'
// import { collection, doc, getDocs } from 'firebase/firestore'
// import { db } from '../../../config/firebase-config'
// import styles from '@/components/product/product.module.scss'
// import Image from 'next/image'
// import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
// import Link from 'next/link'
// import localFont from 'next/font/local'
// import { font_primary } from '@/app/page'

// const font_secondary = localFont({
//   src: '../../app/fonts/mona-sans/TTF/Mona-Sans-Regular.ttf',
//   display: 'swap',
// })

// const font_button = localFont({
//   src: '../../app/fonts/mona-sans/TTF/Mona-Sans-SemiBoldWide.ttf',
//   display: 'swap',
// })

// export interface Product {
//   id: string
//   name: string
//   equipamento: string
//   price: number
//   image: string
// }

// const ContainerProducts = () => {
//   const [productList, setProductList] = useState<Product[]>([])

//   const getProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, 'electronicProducts'))
//     const productList = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       equipamento: doc.data().equipamento,
//       price: doc.data().price,
//       image: doc.data().image,
//       name: doc.data().name, // ...doc.data(),
//     }))
//     setProductList(productList)
//   }

//   useEffect(() => {
//     getProducts()
//   }, [])

//   console.log(productList)

//   return (
//     <div className={styles.container}>
//       <div className={styles.containerProduct}>
//         {productList.map((product, index) => (
//           <div key={index} className={styles.product}>
//             <div>
//               <div>
//                 <Image
//                   src={ImageProduct}
//                   alt="Imagem do produto"
//                   height={206}
//                   style={{ width: '100%', maxWidth: '240px' }}
//                   unoptimized={false}
//                 />
//               </div>
//               <h2 className={font_secondary.className}>{product.name}</h2>
//             </div>
//             <div>
//               <strong className={font_primary.className}>
//                 R$: {product.price}
//               </strong>
//               <button>
//                 <Link href={'/'}>
//                   <span className={font_button.className}>
//                     VEJA EM DETALHES
//                   </span>
//                 </Link>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ContainerProducts

'use client'

import { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import styles from '@/components/product/product.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
import Link from 'next/link'
import localFont from 'next/font/local'
import { font_primary } from '@/app/page'

const font_secondary = localFont({
  src: '../../app/fonts/mona-sans/TTF/Mona-Sans-Regular.ttf',
  display: 'swap',
})

const font_button = localFont({
  src: '../../app/fonts/mona-sans/TTF/Mona-Sans-SemiBoldWide.ttf',
  display: 'swap',
})

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
      name: doc.data().name, // ...doc.data(),
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

  console.log(productList)
  console.log(newProduct)

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
              <h2 className={font_secondary.className}>{product.name}</h2>
            </div>
            <div>
              <strong className={font_primary.className}>
                R$: {product.price}
              </strong>
              <button>
                <Link href={'/'}>
                  <span className={font_button.className}>
                    VEJA EM DETALHES
                  </span>
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
