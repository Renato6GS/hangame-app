import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Image from 'next/image';

import styles from './styles.module.css';

export default function Layout({
  children,
  isMainMenu = false,
  titleHeader = '',
  footer = false,
  href = '/',
  largeScreen = false,
}) {
  return (
    <>
      <main className={`${styles.mainContainer} ${largeScreen && styles.largeScreen} `}>
        {titleHeader && <Header title={titleHeader} href={href} />}
        {isMainMenu && (
          <div className={styles.containerLogo}>
            <Image src='/img/logo.png' width={218} height={218} alt='Logo Hangame' priority />
          </div>
        )}
        {children}
        {footer && <Footer />}
      </main>
    </>
  );
}
