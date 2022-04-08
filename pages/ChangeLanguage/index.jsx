import React from 'react';
import Head from 'next/head';

import styles from './styles.module.css';
import Layout from 'components/Layout';
import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';
import { useI18N } from 'context/i18n';

export default function ChangeLanguage() {
  const { t } = useI18N();

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('SEO_MAIN_MENU')}</title>
        <meta name='description' content='Hangman game - multi language' />
        <link rel='icon' href='/logo.ico' />
        <link rel='preload' href='/static/font/Roboto-Bold.ttf' as='font' crossOrigin='' />
        <link rel='preload' href='/static/font/Roboto-Regular.ttf' as='font' crossOrigin='' />
      </Head>

      <Layout footer={true} titleHeader={t('CHANGE_LANGUAGE')}>
        <section className={styles.mainManuContainer}>
          <p className={styles.title}>{t('SELECT_LANGUAGE')}</p>

          <LayoutButton>
            <LinkToPage contain={t('SPANISH')} locale='es' />
            <LinkToPage contain={t('ENGLISH')} locale='en' />
          </LayoutButton>
        </section>
      </Layout>
    </div>
  );
}
