'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import styles from './ContainerScroll.module.css'

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 0.4, 1], [20, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [scaleDimensions()[0], scaleDimensions()[1], scaleDimensions()[1]])
  const translate = useTransform(scrollYProgress, [0, 0.4, 1], [0, -100, -100])

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <div className={styles.perspectiveWrapper}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className={styles.header}
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  isMobile,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale: isMobile ? 1 : scale,
      }}
      className={styles.card}
    >
      <div className={styles.cardInner}>
        {children}
      </div>
    </motion.div>
  )
}
