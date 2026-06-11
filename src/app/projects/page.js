'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './Projects.module.css'

const projects = [
  {
    id: 'check',
    title: 'C.H.E.C.K',
    category: 'IoT Health Tech',
    desc: 'Community Health Evaluation Center Kiosk. An IoT-based system to automate and streamline vital signs monitoring using non-invasive sensors and biometric identification.',
    href: '/projects/check',
    image: '/projects/check/check landing.png',
  },
  {
    id: 'spectaqr',
    title: 'SpectaQR System',
    category: 'Event Management',
    desc: 'Automates attendance tracking, fine calculation, and payment confirmation for events using QR-based scanning and real-time dashboards.',
    href: '/projects/spectaqr',
    image: '/projects/spectaqr/SpectaQR.jpg',
  },
  {
    id: 'erovoutika',
    title: 'Erovoutika Ph, Inc.',
    category: 'OJT Immersion',
    desc: 'Robotics and STEM education integration. Contributed to IoT-based solutions and comprehensive robotics curriculum materials.',
    href: '/projects/erovoutika',
    image: '/projects/erovoutika/Screenshot 2026-06-11 161220.png',
  },
  {
    id: 'it-seminar',
    title: 'HR Management System',
    category: 'Web Development',
    desc: 'Foundational and advanced concepts in generative AI, conversational AI, agentic systems, and PRD-driven application development workflows.',
    href: '/projects/it-seminar',
    image: '/projects/it-seminar/Hr-System.png',
  }
]

export default function ProjectsPage() {
  return (
    <main className={styles.wrapper}>
      <Link href="/" label="Home" className={styles.backLink}>
        &larr; Back to Portfolio
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Deep-dive technical case studies showcasing architecture, challenges, and metrics from my top projects.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map(proj => (
          <Link href={proj.href} label={proj.title} key={proj.id} className={styles.projectLink}>
            <article className={styles.card}>
              <div className={styles.imageWrapper}>
                {proj.image ? (
                  <Image src={proj.image} alt={proj.title} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.image} />
                ) : (
                  <span className={styles.imagePlaceholder}>{proj.title.charAt(0)}</span>
                )}
              </div>
              <span className={styles.tag}>{proj.category}</span>
              <h2 className={styles.cardTitle}>{proj.title}</h2>
              <p className={styles.cardDesc}>{proj.desc}</p>
              <span className={styles.readMore}>
                Read Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </span>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
