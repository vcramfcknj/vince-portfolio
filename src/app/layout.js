import './globals.css'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/context/ThemeContext'
import { ScrollProvider } from '@/context/ScrollContext'
import GlobalTransition from '@/components/ui/GlobalTransition'
import { Bebas_Neue, Inter, Playfair_Display } from 'next/font/google'
import { CONTACT, SITE_URL, SOCIALS } from '@/lib/site'

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
  metadataBase: new URL(SITE_URL),
  title: 'Vince Rubang | IT Professional & Developer',
  description:
    'Portfolio of Vince Marc Justine Rubang — BS IT Graduate, Full-Stack Developer, and IT Professional building clean digital experiences.',
  keywords: 'Vince Rubang, Portfolio, Web Development, IT Professional, Full-Stack Developer, Next.js, React, PHP, IoT',
  authors: [{ name: 'Vince Rubang' }],
  creator: 'Vince Rubang',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vince Rubang | IT Professional & Developer',
    description: 'Portfolio of Vince Marc Justine Rubang — BS IT Graduate & Developer',
    url: SITE_URL,
    siteName: "Vince Rubang's Portfolio",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        // og-image.png really is 1484x672; the previous 1200x630 declaration
        // made link-preview scrapers crop it.
        width: 1484,
        height: 672,
        alt: "Vince Rubang — IT Professional & Developer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vince Rubang | IT Professional & Developer',
    description: 'BS IT Graduate building clean digital experiences — full-stack, IoT and IT support.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  // Structured data so search engines read the profile as a person, not just a
  // landing page. Only fields that are already public on this site are listed.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Vince Marc Justine O. Rubang',
    url: SITE_URL,
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone,
    jobTitle: ['Full-Stack Web Developer', 'IT Professional'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Candon City',
      addressRegion: 'Ilocos Sur',
      addressCountry: 'PH',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Ilocos Sur Polytechnic State College — Candon City Campus',
    },
    knowsAbout: [
      'JavaScript', 'TypeScript', 'React', 'Next.js', 'PHP', 'MySQL',
      'PostgreSQL', 'Node.js', 'Tailwind CSS', 'IoT', 'ESP32', 'Technical Support',
    ],
    sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vince Rubang — Portfolio',
    url: SITE_URL,
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#person` },
  }

  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
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