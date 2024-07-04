interface FormData {
  name: string
  equipamento: string
  preco: string
  file: File | null
}

interface ValidationErrors {
  name: string
  equipamento: string
  preco: string
  file: string
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationErrors
}

export const validateForm = (formData: FormData): ValidationResult => {
  let valid = true
  let errors: ValidationErrors = {
    name: '',
    equipamento: '',
    preco: '',
    file: '',
  }

  if (!formData.name) {
    errors.name = 'Preencha um valor'
    valid = false
  }

  if (!formData.equipamento) {
    errors.equipamento = 'Selecione um valor'
    valid = false
  }

  if (!formData.preco || isNaN(Number(formData.preco))) {
    errors.preco = 'Preencha um valor.'
    valid = false
  }

  if (!formData.file) {
    errors.file = 'Adicione uma imagem.'
    valid = false
  }

  return { isValid: valid, errors }
}
