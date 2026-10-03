import { Download, FileText, Globe, Mail, MapPin, Phone } from 'lucide-react'
import PrintButton from './PrintButton'
import cv from './CV.module.css'
import { CONTACT, RESUME, SITE_URL, SOCIALS } from '@/lib/site'

export const metadata = {
  title: 'Résumé — Vince Rubang',
  description:
    'Full-stack and IT résumé of Vince Marc Justine O. Rubang — BS IT Graduate, Web & Mobile Developer of the Year awardee. Printable, PDF-ready format.',
  alternates: { canonical: `${SITE_URL}/cv` },
}

const EXPERIENCE = [
  {
    role: 'Junior Developer Intern',
    org: 'Erovoutika Ph, Inc. — Makati City',
    date: 'Jan – Mar 2026',
    body: 'Lead developer on website redesign and frontend development using Next.js and React. Supported backend development and IoT hardware integration testing for smart farming initiatives, completing 220 hours of internship while collaborating with senior developers.',
  },
  {
    role: 'Web & Mobile Developer of the Year (Awardee)',
    org: 'Ilocos Sur Polytechnic State College',
    date: 'May 2026',
    body: 'Awarded top web and mobile developer for outstanding project delivery and innovative technical solutions, recognized by academic and industry evaluators.',
  },
  {
    role: 'Technical Officer / Member',
    org: 'Information Technology Students’ Organization (ITSO) — ISPSC Candon Campus',
    date: '2022 – 2024',
    body: 'Maintained and inspected computer laboratory units, provided on-site technical support during school events, and handled computer setup, configuration, peripheral installation, and basic hardware troubleshooting over three consecutive years.',
  },
]

const PROJECTS = [
  {
    name: 'Crystal Cold Storage CRM',
    stack: 'Next.js · Tailwind CSS · Role-Based Access Control · Vercel',
    body: 'Co-developed a CRM platform for Crystal Cold Storage, Inc. handling quotation management, complaint tracking, and client satisfaction surveys with role-based access control.',
  },
  {
    name: 'C.H.E.C.K — Community Health Evaluation Center Kiosk',
    stack: 'ESP32 · C++ / FreeRTOS · PHP (OOP) · MySQL · Bootstrap 5',
    body: 'Led end-to-end development of an IoT self-service health kiosk for Barangay Darapidap featuring biometric fingerprint identification, non-contact thermometry, automated BMI calculation, and SpO₂ telemetry; rated 6.88 / 7.00 (ISO 9126-2) by evaluators.',
  },
  {
    name: 'SpectaQR — Event Attendance System',
    stack: 'JavaScript · PHP (OOP) · MySQL · Bootstrap 5 · Html5-QRCode',
    body: 'QR-based event attendance, fine calculation, and payment confirmation system for the Supreme Student Council, cutting entry queue times by 95% and handling 1,000+ students across 4 event checkpoints.',
  },
  {
    name: 'HR System — AI-Powered Human Resource System',
    stack: 'Next.js · React · Tailwind CSS · Node.js · PostgreSQL · Supabase · Claude 3.5 / GPT-4o',
    body: 'Built an intelligent HRMS during a 3-day PRD-driven masterclass at ISPSC featuring smart shift scheduling with conflict detection, document lifecycle management, and AI-generated appraisal summaries synthesized from quarterly performance metrics.',
  },
  {
    name: 'Erovoutika Ph — Robotics & IoT Immersion',
    stack: 'Arduino / ESP32 · C / C++ · MicroPython · Next.js · Tailwind CSS',
    body: 'Lead developer on the frontend re-architecture of Erovoutika’s e-learning platform, and engineered standardized breakout shield schematics with bidirectional logic level shifting for cross-MCU compatibility.',
  },
]

const SKILL_GROUPS = [
  { label: 'Languages', items: 'HTML · CSS · JavaScript · TypeScript · PHP · C / C++' },
  { label: 'Frameworks & Libraries', items: 'React · Next.js · Tailwind CSS · Bootstrap 5 · Node.js' },
  { label: 'Data & Services', items: 'MySQL · PostgreSQL · Supabase · REST' },
  { label: 'Tools & Platforms', items: 'Figma · GitHub · Git · Vercel · Arduino IDE' },
  { label: 'Hardware & IoT', items: 'ESP32 · Arduino · Sensor integration · Circuit schematics' },
  { label: 'IT Support', items: 'Hardware troubleshooting · OS installation & configuration · Technical and user support' },
]

