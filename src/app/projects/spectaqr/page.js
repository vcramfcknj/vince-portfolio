import Link from 'next/link'
import styles from '../ProjectDetail.module.css'

export default function SpectaQRProjectPage() {
  return (
    <main className={styles.wrapper}>
      <Link href="/projects" label="Projects" className={styles.backLink}>
        &larr; Back to Projects
      </Link>

      {/* HERO SECTION */}
      <section className={styles.heroGridContainer}>
        <div className={styles.heroLeft}>
          <span className={styles.categoryTag}>Event Management</span>
          <h1 className={styles.title}>SpectaQR</h1>
          <p className={styles.subtitle}>
            Automated event attendance tracking, fine calculation, and payment confirmation system.
          </p>

          <div className={styles.buttonGroup}>
            <a href="https://web.facebook.com/photo?fbid=122200903010297650" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>View Details</a>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Timeline</span>
              <span className={styles.metaValue}>Academic Year</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>Full Stack Developer</span>
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
        </div>

        {/* RIGHT COLUMN: Sidebar (Metrics & Tech Stack) */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3>Project Metrics</h3>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Scan Phases</span>
              <span className={styles.metricValue}>Up to 4</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Audit Logs</span>
              <span className={styles.metricValue}>Timestamped</span>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Tech Stack</h3>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Frontend</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>HTML/CSS/JS</span>
                <span className={styles.techPill}>Bootstrap</span>
              </div>
            </div>

            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Backend</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>PHP</span>
                <span className={styles.techPill}>MySQL</span>
              </div>
            </div>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Libraries</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>QR Code Scanner.js</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  )
}
