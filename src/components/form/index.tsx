'use client'

import { useState } from 'react'
import styles from './form.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
import secondDetail from '../../../public/icon/Detalhe_2.svg'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { Product } from '../product'
import { Input, InputFile } from './input'
import Button from './button'
import { validateForm } from '@/helper/validationForm/validation'
import { Select } from './select'

interface FormProps {
  registrationSuccess: (newProduct: Product) => void
}

export const Form = ({ registrationSuccess }: FormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    equipamento: '',
    preco: '',
    file: null as File | null,
  })

  const [errors, setErrors] = useState({
    name: '',
    equipamento: '',
    preco: '',
    file: '',
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setFormData((prevData) => ({
      ...prevData,
      file,
    }))
  }

  const adicionarProduto = async (event: React.FormEvent) => {
    event.preventDefault()
    const { isValid, errors: validationErrors } = validateForm(formData)
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    const produto: Product = {
      name: formData.name,
      equipamento: formData.equipamento,
      price: parseFloat(formData.preco),
      id: '',
      image: formData.file ? URL.createObjectURL(formData.file) : '',
    }

    try {
      const produtosRef = collection(db, 'electronicProducts')
      const newDoc = await addDoc(produtosRef, produto)
      produto.id = newDoc.id
      console.log('Produto cadastrado com sucesso!', newDoc.id)
      registrationSuccess(produto)
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error)
    }
  }

  return (
    <form className={styles.Form} onSubmit={adicionarProduto}>
      <div>
        <div>
          <Input
            label="Titulo"
            name="name"
            placeholder="Ex: Notebook Dell..."
            id="name"
            onChange={handleInputChange}
            error={errors.name}
          />
          <Select
            label="Equipamento"
            name="equipamento"
            value={formData.equipamento}
            onChange={handleInputChange}
            error={errors.equipamento}
          />
          <Input
            type="number"
            name="preco"
            placeholder="Ex: 1.000,00"
            label="Preço"
            onChange={handleInputChange}
            error={errors.preco}
          />
          <InputFile
            type="file"
            id="file"
            onChange={handleFileChange}
            error={errors.file}
          />
        </div>
        <div id="imageProduct">
          <Image
            src={ImageProduct}
            alt="Imagem do Produto"
            style={{ width: '100%', objectFit: 'fill' }}
            height={498}
            objectFit="cover"
            unoptimized
          />
        </div>
      </div>
      <div>
        <Image
          src={secondDetail}
          alt="Segundo Detalhe"
          style={{
            width: '100%',
            maxWidth: '1186px',
            height: 'auto',
          }}
        />
      </div>
      <div>
        <Button status={false} />
      </div>
    </form>
  )
}
