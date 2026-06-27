'use client'

import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Skills.module.css'
import LogoLoop from './ui/LogoLoop'
import { SiFigma } from 'react-icons/si'
import BlobCursor from './ui/BlobCursor'

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
export const icons = {
  Java: (
    <svg viewBox="0 0 128 128">
      <path d="M80.1 76.5c-3.7-1.1-6.1-2.5-6.1-5.1 0-2.8 3.5-4 10.3-4.4 12.3-.6 21-3.6 21-8.5 0-3.3-4.4-5.6-11.8-6.6l-.3-1c7.9 1 12.5 3.5 12.5 7.1 0 5-9 8.2-22.1 8.9-6.4.4-9.3 1.3-9.3 3.6 0 2 2.3 3.2 6.1 4.2l-.3.8z" fill="#E76F00"/>
      <path d="M49 84.4c-4.4-1.1-6.6-2.5-6.6-4.7 0-2.3 2.9-3.8 8.4-4.8l-.3-1c-5.8 1-9 2.8-9 5.3 0 2.8 2.6 4.6 7.4 5.9l.1-.7zm15.7 6.4c-4.7-1-7.2-2.3-7.2-4.5 0-2.1 2.9-3.4 8-4.5l-.3-.9c-5.5 1.1-8.6 2.6-8.6 4.9 0 2.6 2.6 4.2 7.7 5.7l.4-.7z" fill="#E76F00"/>
      <path d="M64 128c-29.3 0-48-11.8-48-31 0-8.8 5-16.1 13.5-20.4l.6.8C22.2 81.3 17.5 88.1 17.5 96.3c0 18.2 18.2 29.8 46.5 29.8 29.4 0 46.5-11.6 46.5-29.8 0-8.2-4.7-15-12.6-18.9l.6-.8c8.5 4.3 13.5 11.6 13.5 20.4 0 19.2-18.7 31-48 31z" fill="#5382A1"/>
      <path d="M83.4 69.4c0-4.6-2.6-7-7-8.3-5-1.5-7.7-2.9-7.7-6 0-3.1 3-5.5 7.2-5.5 4.8 0 8 2.6 8 6.4h1.1c0-4.3-3.6-7.4-9.1-7.4-4.8 0-8.3 2.8-8.3 6.6 0 4 2.8 6 7.5 7.4 5 1.5 7.2 3.1 7.2 6.7 0 3.7-3.7 6.6-8.8 6.6-6.1 0-9.8-3.4-9.8-8h-1.1c0 5.1 4.1 9 10.9 9 5.8 0 9.9-3.2 9.9-7.5z" fill="#5382A1"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 110 110" fill="none">
      <path d="M54.1 10.7c-21.5 0-20.7 9.3-20.7 9.3l-.1 9.7h21.4v3H32.4s-14.1-1.3-14.1 19.3 12 20.4 12 20.4h6.5V60.7s-.2-9.6 9.4-9.6h20.7s8.9.2 8.9-8.5V20.4s1-9.7-21.7-9.7z" fill="#387EB8"/>
      <path d="M55.8 98.4c21.5 0 20.7-9.3 20.7-9.3l.1-9.7H55.2v-3h22.3s14.1 1.3 14.1-19.3-12-20.4-12-20.4h-6.5v11.7s.2 9.6-9.4 9.6H43s-8.9-.2-8.9 8.5v22.2s-1 9.7 21.7 9.7z" fill="#FFE052"/>
      <circle cx="39.6" cy="22.5" r="3.2" fill="#fff"/>
      <circle cx="70.5" cy="86.5" r="3.2" fill="#fff"/>
    </svg>
  ),
  C: (
    <svg viewBox="0 0 128 128" fill="none">
      <path d="M115.4 31.2l-47.5-27.4c-2.4-1.4-5.4-1.4-7.8 0L12.6 31.2c-2.4 1.4-3.9 4-3.9 6.8v54.8c0 2.8 1.5 5.4 3.9 6.8l47.5 27.4c2.4 1.4 5.4 1.4 7.8 0l47.5-27.4c2.4-1.4 3.9-4 3.9-6.8V38c0-2.8-1.5-5.4-3.9-6.8z" fill="#A8B9CC"/>
      <path d="M64 126.9c-1.3 0-2.6-.3-3.8-1l-47.5-27.4c-2.4-1.4-3.9-4-3.9-6.8V36.9c0-2.8 1.5-5.4 3.9-6.8l47.5-27.4c2.4-1.4 5.4-1.4 7.8 0l47.5 27.4c2.4-1.4 3.9 4 3.9 6.8v54.8c0 2.8-1.5 5.4-3.9 6.8l-47.5 27.4c-1.3.7-2.6 1-4 1zm0-116.8c-1 0-1.9.3-2.7.7L13.8 38.3c-1.6 1-2.6 2.7-2.6 4.5v54.8c0 1.8 1 3.5 2.6 4.5l47.5 27.4c1.6 1 3.7 1 5.3 0l47.5-27.4c1.6-1 2.6-2.7 2.6-4.5V42.8c0-1.8-1-3.5-2.6-4.5L66.7 10.9c-.8-.5-1.7-.8-2.7-.8z" fill="#3949AB"/>
      <path d="M82.2 78.4c-3.8 4.6-9.5 7.6-16.1 7.6-11.4 0-20.6-9.2-20.6-20.6s9.2-20.6 20.6-20.6c6.6 0 12.3 3 16.1 7.6l10-10C85.5 33.6 75.4 28 64.1 28 44.8 28 29.2 43.6 29.2 63s15.6 35 34.9 35c11.3 0 21.4-5.6 28.1-14.4l-10-10z" fill="#3949AB"/>
    </svg>
  ),
  'C++': (
    <svg viewBox="0 0 128 128" fill="none">
      <path d="M115.4 31.2l-47.5-27.4c-2.4-1.4-5.4-1.4-7.8 0L12.6 31.2c-2.4 1.4-3.9 4-3.9 6.8v54.8c0 2.8 1.5 5.4 3.9 6.8l47.5 27.4c2.4 1.4 5.4 1.4 7.8 0l47.5-27.4c2.4-1.4 3.9-4 3.9-6.8V38c0-2.8-1.5-5.4-3.9-6.8z" fill="#00599C"/>
      <path d="M62 82.5c-10.7 0-19.5-8.8-19.5-19.5S51.3 43.5 62 43.5c6.5 0 12.2 3.2 15.8 8.1l6.7-5.9C79 38 71.1 33 62 33 45.4 33 32 46.4 32 63s13.4 30 30 30c9.1 0 17-5 22.5-12.7l-6.7-5.9c-3.6 4.9-9.3 8.1-15.8 8.1zm22.5-26h6v-6h5v6h6v5h-6v5h-6v6h-5v-6h-6v-5zm18 0h6v-6h5v6h6v5h-6v6h-5v-6h-6v-5z" fill="#FFF"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M7 17.5c.4.7 1 1.2 2 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6L8.3 15c-1.6-.7-2.6-1.6-2.6-3.3 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.5l.6.3c1.9.8 2.9 1.7 2.9 3.4 0 2-1.5 3.1-3.6 3.1-2 0-3.3-1-3.9-2.2L7 17.5zM14.5 17.2c.4.8 1 1.4 2.1 1.4s1.8-.5 1.8-2.5V12h-2v4c0 .9-.1 1.3-.7 1.3-.5 0-.8-.4-1-.8l-1.7 1z" fill="#000"/>
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="9" ry="3" fill="#3E6E93"/>
      <path d="M3 9c0 1.7 4 3 9 3s9-1.3 9-3V6c0 1.7-4 3-9 3S3 7.7 3 6v3z" fill="#32597A"/>
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3V9c0 1.7-4 3-9 3s-9-1.3-9-3v3z" fill="#294B66"/>
      <path d="M3 15c0 1.7 4 3 9 3s9-1.3 9-3v-3c0 1.7-4 3-9 3s-9-1.3-9-3v3z" fill="#213E54"/>
      <path d="M3 18c0 1.7 4 3 9 3s9-1.3 9-3v-3c0 1.7-4 3-9 3s-9-1.3-9-3v3z" fill="#1A3142"/>
    </svg>
  ),
  R: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12z" fill="#276DC3"/>
      <path d="M16.6 15l-1.9-3.2c1.4-.4 2.2-1.4 2.2-2.8 0-1.8-1.4-3-3.6-3H7.5v11h2.5v-4h2.2l2 4h2.4zM10 8h2.8c1 0 1.6.4 1.6 1.2 0 .8-.6 1.2-1.6 1.2H10V8z" fill="#FFF"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="currentColor"/>
      <path d="M16.6 17.5L9.1 7.6H7v8.8h1.6v-6.3l6.5 8.6a10.8 10.8 0 0 0 1.5-1.2zM15.4 7.6h1.6v8.8h-1.6z" fill="var(--bg)"/>
    </svg>
  ),
  'HTML/CSS': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#E34F26"/>
      <path d="M12 19.5l5.3-1.2 1.3-14.3H12v15.5z" fill="#EF652A"/>
      <path d="M12 10.5H8.8l-.2-2.5H12V5.5H6.2l.6 6.5H12v-1.5zM12 15.3l-.1.1-2.8-.8-.2-2H6.8l.4 4.5L12 18.5v-3.2z" fill="#fff"/>
      <path d="M12 10.5v1.5h3l-.3 3.3-2.7.8v3.2l5-1.4.1-1.3.6-6.6.1-1H12z" fill="#fff"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 12.5c2-3.5 4.5-5 7.5-4.5 1.7.3 3.2 1.4 4.4 3 1.5 1.8 3.5 2 5.6 1L21 16.5c-2 3.5-4.5 5-7.5 4.5-1.7-.3-3.2-1.4-4.4-3-1.5-1.8-3.5-2-5.6-1L6 12.5zm-5-5c2-3.5 4.5-5 7.5-4.5 1.7.3 3.2 1.4 4.4 3 1.5 1.8 3.5 2 5.6 1L16 11.5c-2 3.5-4.5 5-7.5 4.5-1.7-.3-3.2-1.4-4.4-3-1.5-1.8-3.5-2-5.6-1L1 7.5z" fill="#38B2AC"/>
    </svg>
  ),
  'Material UI': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M2 8l10-5.8L22 8v8l-10 5.8L2 16V8z" fill="#0081CB"/>
      <path d="M12 2.2L22 8l-10 5.8L2 8l10-5.8z" fill="#00B0FF"/>
      <path d="M22 16l-10 5.8V10.2L22 4.4V16z" fill="#00599B"/>
    </svg>
  ),
  'Framer Motion': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 12V4H4l8 8zm0 0h8l-8 8v-8zm0 0H4l8-8v8zm0 0l8-8v8l-8 8v-8z" fill="currentColor"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933"/>
      <path d="M12 19L5 15V9l7 4v6z" fill="#2E8B2E"/>
      <path d="M12 19l7-4V9l-7 4v6z" fill="#4BCC4B"/>
    </svg>
  ),
  Flask: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2c-1.1 0-2 .9-2 2v6l-5 9c-.5 1 .2 2.2 1.4 2.2h11.2c1.2 0 1.9-1.2 1.4-2.2l-5-9V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#009688"/>
      <path d="M12 4L6 14h5v6l6-10h-5V4z" fill="#fff"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 0-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13z" fill="#47A248"/>
      <path d="M12 4v16" stroke="#fff" strokeWidth="1.2"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3C7 3 3.5 4.8 3.5 7s3.5 4 8.5 4 8.5-1.8 8.5-4S17 3 12 3z" fill="#336791"/>
      <path d="M3.5 7v3c0 2.2 3.5 4 8.5 4s8.5-1.8 8.5-4V7" stroke="#FFF" strokeWidth="1" fill="none"/>
      <path d="M3.5 10v3c0 2.2 3.5 4 8.5 4s8.5-1.8 8.5-4v-3" stroke="#FFF" strokeWidth="1" fill="none"/>
      <path d="M3.5 13v3c0 2.2 3.5 4 8.5 4s8.5-1.8 8.5-4v-3" stroke="#FFF" strokeWidth="1" fill="none"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22.5 11.5l-10-10a1.4 1.4 0 0 0-2 0l-2 2 2.5 2.5a1.7 1.7 0 0 1 2.1 2.1l2.4 2.4a1.7 1.7 0 1 1-1 1L12 9v5.2a1.7 1.7 0 1 1-1.4 0V8.9L8 6.3a1.7 1.7 0 0 1-2.2-2.2L3.5 1.8l-2 2a1.4 1.4 0 0 0 0 2l10 10a1.4 1.4 0 0 0 2 0l9-9a1.4 1.4 0 0 0 0-2z" fill="#F05032"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M2.5 11h2c0-1.4.9-2.5 2-2.5h11V6h-2.5V4h4V2H17v1.5h-4.5V2H8v4H5c-1.4 0-2.5 1.1-2.5 2.5V11zm2 1h16c.3 0 .5.2.5.5v3c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6v-3c0-.3.2-.5.5-.5h4z" fill="#2496ED"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M15 15.5c-2 1.3-4.5 1.8-6.5 1.5-2-.3-3.8-1.5-4.8-3.3l-.2-.3.4-.2c1.7-1 4.2-.8 6 .6 1.8 1.4 2.8 3.5 2.5 5.5l-.1.4.4.1c1.5.5 3 .5 4.5.2.4-.1.8-.2 1.2-.4l.3-.1-.1-.3c-.3-1-.9-1.9-1.6-2.7l-2.1-2z" fill="#FF9900"/>
    </svg>
  ),
  GCP: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" fill="#4285F4"/>
      <path d="M12 2l-8 5v5l8-5 8 5V7l-8-5z" fill="#34A853"/>
      <path d="M4 12v5l8 5 8-5v-5l-8 5-8-5z" fill="#FBBC05"/>
      <path d="M12 7l-8 5 8 5 8-5-8-5z" fill="#EA4335"/>
    </svg>
  ),
  'Power BI': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="14" width="6" height="8" fill="#E6C400"/>
      <rect x="9" y="8" width="6" height="14" fill="#E6C400"/>
      <rect x="16" y="2" width="6" height="20" fill="#E6C400"/>
    </svg>
  ),
  Tableau: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="#E6550D"/>
      <circle cx="6" cy="18" r="3" fill="#3182BD"/>
      <circle cx="18" cy="6" r="3" fill="#3182BD"/>
      <circle cx="18" cy="18" r="2" fill="#E6550D"/>
      <circle cx="6" cy="6" r="2" fill="#E6550D"/>
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M17 1.5L9.5 9l-4-3L2 7.5v9l3.5 1.5 4-3L17 22.5 22 20V4L17 1.5z" fill="#0078D4"/>
      <path d="M22 4v16l-5 2.5-7.5-7.5L5.5 18l-3.5-1.5v-9L5.5 6l4 3L17 1.5 22 4zM17 18l-8-6 8-6v12z" fill="#fff" opacity=".3"/>
    </svg>
  ),
  Figma: <SiFigma size="100%" color="#F24E1E" />,
}

