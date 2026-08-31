'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import styles from '../ProjectDetail.module.css'

export default function SpectaQRProjectPage() {
  
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
            <span className={styles.categoryTag}>Event Management</span>
            <h1 className={styles.title}>SpectaQR</h1>
            <p className={styles.subtitle}>
              Automated event attendance tracking, fine calculation, and payment confirmation system engineered for student councils.
            </p>

            <div className={styles.buttonGroup}>
              <a 
                href="https://web.facebook.com/photo?fbid=122200903010297650" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.primaryBtn}
              >
                View Details <ExternalLink size={14} style={{ marginLeft: '0.35rem' }} />
              </a>
              <a href="/projects" className={styles.secondaryBtn}>
                All Projects
              </a>
            </div>

            <div className={styles.heroMetaGrid}>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>Academic Year 2023</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>Full Stack Developer</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroShowcase}>
              <Image 
                src="/projects/spectaqr/SpectaQR.jpg" 
                alt="SpectaQR System Showcase"
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
                <strong>Overview:</strong> SpectaQR was engineered for the Supreme Student Council (SSC) to streamline operations during major institutional assemblies, ensuring transparency, processing speed, and financial audit accuracy.
              </p>
              <div className={styles.problemCallout}>
                <h3 className={styles.problemTitle}>The Problem</h3>
                <p className={styles.problemText}>
                  Manual paper rosters created agonizing 45-minute entry queues during university events. In addition, computing disciplinary fines for missed attendance checkpoints manually caused frequent disputes and clearance delays.
                </p>
              </div>
            </div>
          </article>

          {/* Key Features */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Key Features</h2>
            <div className={styles.featuresGrid}>
              
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>QR Attendance</h3>
                <p className={styles.featureDesc}>
                  High-speed QR scanning securely logs student attendance across 4 customizable event phases in milliseconds.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Auto Fine Calculation</h3>
                <p className={styles.featureDesc}>
                  Algorithmic rules engine dynamically computes penalties by multiplying base fines against missed event checkpoints.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Payment Confirmations</h3>
                <p className={styles.featureDesc}>
                  Council officers log cash settlements with digital confirmation receipts and an immutable transaction audit log.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Student Dashboard</h3>
                <p className={styles.featureDesc}>
                  Students securely log in to monitor their attendance history, computed fines, and official clearance statuses.
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
                    <h4 className={styles.challengeHeading}>Peak Entry Concurrency</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Hundreds of students scanning at entryway gates simultaneously risked browser lag during continuous video stream decoding.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Integrated a debounced WebAssembly QR engine that throttled frame analysis and queued scan IDs with optimistic UI updates.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeGrid}>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeChallenge}>Challenge</span>
                    <h4 className={styles.challengeHeading}>Duplicate Scan Prevention</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Preventing double-scanning or QR screenshot sharing across overlapping checkpoint timeframes.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Enforced database composite unique constraints `(student_id, event_id, phase_id)` combined with server-side timestamp validation.
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
                  <span className={styles.metricLabel}>Event Phases</span>
                  <span className={styles.metricValue}>4 Checkpoints</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Queue Time Cut</span>
                  <span className={styles.metricValue}>95% Faster</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Users Handled</span>
                  <span className={styles.metricValue}>1,000+ Students</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Audit Accuracy</span>
                  <span className={styles.metricValue}>100%</span>
                </div>
              </div>
            </div>

            {/* Categorized Tech Stack */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Tech Stack</h3>
              <div className={styles.techGroupList}>
                
                <div>
                  <span className={styles.techGroupLabel}>Frontend</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>JavaScript</span>
                    <span className={styles.techBadge}>Bootstrap 5</span>
                    <span className={styles.techBadge}>HTML5 / CSS3</span>
                    <span className={styles.techBadge}>Html5-QRCode</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Backend</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>PHP (OOP)</span>
                    <span className={styles.techBadge}>REST Endpoints</span>
                    <span className={styles.techBadge}>Session Auth</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Database & Tools</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>MySQL</span>
                    <span className={styles.techBadge}>DomPDF</span>
                    <span className={styles.techBadge}>SweetAlert2</span>
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
        <Link href="/projects/erovoutika" className={styles.nextProjectTitle}>
          Erovoutika Ph <ArrowRight size={26} />
        </Link>
      </div>

    </motion.main>
  )
}
