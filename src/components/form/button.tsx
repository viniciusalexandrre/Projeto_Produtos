import { font_primary } from '@/app/page'

export default function Button({ status }: { status: boolean }) {
  return (
    <button type="submit" disabled={status}>
      <span className={font_primary.className}>CADASTRAR</span>
    </button>
  )
}
