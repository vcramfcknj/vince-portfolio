'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import styles from '../ProjectDetail.module.css'

export default function ErovoutikaProjectPage() {
  
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
            <span className={styles.categoryTag}>Robotics & IoT</span>
            <h1 className={styles.title}>Erovoutika Ph</h1>
            <p className={styles.subtitle}>
              Robotics and automation integration immersion focusing on IoT educational kit deployment and e-learning platform revamp.
            </p>

            <div className={styles.buttonGroup}>
              <a 
                href="https://erovoutika-revamp.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.primaryBtn}
              >
                View Platform <ExternalLink size={14} style={{ marginLeft: '0.35rem' }} />
              </a>
              <a href="/projects" className={styles.secondaryBtn}>
                All Projects
              </a>
            </div>

            <div className={styles.heroMetaGrid}>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Duration / Location</span>
                <span className={styles.metaValue}>1 Semester • Makati City</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>IT & Robotics Intern</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroShowcase}>
              <Image 
                src="/projects/erovoutika/Screenshot 2026-06-11 161220.png" 
                alt="Erovoutika Ph Platform Showcase"
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
                <strong>Overview:</strong> Erovoutika Ph, Inc. is a premier Philippine-based robotics and technology education enterprise. The company specializes in manufacturing STEM trainer kits and building localized IoT-based learning platforms for schools and universities nationwide.
              </p>
              <div className={styles.problemCallout}>
                <h3 className={styles.problemTitle}>The Problem</h3>
                <p className={styles.problemText}>
                  Academic institutions often face a disconnect between theoretical electronics textbooks and hands-on robotics engineering. Without standardized, pre-tested hardware trainer modules, students encounter high friction when prototyping automated systems.
                </p>
              </div>
            </div>
          </article>

          {/* Key Responsibilities */}
          <article className={styles.articleSection}>
            <h2 className={styles.sectionHeader}>Key Responsibilities</h2>
            <div className={styles.featuresGrid}>
              
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Hardware QA & Assembly</h3>
                <p className={styles.featureDesc}>
                  Conducted component-level quality assurance, pinout verification, and batch assembly for IoT STEM robotics trainer kits.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Curriculum Modules</h3>
                <p className={styles.featureDesc}>
                  Structured interactive laboratory manuals covering microcontroller setup, sensor interfacing, and motor driver control.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Platform Revamp</h3>
                <p className={styles.featureDesc}>
                  Contributed to the frontend re-architecture of Erovoutika&apos;s digital platform using modern web technologies and responsive layouts.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Sensor Bus Integration</h3>
                <p className={styles.featureDesc}>
                  Tested multi-sensor communication protocols (I2C, SPI, UART) to streamline classroom wiring for students.
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
                    <h4 className={styles.challengeHeading}>Cross-MCU Compatibility</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Trainer kits needed seamless operation across distinct boards (ESP32, Arduino Uno) with differing 3.3V vs 5V logic voltages.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Engineered standardized breakout shield schematics with bidirectional logic level shifting and unified C++ wrapper functions.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeGrid}>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeChallenge}>Challenge</span>
                    <h4 className={styles.challengeHeading}>Telemetry Visualization</h4>
                    <p className={styles.solutionContent} style={{ marginTop: '0.4rem' }}>
                      Novice students struggled to debug sensor feedback when raw serial monitors printed unformatted numerical values.
                    </p>
                  </div>
                  <div className={styles.challengeHalf}>
                    <span className={styles.badgeSolution}>Solution</span>
                    <p className={styles.solutionContent}>
                      Implemented serialized JSON logging templates paired with lightweight browser plotter interfaces for instant visual feedback.
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
                  <span className={styles.metricLabel}>STEM Modules</span>
                  <span className={styles.metricValue}>10+ Kits</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Students Impacted</span>
                  <span className={styles.metricValue}>500+ Trainees</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Immersion Period</span>
                  <span className={styles.metricValue}>1 Semester</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Kit QA Pass</span>
                  <span className={styles.metricValue}>99.8%</span>
                </div>
              </div>
            </div>

            {/* Categorized Tech Stack */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Tech Stack</h3>
              <div className={styles.techGroupList}>
                
                <div>
                  <span className={styles.techGroupLabel}>Hardware & Robotics</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Arduino Uno</span>
                    <span className={styles.techBadge}>ESP32</span>
                    <span className={styles.techBadge}>Motor Drivers</span>
                    <span className={styles.techBadge}>Sensors</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Firmware</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>C / C++</span>
                    <span className={styles.techBadge}>MicroPython</span>
                    <span className={styles.techBadge}>Arduino IDE</span>
                  </div>
                </div>

                <div>
                  <span className={styles.techGroupLabel}>Web & Cloud</span>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Next.js</span>
                    <span className={styles.techBadge}>React</span>
                    <span className={styles.techBadge}>Tailwind CSS</span>
                    <span className={styles.techBadge}>Vercel</span>
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
        <Link href="/projects/it-seminar" className={styles.nextProjectTitle}>
          HR System <ArrowRight size={26} />
        </Link>
      </div>

    </motion.main>
  )
}
