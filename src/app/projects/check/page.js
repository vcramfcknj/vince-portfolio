'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from '../ProjectDetail.module.css'

export default function CheckProjectPage() {
  
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
            <span className={styles.categoryTag}>IoT Health Tech</span>
            <h1 className={styles.title}>C.H.E.C.K</h1>
            <p className={styles.subtitle}>
              Community Health Evaluation Center Kiosk — an automated, non-invasive vital signs monitoring and biometric registration system.
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
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>July - Dec 2025</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>IoT Dev & Programmer</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroShowcase}>
              <Image 
                src="/projects/check/check landing.png" 
                alt="C.H.E.C.K System Showcase"
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
                <strong>Overview:</strong> C.H.E.C.K is an intelligent IoT self-service kiosk engineered for Barangay Darapidap to streamline community-level primary healthcare delivery. The system automates resident health data management, physiological vitals monitoring, and biometric identification through rapid fingerprint enrollment.
              </p>
              <div className={styles.problemCallout}>
                <h3 className={styles.problemTitle}>The Problem</h3>
                <p className={styles.problemText}>
                  Traditional manual check-ups conducted by Barangay Health Workers (BHWs) rely heavily on pen-and-paper logs and separate diagnostic tools. This manual process causes severe entry bottlenecks, transcription inaccuracies, lost historical medical files, and delayed triage for at-risk residents.
                </p>
              </div>
            </div>
          </article>

          {/* Key Features */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Key Features</h2>
            <div className={styles.featuresGrid}>
              
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Biometric Authentication</h3>
                <p className={styles.featureDesc}>
                  AS608 optical fingerprint sensor enables 1-to-N resident identification, retrieving medical profiles in under 500ms.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Non-Contact Thermometry</h3>
                <p className={styles.featureDesc}>
                  Medical-grade MLX90614 infrared sensor measures body temperature hygienically with zero physical touch required.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Automated Laser BMI</h3>
                <p className={styles.featureDesc}>
                  Combines VL53L0X Time-of-Flight laser distance sensor and HX711 load cell to calculate precise BMI instantly.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Pulse & SpO2 Telemetry</h3>
                <p className={styles.featureDesc}>
                  MAX30102 biosensor captures blood oxygen saturation and heart rate, transmitting telemetry to the central web portal.
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
                    <h4 className={styles.challengeHeading}>Multi-Sensor Signal Contention</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Reading 4 disparate sensors simultaneously over shared I2C/UART buses caused timing jitter and inaccurate biometric spikes.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Architected an asynchronous state machine in C++ on the dual-core ESP32, isolating sensor tasks onto Core 0 with median filtering before passing clean payloads.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeGrid}>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeChallenge}>Challenge</span>
                    <h4 className={styles.challengeHeading}>Intermittent Rural Connectivity</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Rural health centers occasionally experience unstable internet connectivity during peak consultation hours.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Implemented flash EEPROM local caching with an automated background synchronization queue once Wi-Fi connectivity is restored.
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
                  <span className={styles.metricLabel}>Effectiveness Rating</span>
                  <span className={styles.metricValue}>6.88 / 7.0</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Integrated Sensors</span>
                  <span className={styles.metricValue}>4 Bio-Units</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Triage Speed</span>
                  <span className={styles.metricValue}>&lt; 3.0s</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Match Accuracy</span>
                  <span className={styles.metricValue}>100%</span>
                </div>
              </div>
            </div>

            {/* Categorized Tech Stack */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Tech Stack</h3>
              <div className={styles.techGroupList}>
                
                <div>
                  <span className={styles.techGroupLabel}>Hardware & IoT</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>ESP32</span>
                    <span className={styles.techBadge}>AS608 Fingerprint</span>
                    <span className={styles.techBadge}>VL53L0X Laser</span>
                    <span className={styles.techBadge}>MLX90614 Temp</span>
                    <span className={styles.techBadge}>MAX30102 SpO2</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Firmware</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>C++</span>
                    <span className={styles.techBadge}>FreeRTOS</span>
                    <span className={styles.techBadge}>Arduino</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Web & Database</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>PHP (OOP)</span>
                    <span className={styles.techBadge}>JavaScript</span>
                    <span className={styles.techBadge}>MySQL</span>
                    <span className={styles.techBadge}>Bootstrap 5</span>
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
        <Link href="/projects/spectaqr" className={styles.nextProjectTitle}>
          SpectaQR <ArrowRight size={26} />
        </Link>
      </div>

    </motion.main>
  )
}
