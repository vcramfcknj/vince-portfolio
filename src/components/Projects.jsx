'use client'

import { useState } from 'react'
import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Projects.module.css'

const projects = [
  {
    id: 'proj1',
    title: 'C.H.E.C.K',
    category: 'IoT + Full-Stack Capstone',
    tagline: 'Community Health Evaluation Center Kiosk — IoT-powered vital sign monitoring for local communities.',
    description:
      'A capstone project developed for Barangay Darapidap, Candon City, Ilocos Sur. C.H.E.C.K automates the monitoring of vital signs including temperature, heart rate, oxygen level, height, and weight using integrated IoT sensors. The system features biometric scanning for user authentication and a real-time web dashboard for authorized health personnel. Evaluated using ISO 9126-2 standards, achieving a grand mean of 6.72 — "Strongly Agree" on user acceptability.',
    metrics: [
      { value: '6.72', label: 'ISO 9126-2 Rating' },
      { value: '5', label: 'Vital Signs Monitored' },
      { value: '5', label: 'Team Members' },
    ],
    stack: {
      Hardware: ['IoT Sensors', 'Biometric Scanner', 'Raspberry Pi'],
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Backend: ['PHP', 'MySQL'],
      Methodology: ['Agile Scrum'],
    },
    role: 'Lead Developer',
    timeline: 'November 2025',
    problem:
      'Barangay Darapidap relied on manual methods for checking vital signs — a process that was time-consuming and prone to human error, causing delayed access to medical records and hindering timely intervention.',
    features: [
      { title: 'IoT Sensor Integration', desc: 'Automated measurement of temperature, heart rate, SpO2, height, and weight in one device.' },
      { title: 'Biometric Authentication', desc: 'Fingerprint-based user identification for secure and accurate health record management.' },
      { title: 'Real-Time Dashboard', desc: 'Web-based dashboard for authorized health personnel to monitor and manage community health data.' },
    ],
  },
  {
    id: 'proj2',
    title: 'HR Management System',
    category: 'AI-Powered Web App',
    tagline: 'AI-integrated HR platform built in 3 days at the ISPSC IT Seminar on AI & Application Development.',
    description:
      'Built during the 3-day IT Seminar on Artificial Intelligence and Application Development (Jan 6–8, 2026) at ISPSC-Candon Campus, facilitated by Emil Capino, CEO of iAlchemy Inc. The system is a full-featured web-based HR platform covering employee management, structured onboarding, document handling, analytics, and an AI-powered assessment module — all developed within a compressed, sprint-style timeline using PRD and PRP-driven workflows.',
    metrics: [
      { value: '3', label: 'Days to Build' },
      { value: '7', label: 'System Modules' },
      { value: 'Groq AI', label: 'AI Engine' },
    ],
    stack: {
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Backend: ['PHP', 'MySQL'],
      AI: ['Groq AI', 'Llama 3.1'],
      Workflow: ['PRD-Driven', 'PRP-Driven'],
    },
    role: 'Developer',
    timeline: 'January 6–8, 2026',
    problem:
      'HR teams rely on disconnected, manual processes for onboarding, record keeping, and performance tracking — leading to missed tasks, data inconsistencies, and a lack of accountability across the employee lifecycle.',
    features: [
      { title: 'AI Assess Module', desc: 'Powered by Groq AI (Llama 3.1) — evaluates onboarding progress, predicts hire success, and surfaces actionable HR insights per employee.' },
      { title: 'Automated Onboarding', desc: 'Three-phase onboarding checklist (Pre-Day One, Day One, First Week) auto-assigned to every new hire with live progress tracking.' },
      { title: 'Audit Logs', desc: 'Complete activity trail logging user, action type, affected table, record ID, and IP address for full system transparency and accountability.' },
    ],
  },
  {
    id: 'proj3',
    title: 'SpectaQR',
    category: 'Web App / Internal Tool',
    tagline: 'QR-based attendance tracking and fine management system for SSC events.',
    description:
      'SpectaQR is an automated attendance and fine management system built for Supreme Student Council events. The system uses QR code scanning across 4 attendance phases per event, automatically calculates fines for missed scans, and provides a complete student-facing dashboard for viewing fines and payment history. Admins can search, filter, and manage students, events, and payments through a dedicated panel with full audit trail logging.',
    metrics: [
      { value: '4', label: 'Scan Phases per Event' },
      { value: 'Auto', label: 'Fine Calculation' },
      { value: '100%', label: 'Audit Logged' },
    ],
    stack: {
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Backend: ['PHP', 'MySQL'],
      Features: ['QR Scanning', 'Audit Trail', 'Admin Panel'],
    },
    role: 'Developer (SORS KOWD Team)',
    timeline: '2025',
    problem:
      'SSC events relied on manual attendance tracking, making it difficult to accurately record absences, calculate fines consistently, and maintain transparent payment records for students and administrators.',
    features: [
      { title: 'QR Attendance Scanning', desc: 'Each event has 4 scan phases — missed scans automatically generate fines per configured rate.' },
      { title: 'Student Dashboard', desc: 'Students can view their attendance status, outstanding fines, and complete payment history.' },
      { title: 'Admin Fine Confirmation', desc: 'Admins scan a QR and input payment amounts — system deducts fines immediately with full audit trail.' },
    ],
  },
  {
    id: 'proj4',
    title: 'Erovoutika Website Revamp',
    category: 'Full-Stack Web App',
    tagline: 'Complete redesign and rebuild of the Erovoutika Ph company website.',
    description:
      'During my OJT internship at Erovoutika Ph, Inc., I was embedded in the development team responsible for a full website overhaul — internally designated as the EIRA/ROBOLUTION project. Responsibilities spanned wireframing, frontend implementation using Next.js and React, mobile responsiveness, backend system development, UI/UX design, and IoT integration testing. The landing page was delivered as Sprint 1, serving as the visual and structural template for the entire platform.',
    metrics: [
      { value: '220', label: 'Hours Logged' },
      { value: '6', label: 'Weeks Completed' },
      { value: 'Sprint 1', label: 'Landing Page Delivered' },
    ],
    stack: {
      Frontend: ['Next.js', 'React', 'CSS Modules'],
      Tools: ['GitHub', 'Vercel', 'Figma'],
      Other: ['IoT Testing', 'UI/UX Design'],
    },
    role: 'Junior Developer Intern',
    timeline: 'Jan – Mar 2026',
    problem:
      'Erovoutika needed a modern, fully redesigned web presence to better represent their robotics education programs, e-commerce platform, and IoT solutions to a broader audience.',
    features: [
      { title: 'Full Website Redesign', desc: 'End-to-end overhaul from wireframe mockups to final deployment-ready implementation.' },
      { title: 'Mobile Responsiveness', desc: 'Full responsive design implemented across all standard breakpoints and device sizes.' },
      { title: 'IoT Integration Testing', desc: 'Assisted in testing Smart Farming IoT systems — soil moisture sensors, relay modules, and water pump automation.' },
    ],
  },
  {
    id: 'proj5',
    title: 'Portfolio Website',
    category: 'Frontend / UI',
    tagline: 'An editorial, cinematic developer portfolio built from scratch.',
    description:
      'This portfolio — built with Next.js, CSS Modules, and vanilla JavaScript. Features scroll-triggered animations, an accordion project panel, dark/light theme toggle, and a fully responsive layout inspired by editorial design principles. No UI libraries used — all components built from scratch.',
    metrics: [
      { value: '7', label: 'Sections Built' },
      { value: '0', label: 'UI Libraries Used' },
      { value: '2026', label: 'Year Built' },
    ],
    stack: {
      Framework: ['Next.js 16', 'React'],
      Styling: ['CSS Modules', 'Google Fonts'],
      Deploy: ['GitHub Pages'],
    },
    role: 'Designer & Developer',
    timeline: 'Jun 2026',
    problem:
      'Most portfolio templates feel generic. I wanted something cinematic and editorial that reflected my personal brand — built entirely from scratch without heavy dependencies.',
    features: [
      { title: 'Scroll Animations', desc: 'IntersectionObserver-based word-by-word and slide-in reveal animations throughout.' },
      { title: 'Dark / Light Mode', desc: 'Full theme toggle with localStorage persistence and smooth CSS variable transitions.' },
      { title: 'Accordion Projects', desc: 'Expandable case study panels with smooth height transitions and detailed project breakdowns.' },
    ],
  },
]

