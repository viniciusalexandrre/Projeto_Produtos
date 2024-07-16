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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const currentPage = Number(searchParams.get('page')) || 1
  const allPages = generatePagination(currentPage, totalPages)

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams)
      params.set('page', searchParams.get('page') || '1')
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [isMounted])

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
                <strong>{page}</strong>
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
