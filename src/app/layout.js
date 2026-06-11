import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/context/ThemeContext'
import { ScrollProvider } from '@/context/ScrollContext'
import { Bebas_Neue, Inter, Playfair_Display } from 'next/font/google'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-next',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Vince Rubang | IT Professional & Developer',
  description:
    'Portfolio of Vince Marc Justine Rubang — BS IT Student, Full-Stack Developer, and IT Professional building clean digital experiences.',
  keywords: 'Vince Rubang, Portfolio, Web Development, IT Professional, Full-Stack Developer',
  authors: [{ name: 'Vince Rubang' }],
  openGraph: {
    title: 'Vince Rubang | IT Professional & Developer',
    description: 'Portfolio of Vince Marc Justine Rubang — BS IT Student & Developer',
    url: 'https://vincerubang.dev',
    siteName: "Vince Rubang's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          <ThemeProvider>
            <ScrollProvider>
              <Navbar />
              {children}
              <ScrollToTop />
              <Footer />
            </ScrollProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}