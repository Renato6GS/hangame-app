import React from 'react';

import styles from './styles.module.css';
import { useI18N } from 'context/i18n';

export default function Footer() {
  const { t } = useI18N();
  return (
    <footer className={styles.footer}>
      <h4 className={styles.description}>
        {t('AUTHOR')}
        <a className={styles.link} href='https://github.com/renato6gs'>
          @Renato6GS
        </a>
      </h4>
    </footer>
  );
}
