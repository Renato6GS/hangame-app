import React from 'react';

import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h4 className={styles.description}>
        Desarrollado por{' '}
        <a className={styles.link} href='https://github.com/renato6gs'>
          @Renato6GS
        </a>
      </h4>
    </footer>
  );
}
