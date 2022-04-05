import React from 'react';

import styles from './styles.module.css';
import ArrowLeft from 'components/icons/ArrowLeft';

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <ArrowLeft stroke='#fff' className={styles.arrow} />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
