import React from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';

export default function LinkToPage({ contain, href = '/', center = true }) {
  return (
    <Link href={href} passHref>
      <div className={`${styles.anchorContainer} ${center ? styles.positionCenter : styles.positionRigth}`}>
        <a className={styles.link}>{contain}</a>
        <ArrowNarrowRight />
      </div>
    </Link>
  );
}
