import React from 'react';
import styles from './Marquee.module.css';

export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 'normal',
  ...props
}) {
  const speedVariants = {
    slow: styles.speedSlow,
    normal: styles.speedNormal,
    fast: styles.speedFast,
  };

  const containerClasses = [
    styles.marqueeContainer,
    vertical ? styles.flexCol : styles.flexRow,
    speedVariants[speed],
    className
  ].filter(Boolean).join(' ');

  const trackClasses = [
    styles.track,
    vertical ? styles.trackVertical : styles.trackHorizontal,
    pauseOnHover ? styles.pauseOnHover : '',
    reverse ? styles.reverse : ''
  ].filter(Boolean).join(' ');

  return (
    <div {...props} className={containerClasses}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={trackClasses} aria-hidden={i !== 0}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { key: `${child.key}-${i}` });
              }
              return child;
            })}
          </div>
        ))}
    </div>
  );
}
