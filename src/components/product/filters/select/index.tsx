import styles from './select.module.scss'

export default function OrderSelect() {
  return (
    <>
      <select name="" id="" className={styles.containerSelect}>
        <option value="Ordenar">Ordenar</option>
        <option value="maiorPreco">Maior preço</option>
        <option value="menorPreco">Menor preço</option>
        <option value="OrdemCrescente">Ordenar A - Z</option>
        <option value="OrdemDecrescente">Ordenar Z - A</option>
      </select>
    </>
  )
}
