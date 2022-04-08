import Layout from 'components/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        {/* <title>Hangame - Menu</title> */}
        <meta name='description' content='The best Hangman game' />
        <link rel='icon' href='/logo.ico' />
        <link rel='preload' href='/static/font/Roboto-Bold.ttf' as='font' crossOrigin='' />
        <link rel='preload' href='/static/font/Roboto-Regular.ttf' as='font' crossOrigin='' />
      </Head>

      <Layout isMainMenu={true} footer={true}>
        <section className={styles.mainManuContainer}>
          <h1 className={styles.title}>Hangame</h1>
          <p className={styles.instructions}>Seleccione un modo de juego</p>

          <LayoutButton>
            <LinkToPage contain='Un solo jugador' href='/OnePlayer' />
            <LinkToPage contain='Dos jugadores' href='/TwoPlayers' />
          </LayoutButton>
        </section>
      </Layout>
    </div>
  );
}