function ProjectPanel({ proj, index }) {
  const [open, setOpen] = useState(false)
  const [rowRef, rowVisible] = useScrollReveal({ threshold: 0.08 })

  return (
    <div
      ref={rowRef}
      className={`${styles.projectWrap} ${rowVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        className={`${styles.projectRow} ${open ? styles.projectRowOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`panel-${proj.id}`}
      >
        <h2 className={styles.projectTitle}>{proj.title}</h2>
        <div className={styles.projectRight}>
          <p className={styles.projectCategory}>{proj.category}</p>
          <span className={`${styles.indicator} ${open ? styles.indicatorOpen : ''}`}>+</span>
        </div>
      </button>

      <div
        id={`panel-${proj.id}`}
        role="region"
        aria-hidden={!open}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
      >
        <div className={styles.panelInner}>
          <div className={styles.csHeader}>
            <div>
              <h3 className={styles.csTitle}>{proj.title}</h3>
              <p className={styles.csTagline}>{proj.tagline}</p>
            </div>
          </div>

          <div className={styles.metrics}>
            {proj.metrics.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.grid}>
            <div className={styles.gridLeft}>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Overview</h4>
                <p className={styles.blockText}>{proj.description}</p>
              </div>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>The Problem</h4>
                <p className={styles.blockText}>{proj.problem}</p>
              </div>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Key Features</h4>
                <div className={styles.features}>
                  {proj.features.map((f) => (
                    <div key={f.title} className={styles.featureCard}>
                      <h5 className={styles.featureTitle}>{f.title}</h5>
                      <p className={styles.featureDesc}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.gridRight}>
              <div className={styles.sideBox}>
                <h4 className={styles.blockTitle}>Project Details</h4>
                <div className={styles.detailRow}><span>Role:</span><strong>{proj.role}</strong></div>
                <div className={styles.detailRow}><span>Timeline:</span><strong>{proj.timeline}</strong></div>
              </div>
              <div className={styles.sideBox}>
                <h4 className={styles.blockTitle}>Tech Stack</h4>
                {Object.entries(proj.stack).map(([cat, tags]) => (
                  <div key={cat} className={styles.stackRow}>
                    <span className={styles.stackCat}>{cat}</span>
                    <div className={styles.stackTags}>
                      {tags.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />
    </div>
  )
}

export default function Projects() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>

        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <p className="section-subtitle">What I have built</p>
          <h2 className="section-title">Featured<br />Projects</h2>
        </div>

        <div className={styles.list}>
          <div className={styles.divider} />
          {projects.map((proj, i) => (
            <ProjectPanel key={proj.id} proj={proj} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}