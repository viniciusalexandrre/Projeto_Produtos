// import Image from 'next/image'
// import leftArrow from '../../../../../public/icon/Filters/Pagination/seta-esquerda.svg'
// import rightArrow from '../../../../../public/icon/Filters/Pagination/seta-direita.svg'
// import styles from './pagination.module.scss'
// import {
//   collection,
//   DocumentData,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
// } from 'firebase/firestore'
// import { db } from '../../../../../config/firebase-config'
// import { usePathname, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { generatePagination } from '@/app/lib/utils'

// export function Pagination({ totalPages }: { totalPages: number }) {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const currentPage = Number(searchParams.get('page')) || 1

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams)
//     params.set('page', pageNumber.toString())
//     return `${pathname}?${params.toString()}`
//   }

//   const handlePageClick = (pageNumber: number) => {
//     router.push(createPageURL(pageNumber))
//   }

//   const allPages = generatePagination(currentPage, totalPages)

//   return (
//     <>
//       <ul className={styles.pagination}>
//         <li>
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageClick(currentPage - 1)}
//           >
//             <Image src={leftArrow} alt="Seta esquerda" width={22} height={22} />
//           </button>
//         </li>

//         {[...Array(totalPages)].map((_, index) => (
//           <li key={index}>
//             <button onClick={() => handlePageClick(index + 1)}>
//               <strong>{index + 1}</strong>
//             </button>
//           </li>
//         ))}

//         <li>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageClick(currentPage + 1)}
//           >
//             <Image src={rightArrow} alt="Seta direita" width={22} height={22} />
//           </button>
//         </li>
//       </ul>
//     </>
//   )
// }

import Image from 'next/image'
import leftArrow from '../../../../../public/icon/Filters/Pagination/seta-esquerda.svg'
import rightArrow from '../../../../../public/icon/Filters/Pagination/seta-direita.svg'
import styles from './pagination.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'
import { generatePagination } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const [productsPerPage, setProductsPerPage] = useState(5)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  const handleProductsPerPageChange = (newProductsPerPage: number) => {
    setProductsPerPage(newProductsPerPage)
    // Update URL query parameters (similar to previous approach)
    const params = new URLSearchParams(searchParams)
    params.set('page', '1') // Reset page to 1 when changing productsPerPage
    params.set('productsPerPage', newProductsPerPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams)
      params.set('page', searchParams.get('page') || '1') // Use searchParams.get('page') or default to 1
      params.set('productsPerPage', productsPerPage.toString())
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [productsPerPage, isMounted])

  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageClick = (pageNumber: number) => {
    if (isMounted) {
      router.push(createPageURL(pageNumber))
    }
  }

  const allPages = generatePagination(currentPage, totalPages)

  if (!isMounted) {
    return null
  }

  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <Image src={leftArrow} alt="Seta esquerda" width={22} height={22} />
          </button>
        </li>

        {allPages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageClick(page)}
                className={page === currentPage ? styles.active : ''}
              >
                {page}
              </button>
            ) : (
              <span>{page}</span>
            )}
          </li>
        ))}

        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <Image src={rightArrow} alt="Seta direita" width={22} height={22} />
          </button>
        </li>
      </ul>
    </>
  )
}
