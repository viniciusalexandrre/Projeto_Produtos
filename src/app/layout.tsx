import type { Metadata } from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Vini Store',
  description: 'Loja de equipamentos eletronicos',
}

export const font_primary = localFont({
  src: './fonts/mona-sans/TTF/Mona-Sans-BoldWide.ttf',
  display: 'swap',
  variable: '--font_bold',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={font_primary.className}>{children}</body>
    </html>
  )
}
