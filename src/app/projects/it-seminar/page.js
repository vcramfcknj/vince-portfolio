'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '../ProjectDetail.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

export default function ITSeminarProjectPage() {
  return (
    <motion.main 
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: '3rem' }}>
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
      <section className={styles.heroGridContainer}>
        <div className={styles.heroLeft}>
          <span className={styles.categoryTag}>3-Day IT Seminar</span>
          <h1 className={styles.title}>AI & App Dev</h1>
          <p className={styles.subtitle}>
            Intensive masterclass on Artificial Intelligence and modern Application Development.
          </p>

          <div className={styles.buttonGroup}>
            <a href="#" className={styles.primaryBtn}>View Certificate</a>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Date</span>
              <span className={styles.metaValue}>Jan 6-8, 2026</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Location</span>
              <span className={styles.metaValue}>ISPSC Candon Campus</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* CONTENT SECTION */}
      <section className={styles.contentGrid}>
        
        {/* LEFT COLUMN: Main Content */}
        <div className={styles.mainColumn}>
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
        </div>

        {/* RIGHT COLUMN: Sidebar (Metrics & Tech Stack) */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3>Seminar Details</h3>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Duration</span>
              <span className={styles.metricValue}>3 Days</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Type</span>
              <span className={styles.metricValue}>Hands-on Workshop</span>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Topics Covered</h3>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>AI Concepts</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>Generative AI</span>
                <span className={styles.techPill}>Conversational AI</span>
                <span className={styles.techPill}>Agentic AI</span>
              </div>
            </div>

            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Methodologies</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>PRD-Driven</span>
                <span className={styles.techPill}>PRP-Driven</span>
                <span className={styles.techPill}>Team-based Sprints</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </motion.main>
  )
}
