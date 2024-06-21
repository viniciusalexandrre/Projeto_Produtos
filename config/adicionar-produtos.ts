'use server'

import { addDoc, collection } from "firebase/firestore"
import { db } from "./firebase-config"
import { Product } from "@/components/product"

function validarName( name: unknown) {
  return typeof name === 'string' && name.length > 1
}

function validarPreco( price: unknown) {
  return typeof price === 'number' && price > 1
}

export async function adicionarProduto(state: {errors: string[]}, formData: FormData,
  ) {
  const produto: Product = {
    name: formData.get('name') as string,
    equipamento: formData.get('equipamento') as string,
    price: Number(formData.get('preco') as string),
    id: '',
    image: '',
  }
  let errors = []
  if(!validarName(produto.name)) errors.push('Nome inválido.')
  if(!validarPreco(produto.price)) errors.push('Preço inválido.')
  if (errors.length > 0) return { errors}
  try {
    const produtosRef = collection(db, 'electronicProducts')
    const newDoc = await addDoc(produtosRef, produto)
    console.log('Produto cadastrado com sucesso!', newDoc.id)
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error)
  }
}