export function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}

const allSkills = [
  'Java', 'C++', 'JavaScript', 'SQL',
  'React', 'Next.js', 'HTML/CSS', 'Tailwind', 'Figma', 'Framer Motion',
  'Node.js', 'PostgreSQL',
  'Git', 'GCP', 'VS Code'
]

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })

  const logos = allSkills.map(skill => ({
    title: skill,
    node: (
      <div 
        className={styles.icon} 
        style={{ 
          width: '60px', 
          height: '60px', 
          margin: '0 20px', 
          filter: 'grayscale(100%)', 
          opacity: 0.6, 
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 110
        }}
        title={skill}
        onMouseEnter={(e) => { 
          e.currentTarget.style.filter = 'grayscale(0%)'; 
          e.currentTarget.style.opacity = '1'; 
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('blob-snap', { detail: { target: e.currentTarget } }));
          }
        }}
        onMouseLeave={(e) => { 
          e.currentTarget.style.filter = 'grayscale(100%)'; 
          e.currentTarget.style.opacity = '0.6'; 
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('blob-release'));
          }
        }}
      >
        {icons[skill] ?? <DefaultIcon />}
      </div>
    )
  }))

  return (
    <section id="skills" className={styles.skills} style={{ position: 'relative', zIndex: 1 }}>
      <BlobCursor zIndex={0} />
      <div className={styles.inner} style={{ position: 'relative', zIndex: 10 }}>

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

      <div style={{ position: 'relative', width: '100%', paddingBottom: '3rem', zIndex: 10 }}>
        <div style={{ height: '80px', width: '100%', position: 'relative', marginTop: '1rem', zIndex: 10 }}>
          <LogoLoop 
            logos={logos}
            speed={50}
            direction="left"
            logoHeight={65}
            gap={32}
            fadeOut={true}
            fadeOutColor="var(--bg)"
            scaleOnHover={true}
            pauseOnHover={true}
          />
        </div>
      </div>

    </section>
  )
}
