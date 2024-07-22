'use client'

import { useEffect } from 'react'
import styles from './modal.module.scss'
import Image from 'next/image'
import closeButton from '../../../../../public/icon/Modal/button/close.svg'
import firstDetail from '../../../../../public/icon/Modal/detalhes/Detalhe_1.svg'
import { Product } from '..'
import { Form } from '@/components/form'

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
      <div className={styles.modalBackdrop}>
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
          <h1>ADICIONAR PRODUTOS</h1>
          <div>
            <Image
              src={firstDetail}
              alt="Primeiro Detalhe"
              style={{
                width: '100%',
                maxWidth: '1186x',
                height: 'auto',
                marginBottom: '24px',
              }}
            />
          </div>
          <Form
            registrationSuccess={(newProduct) => {
              onProductAdded(newProduct)
              onClose()
            }}
          />
        </div>
      </div>
    </>
  )
}
