'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { LayoutGrid, AlignJustify } from 'lucide-react'
import styles from './Projects.module.css'
import MagneticButton from '@/components/ui/MagneticButton'

const projects = [
  {
    id: 'check',
    title: 'C.H.E.C.K',
    category: 'IoT Health Tech',
    role: 'Lead Developer',
    year: '2024',
    color: '#8C8C8C',
    href: '/projects/check',
    image: '/projects/check/check landing.png',
  },
  {
    id: 'spectaqr',
    title: 'SpectaQR',
    category: 'Event Management',
    role: 'Developer',
    year: '2023',
    color: '#EFE8D3',
    href: '/projects/spectaqr',
    image: '/projects/spectaqr/SpectaQR.jpg',
  },
  {
    id: 'erovoutika',
    title: 'Erovoutika Ph',
    category: 'OJT Immersion',
    role: 'Intern',
    year: '2023',
    color: '#343A40',
    href: '/projects/erovoutika',
    image: '/projects/erovoutika/Screenshot 2026-06-11 161220.png',
  },
  {
    id: 'it-seminar',
    title: 'HR System',
    category: 'Web Development',
    role: 'Developer',
    year: '2024',
    color: '#EFE8D3',
    href: '/projects/it-seminar',
    image: '/projects/it-seminar/Hr-System.png',
  }
]

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function ProjectsPage() {
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('all') // 'all', 'design', 'development'
  const [modal, setModal] = useState({ active: false, index: 0 })
  const { active, index } = modal

  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  useEffect(() => {
    if (view !== 'list') return;
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;
    
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
    let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
    let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
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
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [view])

  const allCount = projects.length;
  const designCount = projects.filter(p => p.id === 'erovoutika').length;
  const devCount = projects.filter(p => p.id !== 'erovoutika').length;

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'design') return p.id === 'erovoutika';
    if (filter === 'development') return p.id !== 'erovoutika';
    return true;
  });

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Creating next level <br /> digital products
        </h1>
        
        <div className={styles.controlsRow}>
          <div className={styles.filters}>
            <MagneticButton 
              text={<>All <sup className={styles.supBadge}>{allCount}</sup></>}
              icon={null}
              onClick={() => setFilter('all')}
              color={filter === 'all' ? 'var(--bg)' : 'var(--text)'}
              bgColor={filter === 'all' ? 'var(--text)' : 'transparent'}
              fillColor="var(--text)"
              textColorHover="var(--bg)"
              borderColor="var(--border-mid)"
              className={styles.filterBtn}
            />
            <MagneticButton 
              text={<>Design <sup className={styles.supBadge}>{designCount}</sup></>}
              icon={null}
              onClick={() => setFilter('design')}
              color={filter === 'design' ? 'var(--bg)' : 'var(--text)'}
              bgColor={filter === 'design' ? 'var(--text)' : 'transparent'}
              fillColor="var(--text)"
              textColorHover="var(--bg)"
              borderColor="var(--border-mid)"
              className={styles.filterBtn}
            />
            <MagneticButton 
              text={<>Development <sup className={styles.supBadge}>{devCount}</sup></>}
              icon={null}
              onClick={() => setFilter('development')}
              color={filter === 'development' ? 'var(--bg)' : 'var(--text)'}
              bgColor={filter === 'development' ? 'var(--text)' : 'transparent'}
              fillColor="var(--text)"
              textColorHover="var(--bg)"
              borderColor="var(--border-mid)"
              className={styles.filterBtn}
            />
          </div>

          <div className={styles.viewControls}>
            <MagneticButton 
              text={<AlignJustify size={20} strokeWidth={1.5} />} 
              icon={null}
              onClick={() => setView('list')}
              color={view === 'list' ? 'var(--bg)' : 'var(--text)'}
              bgColor={view === 'list' ? 'var(--text)' : 'transparent'}
              fillColor="var(--text)"
              textColorHover="var(--bg)"
              borderColor="var(--border-mid)"
              className={styles.iconBtn}
            />
            <MagneticButton 
              text={<LayoutGrid size={20} strokeWidth={1.5} />} 
              icon={null}
              onClick={() => setView('grid')}
              color={view === 'grid' ? 'var(--bg)' : 'var(--text)'}
              bgColor={view === 'grid' ? 'var(--text)' : 'transparent'}
              fillColor="var(--text)"
              textColorHover="var(--bg)"
              borderColor="var(--border-mid)"
              className={styles.iconBtn}
            />
          </div>
        </div>
      </header>

      <div className={view === 'grid' ? styles.grid : styles.listView}>
        {view === 'list' && (
          <div className={styles.listHeader}>
            <div className={styles.listCol1}>CLIENT</div>
            <div className={styles.listCol2}>LOCATION</div>
            <div className={styles.listCol3}>SERVICES</div>
            <div className={styles.listCol4}>YEAR</div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {filteredProjects.map((proj, i) => (
            <motion.div
              key={`${proj.id}-${view}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Link 
                href={proj.href} 
                label={proj.title} 
                className={styles.projectLink}
                onMouseEnter={() => setModal({ active: true, index: i })}
                onMouseLeave={() => setModal({ active: false, index: i })}
              >
                <article className={view === 'grid' ? styles.card : styles.listCard}>
                  {view === 'grid' ? (
                    <>
                      <div className={styles.imageWrapper}>
                        {proj.image ? (
                          <Image src={proj.image} alt={proj.title} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.image} />
                        ) : (
                          <span className={styles.imagePlaceholder}>{proj.title.charAt(0)}</span>
                        )}
                      </div>
                      <h2 className={styles.cardTitle}>{proj.title}</h2>
                      <div className={styles.gridDivider}></div>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardCategory}>{proj.category}</span>
                        <span className={styles.cardYear}>{proj.year}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.listCol1}>
                        <h2 className={styles.listTitle}>{proj.title}</h2>
                      </div>
                      <div className={styles.listCol2}>Philippines</div>
                      <div className={styles.listCol3}>{proj.category}</div>
                      <div className={styles.listCol4}>{proj.year}</div>
                    </>
                  )}
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Image Modal for List View */}
      {view === 'list' && (
        <div className={styles.modalWrapper}>
          <motion.div 
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className={styles.modalContainer}
          >
            <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
              {filteredProjects.map((proj, i) => (
                <div key={`modal_${i}`} className={styles.modal} style={{ backgroundColor: proj.color }}>
                  {proj.image && (
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className={styles.modalImage}
                    />
                  )}
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
      )}
    </main>
  )
}
