'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Abstract3D from './Abstract3D';
import dynamic from 'next/dynamic';
import MagneticButton from './MagneticButton';
import styles from './Carousel.module.css';

const LottieAnimation = dynamic(() => import('./LottieAnimation'), { ssr: false });

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`${styles.carouselItem} ${round ? styles.round : ''}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <div className={styles.carouselContent}>
        <div className={`${styles.carouselItemHeader} ${round ? styles.round : ''}`}>
          <span className={styles.carouselIconContainer}>{item.icon}</span>
          {item.duration && <span className={styles.carouselItemDuration}>{item.duration}</span>}
        </div>

        <div className={styles.carouselItemTitle}>{item.title}</div>
        {item.company && <div className={styles.carouselItemCompany}>{item.company}</div>}

        {item.achievements && item.achievements.length > 0 ? (
          <ul className={styles.carouselItemAchievements}>
            {item.achievements.map((ach, i) => (
              <li key={i} className={styles.carouselItemAchievement}>{ach}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.carouselItemDescription}>{item.description}</p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className={styles.carouselTags}>
            {item.tags.map(tag => (
              <span key={tag.name} className={styles.carouselTag}>
                {tag.icon && tag.icon}
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {item.link && (
          <div className={styles.carouselActionWrapper}>
            <MagneticButton
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              text={item.linkText || 'View Project'}
              icon=""
              effect="liquid"
              color="var(--bg)"
              bgColor="var(--text)"
              fillColor="var(--bg)"
              textColorHover="var(--text)"
            />
          </div>
        )}
      </div>

      {item.lottieUrl && (
        <div className={styles.carouselImageContainer}>
          <LottieAnimation url={item.lottieUrl} />
        </div>
      )}
    </motion.div>
  );
}

export default function Carousel({
  items = [],
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCurrentWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const containerPadding = 0; // Removed padding to let item fill 100% of the space
  const itemWidth = Math.max(0, currentWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    // eslint-disable-next-line
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      // eslint-disable-next-line
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = {
    dragConstraints: {
      left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
      right: 0
    }
  };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`${styles.carouselContainer} ${round ? styles.round : ''}`}
      style={{
        width: '100%',
        ...(round && { height: `${currentWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className={styles.carouselTrack}
        drag="x"
        dragDirectionLock
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`${styles.carouselIndicatorsContainer} ${round ? styles.round : ''}`}>
        <div className={styles.carouselIndicators}>
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`${styles.carouselIndicator} ${activeIndex === index ? styles.active : styles.inactive}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{
                scale: activeIndex === index ? 1.2 : 1
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
