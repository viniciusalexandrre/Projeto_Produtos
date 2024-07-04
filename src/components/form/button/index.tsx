export default function Button({ status }: { status: boolean }) {
  return (
    <button type="submit" disabled={status}>
      <span>CADASTRAR</span>
    </button>
  )
}
