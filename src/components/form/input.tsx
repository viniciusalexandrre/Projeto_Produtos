import { font_primary } from '@/app/page'
import styles from './input.module.scss'

type InputProps = React.ComponentProps<'input'> & {
  label: string
  error?: string
}

type SelectProps = React.ComponentProps<'select'> & {
  label: string
  error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.name} className={font_primary.className}>
        {label}
      </label>
      <div>
        <input id={props.name} className={font_primary.className} {...props} />
        {error && (
          <p
            className={font_primary.className}
            style={{ color: 'red', fontSize: '18px' }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

// export function InputFile({ label, value, error, ...props }: SelectProps) {
//   <label htmlFor={props.name} className={font_primary.className}>
//     {label}
//   <span className={font_primary.className}>Enviar Imagem</span>
//   <input
//     type="file"
//     id="file"
//     accept="image/*"
//     onChange={handleFileChange}
//     style={{
//       opacity: '0',
//       position: 'absolute',
//       top: '0',
//       left: '0',
//     }}
//   />
// </label>
// }