const CERTIFICATIONS = [
  { name: 'Web & Mobile Developer of the Year', meta: 'Ilocos Sur Polytechnic State College · May 2026' },
  { name: 'Foundations of Leadership Excellence (FLEX), Batch 302', meta: 'Innov8.Org Corporation · Aug 15–16, 2026 · SMX Convention Center Aura, Taguig City' },
  { name: 'NetOps Certified Engineer (NTO-101)', meta: 'Appkademiya Cybersecurity Certification · Aug 24, 2026' },
  { name: 'Prompt Like an Engineer', meta: 'DICT-ITU DTC Initiative via Cisco Networking Academy · Sep 1, 2026' },
  { name: 'TESDA — Introduction to Computer Systems Servicing', meta: 'Jul 2026' },
  { name: 'TESDA — Installing and Configuring Computer Systems', meta: 'Jul 2026' },
  { name: 'Entry-Level Robotics Certification', meta: '' },
  { name: 'DICT — Digital Innovation in Government', meta: '' },
  { name: 'DICT — Data Privacy', meta: '' },
  { name: 'DICT — Fundamentals of Marketing', meta: '' },
]

const EDUCATION = [
  {
    degree: 'Bachelor of Science in Information Technology',
    org: 'Ilocos Sur Polytechnic State College — Candon City Campus',
    date: '2020 – 2025',
  },
  {
    degree: 'Senior High School',
    org: 'Candon National High School',
    date: '2017 – 2019',
  },
]

export default function CvPage() {
  return (
    <main className={cv.page}>
      <div className={cv.sheet}>
        <div className={cv.actions}>
          <a className={cv.actionBtn} href={RESUME.pdf} download={RESUME.downloadName}>
            <Download size={14} /> Download PDF
          </a>
          <PrintButton className={cv.actionBtn} />
          <a className={cv.actionBtn} href={RESUME.docx} download="Vince-Rubang-Resume.docx">
            <FileText size={14} /> Word (.docx)
          </a>
          <span className={cv.actionHint}>
            Tip: choose &ldquo;Save as PDF&rdquo; in the print dialog for the exact file layout.
          </span>
        </div>

        <header className={cv.masthead}>
          <h1 className={cv.name}>Vince Marc Justine O. Rubang</h1>
          <p className={cv.role}>Full-Stack Web Developer · BS Information Technology Graduate</p>
          <div className={cv.contactRow}>
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={12} aria-hidden="true" /> {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
              <Phone size={12} aria-hidden="true" /> {CONTACT.phone}
            </a>
            <span>
              <MapPin size={12} aria-hidden="true" /> {CONTACT.location}
            </span>
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              <Globe size={12} aria-hidden="true" /> v1nchnzo.vercel.app
            </a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </header>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Professional Summary</h2>
          <p className={cv.summary}>
            Motivated and detail-oriented IT graduate with a B.S. in Information Technology,
            specializing in Full-Stack Web Development. Recognized as &ldquo;Web and Mobile Developer
            of the Year,&rdquo; with hands-on experience through academic projects, internships, and
            freelance engagements. Proven ability to deliver full-cycle web solutions and eager to
            contribute to team success in a professional development environment.
          </p>
        </section>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Experience</h2>
          {EXPERIENCE.map((entry) => (
            <article className={cv.entry} key={entry.role}>
              <div className={cv.entryHead}>
                <h3 className={cv.entryTitle}>
                  {entry.role}
                  <span className={cv.entryOrg}>{entry.org}</span>
                </h3>
                <span className={cv.entryDate}>{entry.date}</span>
              </div>
              <p className={cv.entryBody}>{entry.body}</p>
            </article>
          ))}
        </section>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Projects</h2>
          {PROJECTS.map((project) => (
            <article className={cv.entry} key={project.name}>
              <div className={cv.entryHead}>
                <h3 className={cv.entryTitle}>{project.name}</h3>
              </div>
              <p className={cv.entryBody}>{project.body}</p>
              <span className={cv.stackLine}>{project.stack}</span>
            </article>
          ))}
        </section>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Skills</h2>
          <div className={cv.skillGrid}>
            {SKILL_GROUPS.map((group) => (
              <div className={cv.skillGroup} key={group.label}>
                <span className={cv.skillLabel}>{group.label}</span>
                <p className={cv.skillList}>{group.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Education</h2>
          {EDUCATION.map((school) => (
            <article className={cv.entry} key={school.degree}>
              <div className={cv.entryHead}>
                <h3 className={cv.entryTitle}>
                  {school.degree}
                  <span className={cv.entryOrg}>{school.org}</span>
                </h3>
                <span className={cv.entryDate}>{school.date}</span>
              </div>
            </article>
          ))}
        </section>

        <section className={cv.section}>
          <h2 className={cv.sectionTitle}>Certifications &amp; Training</h2>
          <ul className={cv.certList}>
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name}>
                <span className={cv.certStrong}>{cert.name}</span>
                {cert.meta ? ` — ${cert.meta}` : ''}
              </li>
            ))}
          </ul>
        </section>

        <p className={cv.footerNote}>
          References and supporting documents — internship narrative report, IT seminar report, and
          the C.H.E.C.K manuscript — available on request.
        </p>
      </div>
    </main>
  )
}
