import type { Metadata } from 'next'
// import { font_primary } from './fonts/font'

export const metadata: Metadata = {
  title: 'Vini Store',
  description: 'Loja de equipamentos eletronicos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
