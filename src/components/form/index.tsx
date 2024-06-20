// 'use client'

// import { font_primary } from '@/app/page'
// import styles from './form.module.scss'
// import { useFormState, useFormStatus } from 'react-dom'
// import Image from 'next/image'
// import secondDetail from '../../../public/icon/Detalhe_2.svg'
// import { addDoc, collection, updateDoc } from 'firebase/firestore'
// import { db } from '../../../config/firebase-config'
// import { Product } from '../product'

// function Button() {
//   const status = useFormStatus()
//   return (
//     <button type="submit" disabled={status.pending}>
//       <span className={font_primary.className}>CADASTRAR</span>
//     </button>
//   )
// }

// export const Form = () => {
//   const [state, formAction] = useFormState<Product[]>([])

//   const adicionarProduto = async () => {
//     try {
//       const tituloInput = document.getElementById('titulo')
//       const equipamentoSelect = document.getElementById('equipamento')
//       const priceInput = document.getElementById('price')
//       const imageFile = document.getElementById('arquivo').files[0]

//       const produtoDados = {
//         titulo: tituloInput.value,
//         equipamento: equipamentoSelect.value,
//         preco: parseFloat(priceInput.value),
//       }

//       const produtosRef = collection(db, 'electronicProducts')
//       const newDoc = await addDoc(produtosRef, produtoDados)
//       console.log('Produto cadastrado com sucesso!', newDoc.id)
//       // Limpar o formulário ou realizar outras ações após o cadastro
//     } catch (error) {
//       console.error('Erro ao cadastrar produto:', error)
//     }
//   }

//   return (
//     <form
//       action={formAction}
//       className={styles.Form}
//       onSubmit={adicionarProduto}
//     >
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
//               />
//             </div>
//           </div>
//           <label htmlFor="arquivo">
//             <span className={font_primary.className}>Enviar Imagem</span>
//             <input
//               type="file"
//               id="arquivo"
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

import { font_primary } from '@/app/page'
import styles from './form.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import secondDetail from '../../../public/icon/Detalhe_2.svg'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import ContainerProducts, { Product } from '../product'
import { useFormState, useFormStatus } from 'react-dom'

function Button() {
  const status = useFormStatus()
  return (
    <button type="submit" disabled={status.pending}>
      <span className={font_primary.className}>CADASTRAR</span>
    </button>
  )
}

export const Form = () => {
  const [formData, setFormData] = useState(new FormData())

  async function adicionarProduto(event: any) {
    event.preventDefault() // Prevent default form submission behavior
    setFormData(new FormData(event.target)) // Update form data on submit

    const produto: Product = {
      name: formData.get('name') as string,
      equipamento: formData.get('equipamento') as string,
      price: parseFloat(formData.get('preco') as string),
      id: '',
      image: '',
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
            <label className={font_primary.className} htmlFor="titulo">
              Titulo
            </label>
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '480px',
              }}
            >
              <input
                type="text"
                placeholder="Ex: Notebook Dell..."
                className={font_primary.className}
                id="titulo"
                name="name"
                onChange={(event) =>
                  setFormData((formData) => {
                    formData.set('name', event.target.value)
                    return formData
                  })
                }
              />
            </div>
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
                onChange={(event: any) =>
                  setFormData((formData) => {
                    formData.set('equipamento', event.target.value)
                    return formData
                  })
                }
              >
                <option value="Notebook">Notebook</option>
                <option value="Desktop">Desktop</option>
                <option value="Console">Console</option>
              </select>
            </div>
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
                id="price"
                onChange={(event: any) =>
                  setFormData((formData) => {
                    formData.set('preco', event.target.value)
                    return formData
                  })
                }
              />
            </div>
          </div>
          <label htmlFor="arquivo">
            <span className={font_primary.className}>Enviar Imagem</span>
            <input
              type="file"
              id="arquivo"
              accept="image/*"
              style={{
                opacity: '0',
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            />
          </label>
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
        <Button />
      </div>
    </form>
  )
}
