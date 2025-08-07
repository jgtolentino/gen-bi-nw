import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Northwind Sales Dashboard',
  description: 'Interactive sales dashboard with real-time data from Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}