import Image from 'next/image'
import SearchIcon from '../../../../../public/icon/Filters/Search/Search_Icon.svg'
import styles from './search.module.scss'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <form className={styles.search}>
      <input
        id="search"
        type="search"
        placeholder="Pesquisar"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button>
        <Image
          src={SearchIcon}
          alt="Icone de pesquisa"
          width={20}
          height={20}
        />
      </button>
    </form>
  )
}
