'use client'

import { useState, useEffect } from 'react'
import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Experience.module.css'

const experiences = [
  {
    id: 'exp1',
    role: 'Junior Developer Intern',
    company: 'Erovoutika Ph, Inc.',
    duration: 'Jan 28 – Mar 3, 2026',
    description:
      'Embedded in the development team for the full Erovoutika website revamp (Next.js + React). Handled wireframing, frontend implementation, mobile responsiveness, backend system development, UI/UX design, and IoT hardware integration testing. Completed 220 hours — exceeding the required 200-hour minimum.',
    tags: ['Next.js', 'React', 'GitHub', 'Vercel', 'UI/UX', 'IoT'],
    iconEl: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    last: false,
  },
  {
    id: 'exp2',
    role: 'Web & Mobile Developer of the Year',
    company: 'Ilocos Sur Polytechnic State College',
    duration: 'May 7, 2026',
    description:
      'Recognized as the top web and mobile developer in the institution. Awarded for outstanding performance in development projects, technical skill, and innovation in digital solutions.',
    tags: ['Award', 'Web Development', 'Mobile Development'],
    iconEl: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/>
        <path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
        <path d="M12 17v4"/>
        <path d="M8 21h8"/>
        <path d="M6 5h12v7a6 6 0 0 1-12 0V5Z"/>
      </svg>
    ),
    last: false,
  },
  {
    id: 'exp3',
    role: 'Web Developer',
    company: 'Freelance / Personal Projects',
    duration: '2023 – Present',
    description:
      'Designed and developed responsive web applications for various personal projects. Built solutions using HTML, CSS, JavaScript, and MySQL with a focus on clean UI and solid database management.',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    iconEl: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
      </svg>
    ),
    last: true,
  },
]

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.12 })

  return (
    <div
      ref={ref}
      className={`${styles.row} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Left — icon + connector */}
      <div className={styles.iconCol}>
        <div className={styles.iconWrap}>
          {exp.iconEl}
        </div>
        {!exp.last && <div className={styles.connector} />}
      </div>

      {/* Right — card */}
      <div className={styles.card}>
        {/* Accent line on left edge (shown on hover via CSS) */}
        <div
          className={styles.accentBar}
          style={{ background: exp.iconGradient }}
        />

        <div className={styles.cardTop}>
          <div className={styles.cardLeft}>
            <h3 className={styles.role}>{exp.role}</h3>
            <span className={styles.sep}>·</span>
            <span className={styles.company}>{exp.company}</span>
          </div>
          <span className={styles.duration}>{exp.duration}</span>
        </div>

        <p className={styles.description}>{exp.description}</p>

        {exp.tags.length > 0 && (
          <div className={styles.tags}>
            {exp.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import Lanyard from '@/components/ui/Lanyard'

export default function Experience() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })
  const [hasFallen, setHasFallen] = useState(false)

  useEffect(() => {
    if (headerVisible && !hasFallen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasFallen(true)
    }
  }, [headerVisible, hasFallen])

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.inner}>

        <div className={styles.contentWrapper}>
          {/* Left Column: Header and Experience List */}
          <div className={styles.listWrapper}>
            <div
              ref={headerRef}
              className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
            >
              <p className="section-subtitle">Where I&rsquo;ve Worked</p>
              <h2 className={styles.title}>Work<br />Experience</h2>
            </div>

            <div className={styles.list}>
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* 3D Lanyard ID Card (Anchored to right side, wider canvas to prevent clipping) */}
        {/* Rendered at the end of the DOM to ensure it sits ON TOP of the cards */}
        <div className={styles.lanyardWrapper}>
          {hasFallen && (
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/images/id.jpg" />
          )}
        </div>

      </div>
    </section>
  )
}