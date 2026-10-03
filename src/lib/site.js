// Single source of truth for everything that points outside the app.
// Recruiters only need two things to verify a project: somewhere to click and
// something to read. If a URL doesn't exist yet, leave it null — the UI hides
// the button instead of rendering a dead link.

export const SITE_URL = 'https://v1nchnzo.vercel.app'

export const CONTACT = {
  email: 'vincerubang28@gmail.com',
  phone: '+63 960 346 8348',
  location: 'Ilocos Sur, Philippines',
}

export const SOCIALS = {
  github: 'https://github.com/vcramfcknj',
  linkedin: 'https://www.linkedin.com/in/rubang-vince-marc-justine-3484963a3/',
  instagram: 'https://www.instagram.com/v1nchnzo/',
}

export const RESUME = {
  pdf: '/files/VMJR_Resume.pdf',
  docx: '/files/VMJR_Resume.docx',
  downloadName: 'Vince-Rubang-Resume.pdf',
}

// Shown in the hero — the first thing a recruiter scans for.
export const AVAILABILITY = 'Open to full-stack development and IT support roles'

// Filled in only when a repository or deployment is actually public.
// `erovoutika` keeps `live: null` because its hero button group already links
// the deployed platform — duplicating it here would just be noise.
export const PROJECT_LINKS = {
  check: { live: null, source: null },
  spectaqr: { live: null, source: null },
  'it-seminar': { live: null, source: null },
  erovoutika: { live: null, source: null },
}

export const PROJECT_PAGES = [
  { slug: 'check', path: '/projects/check' },
  { slug: 'spectaqr', path: '/projects/spectaqr' },
  { slug: 'it-seminar', path: '/projects/it-seminar' },
  { slug: 'erovoutika', path: '/projects/erovoutika' },
]
