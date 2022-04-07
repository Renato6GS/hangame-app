import React from 'react';

import styles from './styles.module.css';

export default function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.ldsRoller}>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
      </div>
    </div>
  );
}
