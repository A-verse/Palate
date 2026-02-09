import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Palate - Your Personal Taste, Perfected',
  description: 'A sophisticated culinary assistant for recipe management, AI-powered discovery, and intelligent meal planning.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-cream-100 text-charcoal-900 antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}