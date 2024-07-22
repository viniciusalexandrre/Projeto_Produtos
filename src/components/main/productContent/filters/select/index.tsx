import { Dispatch, SetStateAction, useState } from 'react'
import styles from './select.module.scss'

type OrderSelectProps = {
  options: string[]
  defaultOption?: string
  setOrder: Dispatch<SetStateAction<string>>
}

export function OrderSelect({
  options,
  defaultOption,
  setOrder,
}: OrderSelectProps) {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0],
  )

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
    setOrder(event.target.value)
  }

  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className={styles.containerSelect}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
