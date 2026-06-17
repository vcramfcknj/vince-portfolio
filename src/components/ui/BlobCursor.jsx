'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import styles from './BlobCursor.module.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [snapTarget, setSnapTarget] = useState(null);
  const animationRef = useRef();

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      mouseRef.current = { x: x - left, y: y - top };

      if (snapTarget) return; // Do not animate via mouse move if snapped

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase, snapTarget]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [updateOffset, handleMove]);

  useEffect(() => {
    const handleSnap = (e) => setSnapTarget(e.detail.target);
    const handleRelease = () => setSnapTarget(null);

    window.addEventListener('blob-snap', handleSnap);
    window.addEventListener('blob-release', handleRelease);
    
    return () => {
      window.removeEventListener('blob-snap', handleSnap);
      window.removeEventListener('blob-release', handleRelease);
    };
  }, []);

  useEffect(() => {
    if (snapTarget && containerRef.current) {
      // Animate scale once
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, { scale: 1.6, duration: 0.3, ease: 'power2.out', overwrite: "auto" });
      });

      const animateSnap = () => {
        const rect = snapTarget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Calculate center of the moving target
        const targetX = rect.left - containerRect.left + rect.width / 2;
        const targetY = rect.top - containerRect.top + rect.height / 2;

        blobsRef.current.forEach((el, i) => {
          if (!el) return;
          const currentX = gsap.getProperty(el, "x") || 0;
          const currentY = gsap.getProperty(el, "y") || 0;
          const lerpFactor = i === 0 ? 0.2 : (i === 1 ? 0.15 : 0.1);
          gsap.set(el, {
            x: currentX + (targetX - currentX) * lerpFactor,
            y: currentY + (targetY - currentY) * lerpFactor
          });
        });
        animationRef.current = requestAnimationFrame(animateSnap);
      };
      
      animationRef.current = requestAnimationFrame(animateSnap);
      return () => cancelAnimationFrame(animationRef.current);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      
      // Rubber band back to mouse
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          scale: 1,
          duration: isLead ? fastDuration * 3 : slowDuration * 2,
          ease: 'elastic.out(1, 0.4)',
          overwrite: "auto"
        });
      });
    }
  }, [snapTarget, fastDuration, slowDuration]);

  return (
    <div
      ref={containerRef}
      className={styles.blobContainer}
      style={{ zIndex }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className={styles.blobMain} style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className={styles.blob}
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className={styles.innerDot}
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
