'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '../ProjectDetail.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

export default function ITSeminarProjectPage() {
  
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
        <span className={styles.categoryTag}>Web Development</span>
        <h1 className={styles.title}>HR System</h1>
        <p className={styles.subtitle}>
          Intensive masterclass on Artificial Intelligence and modern Application Development.
        </p>

        <div className={styles.buttonGroup}>
          <a href="#" className={styles.primaryBtn}>View Certificate</a>
        </div>

        {/* HORIZONTAL META BAR */}
        <div className={styles.metaBar}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Date / Location</span>
            <span className={styles.metaValue}>Jan 6-8, 2026 • ISPSC</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Type</span>
            <span className={styles.metaValue}>Hands-on Workshop</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Topics</span>
            <div className={styles.pillContainer}>
              <span className={styles.techPill}>Gen AI</span>
              <span className={styles.techPill}>Agentic AI</span>
              <span className={styles.techPill}>PRD-Driven Dev</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SHOWCASE */}
      <div className={styles.showcaseContainer}>
        <Image 
          src="/projects/it-seminar/Hr-System.png" 
          alt="HR System Showcase"
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
            <strong>Overview:</strong> Organized by the BSIT Department of ISPSC, this three-day intensive seminar bridged the gap between academic theory and industry-grade technology. The event focused squarely on the explosive advancements in artificial intelligence.
          </p>
          <p>
            <strong>The Objective:</strong> To equip developers with foundational concepts in generative AI, conversational AI, and autonomous agentic systems, while exposing them to modern, practical frameworks for deploying AI-powered applications.
          </p>
        </div>

        <h2 className={styles.sectionHeader}>Key Workflows Learned</h2>
        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Generative AI</h3>
            <p className={styles.featureDesc}>Deep dive into the mechanics of LLMs (Large Language Models) and prompt engineering.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Agentic Systems</h3>
            <p className={styles.featureDesc}>Understanding autonomous AI agents that can chain tasks and execute complex, multi-step operations.</p>
          </article>
          <article className={styles.featureCard}>
            <h3 className={styles.featureTitle}>PRD-Driven Dev</h3>
            <p className={styles.featureDesc}>Methodologies for accelerating application building using Product Requirements Document (PRD) driven AI coding.</p>
          </article>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <div className={styles.nextProjectContainer}>
        <span className={styles.nextProjectLabel}>Next Project</span>
        <Link href="/projects/spectaqr" className={styles.nextProjectTitle}>
          SpectaQR →
        </Link>
      </div>

    </motion.main>
  )
}
