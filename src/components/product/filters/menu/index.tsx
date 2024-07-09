import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '../../../../../public/icon/Filters/Menu/Menu_Icon.svg'
import CloseIcon from '../../../../../public/icon/Filters/Menu/X-Icon.svg'
import CaretDown from '../../../../../public/icon/Filters/Menu/caret-down.svg'
import styles from './menu.module.scss'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  return (
    <div className={styles.menu}>
      <button>
        <Link href="/">
          <Image src={MenuIcon} width={20} height={20} alt={'Icone do menu'} />
        </Link>
      </button>
      <div>
        <div>
          <strong>Equipamento</strong>
          <button>
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
              <button>
                <Image src={CaretDown} alt="Detalhe" width={16} height={16} />
              </button>
            </div>
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
          <div>
            <div>
              <strong>Preço</strong>
              <button>
                <Image src={CaretDown} height={16} width={16} alt="Detalhe" />
              </button>
            </div>
            <div>
              <input type="checkbox" id="lowestPrice" />
              <label htmlFor="price">Menor preço</label>
            </div>
            <div>
              <input type="checkbox" id="biggestPrice" />
              <label htmlFor="price">Maior preço</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
