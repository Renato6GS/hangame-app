import Layout from 'components/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';
import { useI18N } from 'context/i18n';

export default function Home() {
  const { t } = useI18N();
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('SEO_MAIN_MENU')}</title>
        <meta name='description' content='The best Hangman game' />
        <link rel='icon' href='/logo.ico' />
        <link rel='preload' href='/font/Roboto-Bold.ttf' as='font' crossOrigin='' />
        <link rel='preload' href='/font/Roboto-Regular.ttf' as='font' crossOrigin='' />
      </Head>

      <Layout isMainMenu={true} footer={true}>
        <section className={styles.mainManuContainer}>
          <h1 className={styles.title}>Hangame</h1>
          <p className={styles.instructions}>{t('TITLE_MAIN_MENU')}</p>

          <LayoutButton>
            <LinkToPage contain={t('ONE_PLAYER_MAIN_MENU')} href='/OnePlayer' />
            <LinkToPage contain={t('TWO_PLAYER_MAIN_MENU')} href='/TwoPlayers' />
            <LinkToPage contain={t('CHANGE_LANGUAGE')} href='/ChangeLanguage' />
          </LayoutButton>
        </section>
      </Layout>
    </div>
  );
}
