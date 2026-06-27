'use client'

import { useState, useEffect } from 'react'
import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Experience.module.css'

import { SiNextdotjs, SiReact, SiGithub, SiVercel, SiMysql, SiHtml5, SiCss, SiJavascript } from 'react-icons/si'
import { FaMobileAlt, FaGlobe, FaPaintBrush, FaMicrochip } from 'react-icons/fa'

const experiences = [
  {
    id: 'exp1',
    role: 'Junior Developer Intern',
    company: 'Erovoutika Ph, Inc.',
    duration: 'Jan 28 – Mar 3, 2026',
    achievements: [
      'Led the frontend implementation for the full website revamp using Next.js and React.',
      'Designed and integrated mobile-responsive UI/UX wireframes.',
      'Completed 220 hours — exceeding the required 200-hour minimum.'
    ],
    tags: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'GitHub', icon: <SiGithub /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'UI/UX', icon: <FaPaintBrush /> },
      { name: 'IoT', icon: <FaMicrochip /> },
    ],
    lottieUrl: '/lottie-dev.json',
    link: '/projects/erovoutika',
    linkText: 'View Live Site',
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
    achievements: [
      'Recognized as the top web and mobile developer in the institution.',
      'Awarded for outstanding performance in development projects and technical skill.',
      'Demonstrated high innovation in creating digital solutions.'
    ],
    tags: [
      { name: 'Web Dev', icon: <FaGlobe /> },
      { name: 'Mobile Dev', icon: <FaMobileAlt /> },
    ],
    lottieUrl: '/lottie-award.json',
    link: '/about#awards',
    linkText: 'View Certificate',
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
    achievements: [
      'Designed and developed responsive web applications for various personal projects.',
      'Built solutions using HTML, CSS, JavaScript, and MySQL.',
      'Focused on clean UI, smooth UX, and solid database management.'
    ],
    tags: [
      { name: 'HTML5', icon: <SiHtml5 /> },
      { name: 'CSS3', icon: <SiCss /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'MySQL', icon: <SiMysql /> },
    ],
    lottieUrl: '/lottie-web.json',
    link: '/projects',
    linkText: 'View Projects',
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



import Carousel from '@/components/ui/Carousel'
import { ContainerScroll } from '@/components/ui/ContainerScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import dynamic from 'next/dynamic'
const LottieAnimation = dynamic(() => import('@/components/ui/LottieAnimation'), { ssr: false })

export default function Experience() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })

  const carouselItems = experiences.map(exp => ({
    id: exp.id,
    title: exp.role,
    company: exp.company,
    duration: exp.duration,
    description: exp.description,
    achievements: exp.achievements,
    tags: exp.tags,
    lottieUrl: exp.lottieUrl,
    link: exp.link,
    linkText: exp.linkText,
    icon: exp.iconEl
  }))

  const titleComponent = (
    <div
      ref={headerRef}
      className={`${styles.headerLeft} ${headerVisible ? styles.visible : ''}`}
    >
      <p className="section-subtitle">Where I&rsquo;ve Worked</p>
    </div>
  )

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.desktopOnly}>
        <ContainerScroll titleComponent={titleComponent}>
          <div className={styles.carouselWrapper}>
            <Carousel 
              items={carouselItems} 
              baseWidth={500} 
              loop={false} 
              autoplay={false} 
            />
          </div>
        </ContainerScroll>
      </div>
      
      <div className={styles.mobileOnly}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          {titleComponent}
        </div>
        <div className={styles.mobileStack} style={{ padding: '0 1.5rem' }}>
          {carouselItems.map(item => (
            <div key={item.id} className={styles.mobileCard}>
              <div className={styles.mobileCardHeader}>
                <div className={styles.mobileCardIcon}>{item.icon}</div>
                <span className={styles.mobileCardDuration}>{item.duration}</span>
              </div>
              
              <h3 className={styles.mobileCardTitle}>{item.title}</h3>
              <p className={styles.mobileCardCompany}>{item.company}</p>
              
              {item.achievements && (
                <ul className={styles.mobileCardAchievements}>
                  {item.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              )}
              
              <div className={styles.mobileCardTags}>
                {item.tags.map(tag => (
                  <span key={tag.name} className={styles.mobileCardTag}>
                    {tag.icon} {tag.name}
                  </span>
                ))}
              </div>
              
              {item.link && (
                <div className={styles.mobileCardAction}>
                  <MagneticButton
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    text={item.linkText || 'View Project'}
                    icon=""
                    effect="liquid"
                    color="var(--bg)"
                    bgColor="var(--text)"
                    fillColor="var(--bg)"
                    textColorHover="var(--text)"
                  />
                </div>
              )}
              
              {item.lottieUrl && (
                <div className={styles.mobileCardImageContainer}>
                  <LottieAnimation url={item.lottieUrl} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}