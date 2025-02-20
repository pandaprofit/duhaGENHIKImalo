import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import Header from '@/modules/header/header'
import type { Metadata } from 'next'
import { Providers } from './providers'

import '@styles/global.scss'

import localFont from 'next/font/local'

const font = localFont({
  src: [
    {
      path: './fonts/neuemachina-light.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-ultrabold.woff2',
      weight: '800',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'Genshin Helper',
  description: 'Ваш помощник в мире Genshin Impact'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <Providers>
          <div id="root">
            <Header />
            {children}
          </div>

          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  )
}
