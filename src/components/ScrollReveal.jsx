'use client'

import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './ScrollReveal.module.css'

/**
 * Reusable scroll reveal wrapper.
 * Fades children up as they enter the viewport (and back out when they leave),
 * matching the Projects/Skills reveal style (opacity + translateY, ease-out-expo).
 */
export default function ScrollReveal({
  as: Tag = 'div',
  delay = 0,
  threshold = 0.12,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useScrollReveal({ threshold })

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`.trim()}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
