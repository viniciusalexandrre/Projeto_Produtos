import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '../../../../../public/icon/Filters/Menu/Menu_Icon.svg'
import CloseIcon from '../../../../../public/icon/Filters/Menu/X-Icon.svg'
import CaretDown from '../../../../../public/icon/Filters/Menu/caret-down.svg'
import styles from './menu.module.scss'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [equipmentIsVisible, setEquipamentIsVisible] = useState(false)
  const [priceIsVisible, setpriceIsVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    setMenuIsVisible(false),
      setEquipamentIsVisible(false),
      setpriceIsVisible(false)
  }, [])

  return (
    <div className={styles.menu}>
      {menuIsVisible ? (
        <div className={styles.isOpen} id="open">
          <div>
            <strong>Equipamento</strong>
            <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
              <Image
                src={CloseIcon}
                width={20}
                height={20}
                alt="Icone de fechar o menu"
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
                    <input type="checkbox" id="notebook" />
                    <label htmlFor="notebook">Notebook</label>
                  </div>
                  <div>
                    <input type="checkbox" id="console" />
                    <label htmlFor="console">Console</label>
                  </div>
                  <div>
                    <input type="checkbox" id="desktop" />
                    <label htmlFor="desktop">Desktop</label>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div>
                <strong>Preço</strong>
                <button onClick={() => setpriceIsVisible(!priceIsVisible)}>
                  <Image src={CaretDown} height={16} width={16} alt="Detalhe" />
                </button>
              </div>
              {priceIsVisible && (
                <div>
                  <div>
                    <input type="checkbox" id="lowestPrice" />
                    <label htmlFor="price">Menor preço</label>
                  </div>
                  <div>
                    <input type="checkbox" id="biggestPrice" />
                    <label htmlFor="price">Maior preço</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
          <Link href="/">
            <Image
              src={MenuIcon}
              width={20}
              height={20}
              alt={'Icone do menu'}
            />
          </Link>
        </button>
      )}
    </div>
  )
}
