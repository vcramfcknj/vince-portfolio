'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '../ProjectDetail.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CheckProjectPage() {
  
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
        <span className={styles.categoryTag}>IoT Health Tech</span>
        <h1 className={styles.title}>C.H.E.C.K</h1>
        <p className={styles.subtitle}>
          Community Health Evaluation Center Kiosk for automated, non-invasive vital signs monitoring and biometric registration.
        </p>

        {/* HORIZONTAL META BAR */}
        <div className={styles.metaBar}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Timeline / Rating</span>
            <span className={styles.metaValue}>July-Dec 2025 • 6.88/7.00 Eff.</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>IoT Dev & Programmer</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Hardware / Stack</span>
            <div className={styles.pillContainer}>
              <span className={styles.techPill}>ESP32</span>
              <span className={styles.techPill}>C++</span>
              <span className={styles.techPill}>PHP / MySQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SHOWCASE */}
      <div className={styles.showcaseContainer}>
        <Image 
          src="/projects/check/check landing.png" 
          alt="C.H.E.C.K System Showcase"
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
            <strong>Overview:</strong> C.H.E.C.K is an intelligent IoT kiosk deployed in Barangay Darapidap to streamline resident health data management, vital signs monitoring, and biometric identification through fingerprint enrollment.
          </p>
          <p>
            <strong>The Problem:</strong> Traditional manual methods for checking vital signs are time-consuming, prone to transcription errors, and result in delayed medical interventions. There was a critical need for an automated, localized, and hygienic health tracking system.
          </p>
        </div>

        {/* EXTRA IMAGES FOR CHECK PROJECT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
          <div className={styles.showcaseContainer} style={{ margin: 0, aspectRatio: '4/3', borderRadius: '1rem' }}>
            <Image src="/projects/check/Kiosk.png" alt="Kiosk Hardware" fill className={styles.showcaseImage} />
          </div>
          <div className={styles.showcaseContainer} style={{ margin: 0, aspectRatio: '4/3', borderRadius: '1rem' }}>
            <Image src="/projects/check/monitoring.png" alt="Monitoring Interface" fill className={styles.showcaseImage} />
          </div>
        </div>

        <h2 className={styles.sectionHeader}>Key Features</h2>
        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Biometric Authentication</h3>
            <p className={styles.featureDesc}>Secure fingerprint scanning (AS608) to uniquely identify residents and retrieve their specific health records.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Non-invasive Vital Sensors</h3>
            <p className={styles.featureDesc}>Contactless temperature, optical pulse rate, and SpO2 sensors for hygienic, rapid measurements.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Automated BMI Calculation</h3>
            <p className={styles.featureDesc}>Laser-based height (VL53L0X) and load cell weight tracking combined for instant physical health assessment.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Admin Web Dashboard</h3>
            <p className={styles.featureDesc}>A real-time, centralized portal for BHWs to track, manage, and generate reports on community health metrics.</p>
          </article>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <div className={styles.nextProjectContainer}>
        <span className={styles.nextProjectLabel}>Next Project</span>
        <Link href="/projects/it-seminar" className={styles.nextProjectTitle}>
          HR System →
        </Link>
      </div>

    </motion.main>
  )
}
