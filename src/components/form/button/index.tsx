import styles from './button.module.scss'

export default function Button({ status }: { status: boolean }) {
  return (
    <div className={styles.button}>
      <button type="submit" disabled={status}>
        <span>CADASTRAR</span>
      </button>
    </div>
  )
}
