'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import styles from './BlobCursor.module.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#3AAFA9',
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
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const visibleRef = useRef(false);
  const [pointerVisible, setPointerVisibleState] = useState(false);
  const [snapTarget, setSnapTarget] = useState(null);
  const animationRef = useRef();

  // The section scrolls around under the pointer, so the container rect is
  // cached and refreshed on scroll/resize instead of measured per pointer
  // event.
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }, []);

  const moveBlobsTo = useCallback(
    (x, y, follow) => {
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        if (follow) {
          gsap.to(el, {
            x,
            y,
            duration: isLead ? fastDuration : slowDuration,
            ease: isLead ? fastEase : slowEase
          });
        } else {
          // Jump straight under the pointer so the blob never slides in from a
          // stale resting position when it becomes visible again.
          gsap.set(el, { x, y });
        }
      });
    },
    [fastDuration, slowDuration, fastEase, slowEase]
  );

  // The blob belongs to this section only: it fades in when the pointer enters
  // and out when it leaves, instead of hard-clipping at the section edge. The
  // fade itself is a CSS transition, so it can never get stuck mid-tween.
  const setPointerVisible = useCallback((visible) => {
    if (visibleRef.current === visible) return;
    visibleRef.current = visible;
    setPointerVisibleState(visible);
  }, []);

  const handleMove = useCallback(
    e => {
      const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX == null || clientY == null) return;

      const { left, top, width, height } = rectRef.current;
      const inside = clientX >= left && clientX <= left + width && clientY >= top && clientY <= top + height;
      const wasVisible = visibleRef.current;

      mouseRef.current = { x: clientX - left, y: clientY - top, inside };

      if (!inside) {
        setPointerVisible(false);
        // Leaving the section also drops any logo snap, otherwise the blob
        // keeps chasing a marquee item the pointer is no longer over.
        if (snapTarget) setSnapTarget(null);
        return;
      }

      setPointerVisible(true);
      if (!wasVisible) {
        // Re-entering: put the blob under the pointer right away instead of
        // letting it slide in from wherever it was left.
        moveBlobsTo(mouseRef.current.x, mouseRef.current.y, false);
      }
      if (snapTarget) return; // the snap loop owns the transform while snapped

      moveBlobsTo(mouseRef.current.x, mouseRef.current.y, true);
    },
    [setPointerVisible, moveBlobsTo, snapTarget]
  );

  // Pointer leaves the browser window (or the tab loses focus) while still
  // inside the section bounds: no further mousemove will ever arrive, so hide
  // the blob instead of leaving it parked at the edge.
  const hideAll = useCallback(() => {
    mouseRef.current.inside = false;
    setSnapTarget(null);
    setPointerVisible(false);
  }, [setPointerVisible]);

  useEffect(() => {
    measure();
    // Coalesce scroll-driven re-measures into one per frame: measure() reads
    // getBoundingClientRect, and doing that on every raw scroll event adds a
    // forced layout pass per frame, which makes scrolling feel ruggish.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseleave', hideAll);
    window.addEventListener('blur', hideAll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseleave', hideAll);
      window.removeEventListener('blur', hideAll);
    };
  }, [handleMove, hideAll]);

  useEffect(() => {
    const handleSnap = (e) => {
      const target = e.detail?.target;
      if (!target) return;
      setSnapTarget(target);
    };
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
        // The snapped logo can be unmounted or slide out from under the pointer
        // without the browser ever firing a leave event; stop chasing it.
        if (!snapTarget.isConnected) {
          setSnapTarget(null);
          return;
        }
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

      <div
        className={`${styles.blobMain} ${pointerVisible ? '' : styles.blobHidden}`}
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
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
