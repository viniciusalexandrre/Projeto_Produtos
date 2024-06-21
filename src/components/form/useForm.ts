import { useState} from 'react'

interface errorMessage {
  setError: string | null
}

const useForm = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<errorMessage['setError']>(null)

  function validation(value: string) {
    if (value.length === 0) {
      setError('Preencha um valor')
      return false
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ currentTarget} : React.FormEvent<HTMLInputElement>) {
    if (error) validation(currentTarget.value)
    setValue(currentTarget.value)
  }

  return {
    value, 
    setValue,
    onChange,
    error,
    setError,
    validation: () => validation(value),
    onblur: () => validation(value)
  }
}

export default useForm