import type { Metadata } from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Vini Store',
  description: 'Loja de equipamentos eletronicos',
}

export const monaSans = localFont({
  src: [
    {
      path: './fonts/Mona-Sans-RegularWide.ttf',
      weight: '400',
      style: 'wide',
    },
    {
      path: './fonts/Mona-Sans-MediumWide.ttf',
      weight: '500',
      style: 'wide',
    },
    {
      path: './fonts/Mona-Sans-SemiBoldWide.ttf',
      weight: '600',
      style: 'wide',
    },
    {
      path: './fonts/Mona-Sans-BoldWide.ttf',
      weight: '700',
      style: 'wide',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={monaSans.className}>{children}</body>
    </html>
  )
}
