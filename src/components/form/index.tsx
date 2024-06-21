// 'use client'

// import { font_primary } from '@/app/page'
// import styles from './form.module.scss'
// import { useState } from 'react'
// import Image from 'next/image'
// import secondDetail from '../../../public/icon/Detalhe_2.svg'
// import { addDoc, collection } from 'firebase/firestore'
// import { db } from '../../../config/firebase-config'
// import { Product } from '../product'
// import { useFormStatus } from 'react-dom'

// function Button() {
//   const status = useFormStatus()
//   return (
//     <button type="submit" disabled={status.pending}>
//       <span className={font_primary.className}>CADASTRAR</span>
//     </button>
//   )
// }

// export const Form = () => {
//   const [formData, setFormData] = useState(new FormData())

//   async function adicionarProduto(event: any) {
//     event.preventDefault()
//     setFormData(new FormData(event.target))

//     const produto: Product = {
//       name: formData.get('name') as string,
//       equipamento: formData.get('equipamento') as string,
//       price: parseFloat(formData.get('preco') as string),
//       id: '',
//       image: '',
//     }

//     try {
//       const produtosRef = collection(db, 'electronicProducts')
//       const newDoc = await addDoc(produtosRef, produto)
//       console.log('Produto cadastrado com sucesso!', newDoc.id)
//     } catch (error) {
//       console.error('Erro ao cadastrar produto:', error)
//     }
//   }

//   return (
//     <form className={styles.Form} onSubmit={adicionarProduto}>
//       <div>
//         <div>
//           <div>
//             <label className={font_primary.className} htmlFor="titulo">
//               Titulo
//             </label>
//             <div
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 maxWidth: '480px',
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Ex: Notebook Dell..."
//                 className={font_primary.className}
//                 id="titulo"
//                 name="name"
//                 onChange={(event) =>
//                   setFormData((formData) => {
//                     formData.set('name', event.target.value)
//                     return formData
//                   })
//                 }
//               />
//             </div>
//           </div>
//           <div>
//             <label className={font_primary.className}>Equipamento</label>
//             <div
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 maxWidth: '480px',
//               }}
//             >
//               <select
//                 name="equipamento"
//                 id="equipamento"
//                 className={font_primary.className}
//                 onChange={(event: any) =>
//                   setFormData((formData) => {
//                     formData.set('equipamento', event.target.value)
//                     return formData
//                   })
//                 }
//               >
//                 <option value="Notebook">Notebook</option>
//                 <option value="Desktop">Desktop</option>
//                 <option value="Console">Console</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className={font_primary.className}>Preço</label>
//             <div
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 maxWidth: '480px',
//               }}
//             >
//               <input
//                 type="number"
//                 placeholder="Ex: 1.000,00"
//                 className={font_primary.className}
//                 id="price"
//                 onChange={(event: any) =>
//                   setFormData((formData) => {
//                     formData.set('preco', event.target.value)
//                     return formData
//                   })
//                 }
//               />
//             </div>
//           </div>
//           <label htmlFor="arquivo">
//             <span className={font_primary.className}>Enviar Imagem</span>
//             <input
//               type="file"
//               id="file"
//               accept="image/*"
//               style={{
//                 opacity: '0',
//                 position: 'absolute',
//                 top: '0',
//                 left: '0',
//               }}
//             />
//           </label>
//         </div>
//         <div id="imageProduct"></div>
//       </div>
//       <div>
//         <Image
//           src={secondDetail}
//           alt="Segundo Detalhe"
//           style={{
//             width: '100%',
//             maxWidth: '1186px',
//             height: 'auto',
//             marginTop: '28px',
//           }}
//         />
//       </div>
//       <div>
//         <Button />
//       </div>
//     </form>
//   )
// }

'use client'

import { useState } from 'react'
import { font_primary } from '@/app/page'
import styles from './form.module.scss'
import Image from 'next/image'
import secondDetail from '../../../public/icon/Detalhe_2.svg'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { Product } from '../product'
import { useFormStatus } from 'react-dom'

function Button({ status }: { status: boolean }) {
  return (
    <button type="submit" disabled={status}>
      <span className={font_primary.className}>CADASTRAR</span>
    </button>
  )
}

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
          <div>
            <label className={font_primary.className} htmlFor="name">
              Titulo
            </label>
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '480px',
              }}
            >
              {errors.name && (
                <input
                  type="text"
                  placeholder="Ex: Notebook Dell..."
                  className={font_primary.className}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
            </div>
            {errors.name && (
              <p
                className={font_primary.className}
                style={{ color: 'red', fontSize: '16px' }}
              >
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className={font_primary.className}>Equipamento</label>
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '480px',
              }}
            >
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
                // className={styles.error}
                style={{ fontFamily: `${font_primary}` }}
              >
                {errors.equipamento}
              </p>
            )}
          </div>
          <div>
            <label className={font_primary.className}>Preço</label>
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '480px',
              }}
            >
              <input
                type="number"
                placeholder="Ex: 1.000,00"
                className={font_primary.className}
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleInputChange}
              />
            </div>
            {errors.preco && <p className={styles.error}>{errors.preco}</p>}
          </div>
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
          {errors.file && <p className={styles.error}>{errors.file}</p>}
        </div>
        <div id="imageProduct"></div>
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
