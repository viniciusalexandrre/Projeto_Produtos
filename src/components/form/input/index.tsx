import styles from './input.module.scss'

type InputProps = React.ComponentProps<'input'> & {
  label: string
  error?: string
}

type InputFieProps = React.ComponentProps<'input'> & {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={error ? styles.containerInputError : styles.containerInput}>
      <label htmlFor={props.name}>{label}</label>
      <div>
        <input id={props.name} {...props} />
      </div>
      {error && (
        <p
          style={{
            color: '#d9314c',
            fontSize: '18px',
            marginBottom: '0px',
            marginTop: '12px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export function InputFile({ error, ...props }: InputFieProps) {
  return (
    <label
      htmlFor="file"
      className={
        error ? styles.containerInputFileError : styles.containerInputFile
      }
    >
      <span>Enviar Imagem</span>
      <input
        type="file"
        id={props.name}
        style={{
          opacity: '0',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        {...props}
      />

      {error && (
        <p
          style={{
            color: '#d9314c',
            fontSize: '18px',
            marginBottom: '0px',
            marginTop: '12px',
          }}
        >
          {error}
        </p>
      )}
    </label>
  )
}
