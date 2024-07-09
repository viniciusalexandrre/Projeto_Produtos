import Image from 'next/image'
import leftArrow from '../../../../../public/icon/Filters/Pagination/seta-esquerda.svg'
import rightArrow from '../../../../../public/icon/Filters/Pagination/seta-direita.svg'
import styles from './pagination.module.scss'

export function Pagination() {
  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button>
            <Image src={leftArrow} alt="Seta esquerda" width={22} height={22} />
          </button>
        </li>
        <li>
          <button>
            <strong>01</strong>
          </button>
        </li>
        <li>
          <button>
            <strong>02</strong>
          </button>
        </li>
        <li>
          <button>
            <Image src={rightArrow} alt="Seta direita" width={22} height={22} />
          </button>
        </li>
      </ul>
    </>
  )
}
