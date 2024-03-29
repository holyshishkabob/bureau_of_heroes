import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MyComponent from './page'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bureau of Heroes',
  description: 'Superhero Database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}

      </body>

    </html>
  )
}
