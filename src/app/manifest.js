import { SITE_URL } from '@/lib/site'

export default function manifest() {
  return {
    name: 'Vince Rubang | IT Professional & Developer',
    short_name: 'Vince Rubang',
    description:
      'Portfolio of Vince Marc Justine Rubang — BS IT Graduate, Full-Stack Developer, and IT Professional building clean digital experiences.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0c0c0c',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    url: SITE_URL,
  }
}
