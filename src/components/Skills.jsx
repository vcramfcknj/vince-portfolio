'use client'

import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Skills.module.css'
import LogoLoop from './ui/LogoLoop'
import BlobCursor from './ui/BlobCursor'
import { icons, DefaultIcon } from './techIcons'

const LOGO_SIZE = 56

// Tools that actually appear in the project tech stacks (C.H.E.C.K, SpectaQR,
// Erovoutika Ph, HR System) plus the ones this portfolio itself is built with.
const allSkills = [
  'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap',
  'React', 'Next.js', 'Tailwind', 'Framer Motion',
  'Node.js', 'PHP',
  'MySQL', 'PostgreSQL', 'Supabase',
  'C++', 'Arduino',
  'Vercel', 'Git', 'Figma', 'VS Code'
]

function snapTo(target) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('blob-snap', { detail: { target } }))
}

function release() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('blob-release'))
}

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })

  const logos = allSkills.map(skill => ({
    title: skill,
    node: (
      <div
        className={styles.logoItem}
        title={skill}
        onMouseEnter={(e) => snapTo(e.currentTarget)}
        onMouseLeave={release}
      >
        {icons[skill] ?? <DefaultIcon />}
      </div>
    )
  }))

  return (
    <section id="skills" className={styles.skills}>
      <BlobCursor zIndex={0} />

      <div className={styles.inner}>
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <p className={styles.subtitle}>What I work with</p>
          <h2 className={styles.title}>Skills &amp;<br />Technologies</h2>
        </div>
      </div>

      <ul className="sr-only" aria-label="List of skills and technologies">
        {allSkills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <div className={styles.loopViewport} onMouseLeave={release}>
        <LogoLoop
          logos={logos}
          ariaLabel="Skills and technologies"
          speed={50}
          direction="left"
          logoHeight={LOGO_SIZE}
          gap={40}
          fadeOut={true}
          fadeOutColor="var(--bg)"
          scaleOnHover={true}
          pauseOnHover={true}
        />
      </div>

    </section>
  )
}
