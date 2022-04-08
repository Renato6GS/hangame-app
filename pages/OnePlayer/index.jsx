import Layout from 'components/Layout';
import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';
import React from 'react';
import Head from 'next/head';

import styles from './styles.module.css';
import { useI18N } from 'context/i18n';

export default function OnePlayer() {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>{t('SEO_ONE_PLAYER')}</title>
        <meta name='description' content='Hangman game with one player' />
        <link rel='icon' href='/logo.ico' />
      </Head>
      <Layout titleHeader={t('ONE_PLAYER_TITLE')} href='/'>
        <h2 className={styles.title}>{t('ONE_PLAYER_MENU')}</h2>

        <LayoutButton>
          <LinkToPage contain={t('EASY')} href='/Game/easy'></LinkToPage>
          <LinkToPage contain={t('MEDIUM')} href='/Game/medium'></LinkToPage>
          <LinkToPage contain={t('HARD')} href='/Game/hard'></LinkToPage>
        </LayoutButton>
      </Layout>
    </>
  );
}
