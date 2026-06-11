import Link from 'next/link'
import Image from 'next/image'
import styles from '../ProjectDetail.module.css'

export default function CheckProjectPage() {
  return (
    <main className={styles.wrapper}>
      <Link href="/projects" label="Projects" className={styles.backLink}>
        &larr; Back to Projects
      </Link>

      {/* HERO SECTION */}
      <section className={styles.heroGridContainer}>
        <div className={styles.heroLeft}>
          <span className={styles.categoryTag}>IoT Health Tech</span>
          <h1 className={styles.title}>C.H.E.C.K</h1>
          <p className={styles.subtitle}>
            Community Health Evaluation Center Kiosk for automated, non-invasive vital signs monitoring and biometric registration.
          </p>

          <div className={styles.buttonGroup}>
            {/* Links placeholder if user provides repo later */}
          </div>

          <div className={styles.metaGrid}>
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
      </section>

      <div className={styles.divider} />

      {/* CONTENT SECTION */}
      <section className={styles.contentGrid}>
        
        {/* LEFT COLUMN: Main Content */}
        <div className={styles.mainColumn}>
          <h2 className={styles.sectionHeader}>Executive Summary</h2>
          <div className={styles.textBlock}>
            <p>
              <strong>Overview:</strong> C.H.E.C.K is an intelligent IoT kiosk deployed in Barangay Darapidap to streamline resident health data management, vital signs monitoring, and biometric identification through fingerprint enrollment.
            </p>
            <p>
              <strong>The Problem:</strong> Traditional manual methods for checking vital signs are time-consuming, prone to transcription errors, and result in delayed medical interventions. There was a critical need for an automated, localized, and hygienic health tracking system.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
            <div className={styles.imageBox} style={{ height: '250px', position: 'relative' }}>
              <Image src="/projects/check/Kiosk.png" alt="Kiosk" fill sizes="(max-width: 640px) 100vw, 50vw" style={{objectFit: "cover", borderRadius: "1rem"}} />
            </div>
            <div className={styles.imageBox} style={{ height: '250px', position: 'relative' }}>
              <Image src="/projects/check/monitoring.png" alt="Monitoring Interface" fill sizes="(max-width: 640px) 100vw, 50vw" style={{objectFit: "cover", borderRadius: "1rem"}} />
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
        </div>

        {/* RIGHT COLUMN: Sidebar (Metrics & Tech Stack) */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3>Project Metrics</h3>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Acceptability Rating</span>
              <span className={styles.metricValue}>6.72 / 7.00</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Efficiency Rating</span>
              <span className={styles.metricValue}>6.88 / 7.00</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Sensors Integrated</span>
              <span className={styles.metricValue}>5+</span>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Tech Stack</h3>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Hardware</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>ESP32</span>
                <span className={styles.techPill}>AS608 Fingerprint</span>
                <span className={styles.techPill}>MLX90614 (Temp)</span>
                <span className={styles.techPill}>MAX30102 (Pulse/O2)</span>
              </div>
            </div>

            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Software</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>C++ (Arduino IDE)</span>
                <span className={styles.techPill}>PHP</span>
                <span className={styles.techPill}>MySQL</span>
              </div>
            </div>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Methodology</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>Agile Scrum</span>
                <span className={styles.techPill}>ISO 9126-2 Eval</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  )
}
