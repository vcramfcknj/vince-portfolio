import './globals.css'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/context/ThemeContext'
import { ScrollProvider } from '@/context/ScrollContext'
import GlobalTransition from '@/components/ui/GlobalTransition'
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
    'Portfolio of Vince Marc Justine Rubang — BS IT Graduate, Full-Stack Developer, and IT Professional building clean digital experiences.',
  keywords: 'Vince Rubang, Portfolio, Web Development, IT Professional, Full-Stack Developer',
  authors: [{ name: 'Vince Rubang' }],
  openGraph: {
    title: 'Vince Rubang | IT Professional & Developer',
    description: 'Portfolio of Vince Marc Justine Rubang — BS IT Student & Developer',
    url: 'https://v1nchnzo.vercel.app',
    siteName: "Vince Rubang's Portfolio",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://v1nchnzo.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: "Vince Rubang — IT Professional & Developer",
      },
    ],
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
              <GlobalTransition>
                <Navbar />
                {children}
                <ScrollToTop />
                <Contact />
              </GlobalTransition>
            </ScrollProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}