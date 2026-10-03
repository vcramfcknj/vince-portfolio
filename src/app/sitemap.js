import { SITE_URL, PROJECT_PAGES } from '@/lib/site'

// Prerendered, static routes only — /api/* is deliberately absent.
const PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cv', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/disclaimer', priority: 0.2, changeFrequency: 'yearly' },
]

const LAST_MODIFIED = new Date('2026-10-01')

export default function sitemap() {
  const core = PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }))

  const projects = PROJECT_PAGES.map(({ path }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...core, ...projects]
}
