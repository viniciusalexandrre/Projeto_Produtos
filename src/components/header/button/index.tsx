import Image from 'next/image'
import Link from 'next/link'
import IconAdd from '../../../../public/icon/add_icon.svg'
import styles from './button.module.scss'

export function Button({ ...props }) {
  return (
    <>
      <button className={styles.firstButton} {...props}>
        <Link href={'/'}>
          <span>ADICIONAR</span>
        </Link>
      </button>
      <button className={styles.secondButton} {...props}>
        <Link href={'/'}>
          <Image src={IconAdd} alt="Icon Adição" height={24} width={24} />
        </Link>
      </button>
    </>
  )
}
