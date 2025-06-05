import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Raleway } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
})

export const metadata: Metadata = {
  title: 'iShape - Your AI Fitness Coach',
  description: 'Personal fitness and nutrition tracking with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${montserrat.variable} ${raleway.variable} font-sans bg-background text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}