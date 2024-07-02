// 'use client'

// import { useEffect } from 'react'
// import styles from './modal.module.scss'
// import Image from 'next/image'
// import closeButton from '../../../public/icon/close.svg'
// import { font_primary } from '@/app/page'
// import firstDetail from '../../../public/icon/Detalhe_1.svg'
// import { Form } from '../form'

// export const Modal = ({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean
//   onClose: () => void
//   children: React.ReactNode
// }) => {
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose()
//       }
//     }

//     window.addEventListener('keydown', handleKeyDown)
//   }, [onClose])

//   if (!isOpen) return null

//   return (
//     <>
//       <section className={styles.modalBackdrop}>
//         <div>
//           <div>
//             <div>
//               <button onClick={onClose}>
//                 <Image
//                   src={closeButton}
//                   alt="close button"
//                   width={24}
//                   height={24}
//                 />
//               </button>
//             </div>
//             <h1 className={font_primary.className}>ADICIONAR PRODUTOS</h1>
//             <div>
//               <Image
//                 src={firstDetail}
//                 alt="Primeiro Detalhe"
//                 style={{
//                   width: '100%',
//                   maxWidth: '1186px',
//                   height: 'auto',
//                   marginBottom: '24px',
//                 }}
//               />
//             </div>
//             <Form />
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

'use client'

import { useEffect } from 'react'
import styles from './modal.module.scss'
import Image from 'next/image'
import closeButton from '../../../public/icon/close.svg'
import { font_primary } from '@/app/page'
import firstDetail from '../../../public/icon/Detalhe_1.svg'
import { Form } from '../form'
import { Product } from '../product'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onProductAdded: (newProduct: Product) => void
}

export const Modal = ({ isOpen, onClose, onProductAdded }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      <section className={styles.modalBackdrop}>
        <div>
          <div>
            <div>
              <button onClick={onClose}>
                <Image
                  src={closeButton}
                  alt="close button"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <h1 className={font_primary.className}>ADICIONAR PRODUTOS</h1>
            <div>
              <Image
                src={firstDetail}
                alt="Primeiro Detalhe"
                style={{
                  width: '100%',
                  maxWidth: '1186px',
                  height: 'auto',
                  marginBottom: '24px',
                }}
              />
            </div>
            <Form
              onSucces={() => {
                onProductAdded(newProduct)
                onClose()
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
