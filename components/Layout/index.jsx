import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Image from 'next/image';

import styles from './styles.module.css';

export default function Layout({ children, isMainMenu = false, titleHeader = '', footer = false }) {
  return (
    <>
      <main className={styles.mainContainer}>
        {titleHeader && <Header title={titleHeader} />}
        {isMainMenu && (
          <div className={styles.containerLogo}>
            <Image src='/static/img/logo.png' width={218} height={218} alt='Logo Hangame' />
          </div>
        )}
        {children}
        {footer && <Footer />}
      </main>
    </>
  );
}
