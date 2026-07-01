'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '../ProjectDetail.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

export default function SpectaQRProjectPage() {
  
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
        <span className={styles.categoryTag}>Event Management</span>
        <h1 className={styles.title}>SpectaQR</h1>
        <p className={styles.subtitle}>
          Automated event attendance tracking, fine calculation, and payment confirmation system.
        </p>

        <div className={styles.buttonGroup}>
          <a href="https://web.facebook.com/photo?fbid=122200903010297650" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
            View Details
          </a>
        </div>

        {/* HORIZONTAL META BAR */}
        <div className={styles.metaBar}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>Academic Year 2023</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>Full Stack Developer</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Tech Stack</span>
            <div className={styles.pillContainer}>
              <span className={styles.techPill}>PHP</span>
              <span className={styles.techPill}>MySQL</span>
              <span className={styles.techPill}>JS</span>
              <span className={styles.techPill}>Bootstrap</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SHOWCASE */}
      <div className={styles.showcaseContainer}>
        <Image 
          src="/projects/spectaqr/SpectaQR.jpg" 
          alt="SpectaQR System Showcase"
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
            <strong>Overview:</strong> The SpectaQR System was engineered for the Supreme Student Council (SSC) to streamline operations during major events, guaranteeing transparency, speed, and accuracy.
          </p>
          <p>
            <strong>The Problem:</strong> Manual attendance checking using paper and pen caused severe bottlenecks during event entry and exit phases. Furthermore, calculating fines for missed attendance phases was highly inaccurate, leading to payment disputes and lost revenue.
          </p>
        </div>

        <h2 className={styles.sectionHeader}>Key Features</h2>
        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>QR Attendance</h3>
            <p className={styles.featureDesc}>Rapid QR code scanning securely records student attendance across 4 customizable event phases.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Auto Fine Calculation</h3>
            <p className={styles.featureDesc}>Algorithmic processing multiplies the predetermined base fine by the exact number of missed phases.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Payment Confirmations</h3>
            <p className={styles.featureDesc}>Admins can instantly deduct payments via scanning, producing a secure audit log for every transaction.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Student Dashboard</h3>
            <p className={styles.featureDesc}>Students can log in securely to verify their attendance records, accumulated fines, and payment history.</p>
          </article>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <div className={styles.nextProjectContainer}>
        <span className={styles.nextProjectLabel}>Next Project</span>
        <Link href="/projects/erovoutika" className={styles.nextProjectTitle}>
          Erovoutika Ph →
        </Link>
      </div>

    </motion.main>
  )
}
