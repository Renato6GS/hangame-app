import React from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import ArrowLeft from 'components/icons/ArrowLeft';

export default function Header({ title, href }) {
  return (
    <header className={styles.header}>
      <Link href={href} passHref>
        <ArrowLeft stroke='#fff' className={styles.arrow} />
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
