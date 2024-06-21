import { Product } from "@/components/product"

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
