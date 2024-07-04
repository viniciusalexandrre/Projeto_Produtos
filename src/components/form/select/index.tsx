import styles from './select.module.scss'
type SelectProps = React.ComponentProps<'select'> & {
  label: string
  error?: string
}

export function Select({ label, error, ...props }: SelectProps) {
  return (
    <div
      className={error ? styles.containerSelectError : styles.containerSelect}
    >
      <label htmlFor={props.name}>{label}</label>
      <div>
        <select id={props.name} {...props}>
          <option value="select">Selecione</option>
          <option value="Notebook">Notebook</option>
          <option value="Desktop">Desktop</option>
          <option value="Console">Console</option>
        </select>
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
