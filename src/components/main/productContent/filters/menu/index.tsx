import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '../../../../../../public/icon/Filters/Menu/Menu_Icon.svg'
import CloseIcon from '../../../../../../public/icon/Filters/Menu/X-Icon.svg'
import CaretDown from '../../../../../../public/icon/Filters/Menu/caret-down.svg'
import styles from './menu.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface MenuProps {
  setCategory: Dispatch<SetStateAction<string | undefined>>
  setFilters: Dispatch<SetStateAction<{ equipamento: string[] }>>
  onMenuToggle: (isVisible: boolean) => void
}

export default function Menu({
  setCategory,
  setFilters,
  onMenuToggle,
}: MenuProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [equipmentIsVisible, setEquipamentIsVisible] = useState(false)
  const [priceIsVisible, setPriceIsVisible] = useState(false)

  const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const equipment = e.target.id
    setFilters((prev) => ({
      ...prev,
      equipamento: e.target.checked
        ? [...prev.equipamento, equipment]
        : (prev.equipamento || []).filter((item) => item !== equipment),
    }))
  }

  useEffect(() => {
    onMenuToggle(menuIsVisible)
  }, [menuIsVisible, onMenuToggle])

  return (
    <>
      {menuIsVisible ? (
        <div className={styles.isOpen}>
          <div>
            <strong>Equipamento</strong>
            <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
              <Image
                src={CloseIcon}
                width={20}
                height={20}
                alt="Ícone de fechar o menu"
              />
            </button>
          </div>
          <div>
            <div>
              <div>
                <strong>Equipamento</strong>
                <button
                  onClick={() => setEquipamentIsVisible(!equipmentIsVisible)}
                >
                  <Image src={CaretDown} alt="Detalhe" width={16} height={16} />
                </button>
              </div>
              {equipmentIsVisible && (
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="Notebook"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="notebook">Notebook</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Console"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="console">Console</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Desktop"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="desktop">Desktop</label>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div>
                <strong>Preço</strong>
                <button onClick={() => setPriceIsVisible(!priceIsVisible)}>
                  <Image src={CaretDown} height={16} width={16} alt="Detalhe" />
                </button>
              </div>
              {priceIsVisible && (
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="lowestPrice"
                      onChange={() => setCategory('menor preco')}
                    />
                    <label htmlFor="lowestPrice">Menor preço</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="biggestPrice"
                      onChange={() => setCategory('maior preco')}
                    />
                    <label htmlFor="biggestPrice">Maior preço</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          className={styles.menu}
          onClick={() => setMenuIsVisible(!menuIsVisible)}
        >
          <Link href="/">
            <Image
              src={MenuIcon}
              width={20}
              height={20}
              alt={'Ícone do menu'}
            />
          </Link>
        </button>
      )}
    </>
  )
}
