import React from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';

export default function LinkToPage({ contain, href = '/' }) {
  return (
    <Link href={href} passHref>
      <div className={styles.anchorContainer}>
        <a className={styles.link}>{contain}</a>
        <ArrowNarrowRight />
      </div>
    </Link>
  );
}
