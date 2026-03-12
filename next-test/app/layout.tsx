import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Jason Bergh | Director, Cinematographer, Producer',
  description: 'Intimate, Raw Human Storytelling. Award-winning Director, Cinematographer, and Producer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
