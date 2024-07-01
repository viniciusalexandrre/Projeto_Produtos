'use client'

import { useState } from 'react'
import { font_primary } from '@/app/page'
import styles from './form.module.scss'
import Image from 'next/image'
import ImageProduct from '../../../public/images/desktop/desktop_project 1.png'
import secondDetail from '../../../public/icon/Detalhe_2.svg'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { Product } from '../product'
import Input from './input'
import Button from './button'

export const Form = () => {
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

  const validate = () => {
    let valid = true
    let errors = {
      name: '',
      equipamento: '',
      preco: '',
      file: '',
    }

    if (!formData.name) {
      errors.name = 'O título é obrigatório.'
      valid = false
    }

    if (!formData.equipamento) {
      errors.equipamento = 'O equipamento é obrigatório.'
      valid = false
    }

    if (!formData.preco || isNaN(Number(formData.preco))) {
      errors.preco = 'O preço é obrigatório e deve ser um número.'
      valid = false
    }

    if (!formData.file) {
      errors.file = 'A imagem é obrigatória.'
      valid = false
    }

    setErrors(errors)
    return valid
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData((prevData) => ({
      ...prevData,
      file,
    }))
  }

  const adicionarProduto = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) {
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
      console.log('Produto cadastrado com sucesso!', newDoc.id)
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
          <div>
            <label className={font_primary.className}>Equipamento</label>
            <div>
              <select
                name="equipamento"
                id="equipamento"
                className={font_primary.className}
                value={formData.equipamento}
                onChange={handleInputChange}
              >
                <option value="select">Selecione um equipamento</option>
                <option value="Notebook">Notebook</option>
                <option value="Desktop">Desktop</option>
                <option value="Console">Console</option>
              </select>
            </div>
            {errors.equipamento && (
              <p
                className={font_primary.className}
                style={{ color: 'red', fontSize: '18px' }}
              >
                {errors.equipamento}
              </p>
            )}
          </div>
          <Input
            type="number"
            name="preco"
            placeholder="Ex: 1.000,00"
            label="Preço"
            onChange={handleInputChange}
            error={errors.preco}
          />
          <label htmlFor="file">
            <span className={font_primary.className}>Enviar Imagem</span>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                opacity: '0',
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            />
          </label>
          {errors.file && (
            <p
              className={font_primary.className}
              style={{ color: 'red', fontSize: '18px' }}
            >
              {errors.file}
            </p>
          )}
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
            marginTop: '28px',
          }}
        />
      </div>
      <div>
        <Button status={false} />
      </div>
    </form>
  )
}
