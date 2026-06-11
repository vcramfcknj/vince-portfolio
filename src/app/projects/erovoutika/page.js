import Link from 'next/link'
import styles from '../ProjectDetail.module.css'

export default function ErovoutikaProjectPage() {
  return (
    <main className={styles.wrapper}>
      <Link href="/projects" label="Projects" className={styles.backLink}>
        &larr; Back to Projects
      </Link>

      {/* HERO SECTION */}
      <section className={styles.heroGridContainer}>
        <div className={styles.heroLeft}>
          <span className={styles.categoryTag}>OJT Immersion</span>
          <h1 className={styles.title}>Erovoutika Ph, Inc.</h1>
          <p className={styles.subtitle}>
            Robotics and Automation Integration internship
          </p>

          <div className={styles.buttonGroup}>
            <a href="https://erovoutika-revamp.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>View Platform</a>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Duration</span>
              <span className={styles.metaValue}>1 Semester</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>IT Intern</span>
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
              <strong>Overview:</strong> Erovoutika Ph, Inc. is a leading Philippine-based robotics and technology education company. Operating as an education enabler, the company specializes in developing comprehensive STEM robotics kits and building localized IoT-based learning platforms for schools and universities nationwide.
            </p>
            <p>
              <strong>The Experience:</strong> During my immersion at their Makati City headquarters, I was fully integrated into their technical deployment teams, gaining direct exposure to practical hardware-software ecosystems.
            </p>
          </div>

          <h2 className={styles.sectionHeader}>Key Responsibilities</h2>
          <div className={styles.featuresGrid}>
            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Kit Integration</h3>
              <p className={styles.featureDesc}>Assisted in the testing, assembly, and quality assurance of IoT-based educational STEM kits.</p>
            </article>
            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Module Development</h3>
              <p className={styles.featureDesc}>Contributed to the writing and structuring of digital curriculum materials tailored to local academic requirements.</p>
            </article>
            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Platform Support</h3>
              <p className={styles.featureDesc}>Participated in the maintenance and support of their e-commerce platform and remote learning environments.</p>
            </article>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Metrics & Tech Stack) */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3>Immersion Metrics</h3>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Duration</span>
              <span className={styles.metricValue}>1 Semester</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Location</span>
              <span className={styles.metricValue}>Makati City</span>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Core Exposure</h3>
            
            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Hardware</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>Robotics</span>
                <span className={styles.techPill}>IoT Boards</span>
                <span className={styles.techPill}>Sensors</span>
              </div>
            </div>

            <div className={styles.techGroup}>
              <div className={styles.techLabel}>Skills Developed</div>
              <div className={styles.pillContainer}>
                <span className={styles.techPill}>QA Testing</span>
                <span className={styles.techPill}>Tech Writing</span>
                <span className={styles.techPill}>System Integration</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  )
}
