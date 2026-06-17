'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Link from 'next/link'
import styles from './Projects.module.css'
import useScrollReveal from '@/hooks/useScrollReveal'
import MagneticButton from './ui/MagneticButton'

const projects = [
  {
    id: 'proj1',
    title: 'C.H.E.C.K',
    category: 'IoT / Full-Stack',
    src: '/projects/check/check%20landing.png',
    color: '#8C8C8C',
    role: 'Lead Developer',
    link: '/projects/check'
  },
  {
    id: 'proj2',
    title: 'HR System',
    category: 'AI / Web App',
    src: '/projects/it-seminar/Hr-System.png',
    color: '#EFE8D3',
    role: 'Developer',
    link: '/projects/it-seminar'
  },
  {
    id: 'proj4',
    title: 'Erovoutika',
    category: 'Full-Stack',
    src: '/projects/erovoutika/Screenshot%202026-06-11%20161220.png',
    color: '#343A40',
    role: 'Intern',
    link: '/projects/erovoutika'
  }
]

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 })
  const { active, index } = modal
  
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })
  const [listRef, listVisible] = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    // Only run on client
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;
    
    // Move container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
    
    // Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
    let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
    
    // Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      xMoveContainer(clientX)
      yMoveContainer(clientY)
      xMoveCursor(clientX)
      yMoveCursor(clientY)
      xMoveCursorLabel(clientX)
      yMoveCursorLabel(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>

        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <h2 className="section-subtitle" style={{ fontSize: '1.2rem', marginBottom: 0 }}>What I have built</h2>
        </div>

        <div 
          ref={listRef} 
          className={`${styles.list} ${listVisible ? styles.listVisible : ''}`}
        >
          {projects.map((proj, i) => (
            <Link 
              href={proj.link}
              key={proj.id} 
              onMouseEnter={() => setModal({ active: true, index: i })}
              onMouseLeave={() => setModal({ active: false, index: i })}
              className={styles.project}
              style={{ textDecoration: 'none' }}
            >
              <h2 className={styles.projectTitle}>{proj.title}</h2>
              <div className={styles.projectDetails}>
                <span className={styles.projectRole}>{proj.role}</span>
                <span className={styles.projectCategory}>{proj.category}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.btnWrap}>
          <MagneticButton
            href="/projects"
            text="More Works"
            icon=""
            effect="liquid"
            color="var(--bg)"
            fillColor="var(--bg)"
            textColorHover="var(--text)"
            borderColor="transparent"
            bgColor="var(--text)"
            className={styles.ovalBtn}
          />
        </div>

      </div>

      <div className={styles.modalWrapper}>
        <motion.div 
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
            {projects.map((proj, i) => (
              <div key={`modal_${i}`} className={styles.modal} style={{ backgroundColor: proj.color }}>
                <img 
                  src={proj.src} 
                  alt={proj.title}
                  className={styles.modalImage}
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          ref={cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.cursor}
        />
        
        <motion.div 
          ref={cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.cursorLabel}
        >
          View
        </motion.div>
      </div>
    </section>
  )
}