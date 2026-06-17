import styles from './CssGlobe.module.css';

export default function CssGlobe({ className, style }) {
  return (
    <div className={`${styles.globe} ${className}`} style={style}>
      <div className={styles.globeWrap}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circleHor}></div>
        <div className={styles.circleHorMiddle}></div>
      </div>
    </div>
  );
}
