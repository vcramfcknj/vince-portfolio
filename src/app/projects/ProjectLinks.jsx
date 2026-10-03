// lucide-react dropped its brand icons, so the repo link uses a branch mark.
import { ExternalLink, GitBranch } from 'lucide-react'
import styles from '@/app/projects/ProjectDetail.module.css'
import { PROJECT_LINKS } from '@/lib/site'

// Renders nothing unless a URL actually exists in src/lib/site.js — a project
// page must never offer a link that goes nowhere.
export default function ProjectLinks({ slug }) {
  const links = PROJECT_LINKS[slug] || {}

  const items = []
  if (links.live) items.push({ key: 'live', label: 'Live Site', href: links.live, Icon: ExternalLink })
  if (links.source) items.push({ key: 'source', label: 'Source Code', href: links.source, Icon: GitBranch })

  if (items.length === 0) return null

  return (
    <div className={styles.extraLinks}>
      {items.map(({ key, label, href, Icon }) => (
        <a key={key} className={styles.linkBtn} href={href} target="_blank" rel="noopener noreferrer">
          <Icon size={14} /> {label}
        </a>
      ))}
    </div>
  )
}
