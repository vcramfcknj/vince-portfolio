'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from '../ProjectDetail.module.css'

export default function ITSeminarProjectPage() {
  
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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* BACK NAVIGATION */}
      <div className={styles.backLinkContainer}>
        <Link href="/projects" className={styles.backBtn}>
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>

      {/* HERO SECTION (2-Column Split) */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          
          <div className={styles.heroLeft}>
            <span className={styles.categoryTag}>Enterprise AI</span>
            <h1 className={styles.title}>HR System</h1>
            <p className={styles.subtitle}>
              Intelligent Human Resource Management platform engineered during an intensive masterclass on Generative AI and PRD-driven development.
            </p>

            <div className={styles.buttonGroup}>
              <a href="/contact" className={styles.primaryBtn}>
                Request Demo
              </a>
              <a href="/projects" className={styles.secondaryBtn}>
                All Projects
              </a>
            </div>

            <div className={styles.heroMetaGrid}>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Date / Location</span>
                <span className={styles.metaValue}>Jan 6-8, 2026 • ISPSC</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>Full Stack & AI Integrator</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroShowcase}>
              <Image 
                src="/projects/it-seminar/Hr-System.png" 
                alt="HR System Showcase"
                fill
                priority
                className={styles.showcaseImage}
              />
            </div>
          </div>

        </div>
      </section>

      {/* MAIN 2-COLUMN CONTENT (8/12 Article + 4/12 Sticky Sidebar) */}
      <div className={styles.mainGrid}>
        
        {/* LEFT COLUMN: Main Case Study */}
        <div className={styles.articleCol}>
          
          {/* Executive Summary */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Executive Summary</h2>
            <div className={styles.textBlock}>
              <p>
                <strong>Overview:</strong> Developed during an intensive three-day masterclass organized by the BSIT Department of ISPSC, this modern HR Management System combines generative AI intelligence with structured PRD-driven development to streamline enterprise employee operations.
              </p>
              <div className={styles.problemCallout}>
                <h3 className={styles.problemTitle}>The Problem</h3>
                <p className={styles.problemText}>
                  Traditional enterprise HR platforms are cumbersome, dependent on manual spreadsheet reconciliation, and lack proactive intelligence for detecting shift conflicts, managing document compliance, and summarizing quarterly performance reviews.
                </p>
              </div>
            </div>
          </article>

          {/* Key Features */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Key Features</h2>
            <div className={styles.featuresGrid}>
              
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>PRD-Driven Workflows</h3>
                <p className={styles.featureDesc}>
                  Engineered using strict Product Requirements Document (PRD) methodologies for rapid, consistent full-stack iteration.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Smart Shift Scheduler</h3>
                <p className={styles.featureDesc}>
                  Automated conflict detection matrix resolves schedule overlaps, leave requests, and minimum staffing thresholds.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Document Lifecycle</h3>
                <p className={styles.featureDesc}>
                  Centralized digital repository for contracts, certifications, and compliance logs with expiration alerts.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>AI Appraisal Summaries</h3>
                <p className={styles.featureDesc}>
                  Synthesizes quarterly performance metrics and peer reviews into objective, natural language executive reports.
                </p>
              </div>

            </div>
          </article>

          {/* Engineering Challenges & Solutions */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Engineering Challenges & Solutions</h2>
            <div className={styles.challengesList}>
              
              <div className={styles.challengeCard}>
                <div className={styles.challengeGrid}>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeChallenge}>Challenge</span>
                    <h4 className={styles.challengeHeading}>LLM Latency in Review Synthesis</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Generating holistic performance reviews across large datasets risked prompt latency and context overflow.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Built an aggregation pipeline that pre-computes numeric indicators into structured JSON schemas before querying the model.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeGrid}>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeChallenge}>Challenge</span>
                    <h4 className={styles.challengeHeading}>Concurrent Schedule Edits</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Simultaneous manager edits to team shift allocations risked race conditions and duplicate shifts.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Utilized optimistic concurrency control with transactional rollbacks on the database layer to maintain schedule integrity.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </article>

        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <aside className={styles.sidebarCol}>
          <div className={styles.stickySidebar}>
            
            {/* Project Metrics */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Project Metrics</h3>
              <div className={styles.metricsList}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Sprint Duration</span>
                  <span className={styles.metricValue}>3 Days</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Core Modules</span>
                  <span className={styles.metricValue}>5 Subsystems</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Codebase Volume</span>
                  <span className={styles.metricValue}>15K+ Lines</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>PRD Automation</span>
                  <span className={styles.metricValue}>100% Complete</span>
                </div>
              </div>
            </div>

            {/* Categorized Tech Stack */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Tech Stack</h3>
              <div className={styles.techGroupList}>
                
                <div>
                  <span className={styles.techGroupLabel}>AI & Intelligence</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Claude 3.5</span>
                    <span className={styles.techBadge}>GPT-4o</span>
                    <span className={styles.techBadge}>Agentic AI</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Frontend</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Next.js</span>
                    <span className={styles.techBadge}>React</span>
                    <span className={styles.techBadge}>Tailwind CSS</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Backend & Data</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Node.js</span>
                    <span className={styles.techBadge}>PostgreSQL</span>
                    <span className={styles.techBadge}>Supabase</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </aside>

      </div>

      {/* MINIMALIST NEXT PROJECT FOOTER */}
      <div className={styles.nextProjectContainer}>
        <span className={styles.nextProjectLabel}>Next Project</span>
        <Link href="/projects/check" className={styles.nextProjectTitle}>
          C.H.E.C.K <ArrowRight size={26} />
        </Link>
      </div>

    </motion.main>
  )
}
