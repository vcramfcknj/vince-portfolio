'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '../ProjectDetail.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

export default function ErovoutikaProjectPage() {
  
  // Hover effect for feature cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(`.${styles.featureCard}`)
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.main 
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.backLinkContainer}>
        <MagneticButton 
          text="Back to Projects" 
          href="/projects" 
          icon="←"
          color="var(--text)"
          bgColor="transparent"
          fillColor="var(--text)"
          textColorHover="var(--bg)"
          borderColor="var(--border-mid)"
          style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
        />
      </div>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <span className={styles.categoryTag}>OJT Immersion</span>
        <h1 className={styles.title}>Erovoutika Ph, Inc.</h1>
        <p className={styles.subtitle}>
          Robotics and Automation Integration internship
        </p>

        <div className={styles.buttonGroup}>
          <a href="https://erovoutika-revamp.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
            View Platform
          </a>
        </div>

        {/* HORIZONTAL META BAR */}
        <div className={styles.metaBar}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Duration / Location</span>
            <span className={styles.metaValue}>1 Semester • Makati City</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>IT Intern</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Core Exposure</span>
            <div className={styles.pillContainer}>
              <span className={styles.techPill}>Robotics</span>
              <span className={styles.techPill}>IoT Boards</span>
              <span className={styles.techPill}>System Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SHOWCASE */}
      <div className={styles.showcaseContainer}>
        <Image 
          src="/projects/erovoutika/Screenshot 2026-06-11 161220.png" 
          alt="Erovoutika Ph Platform Showcase"
          fill
          className={styles.showcaseImage}
        />
      </div>

      <div className={styles.divider} />

      {/* CONTENT SECTION */}
      <section className={styles.contentContainer}>
        
        <h2 className={styles.sectionHeader}>Executive Summary</h2>
        <div className={styles.textBlock}>
          <p>
            <strong>Overview:</strong> Erovoutika Ph, Inc. is a leading Philippine-based robotics and technology education company. Operating as an education enabler, the company specializes in developing comprehensive STEM robotics kits and building localized IoT-based learning platforms for schools and universities nationwide.
          </p>
          <p>
            <strong>The Experience:</strong> During my immersion at their Makati City headquarters, I was fully integrated into their technical deployment teams, gaining direct exposure to practical hardware-software ecosystems.
          </p>
        </div>

        <h2 className={styles.sectionHeader}>Key Responsibilities</h2>
        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Kit Integration</h3>
            <p className={styles.featureDesc}>Assisted in the testing, assembly, and quality assurance of IoT-based educational STEM kits.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Module Development</h3>
            <p className={styles.featureDesc}>Contributed to the writing and structuring of digital curriculum materials tailored to local academic requirements.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Platform Support</h3>
            <p className={styles.featureDesc}>Participated in the maintenance and support of their e-commerce platform and remote learning environments.</p>
          </article>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <div className={styles.nextProjectContainer}>
        <span className={styles.nextProjectLabel}>Next Project</span>
        <Link href="/projects/check" className={styles.nextProjectTitle}>
          C.H.E.C.K System →
        </Link>
      </div>

    </motion.main>
  )
}
