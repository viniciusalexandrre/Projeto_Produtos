import Image from 'next/image'
import SearchIcon from '../../../../../public/icon/Filters/Search/Search_Icon.svg'
import styles from './search.module.scss'

export const Search = () => {
  return (
    <div className={styles.search}>
      <input type="search" placeholder="Pesquisa..." />
      <button>
        <Image
          src={SearchIcon}
          alt="Icone de pesquisa"
          width={20}
          height={20}
        />
      </button>
    </div>
  )
}
