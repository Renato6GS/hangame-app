import Layout from 'components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';
import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isMainMenu={true} footer={true}>
        <section className={styles.mainManuContainer}>
          <h1 className={styles.title}>Hangame</h1>
          <p>Seleccione un modo de juego</p>

          <LayoutButton>
            <LinkToPage contain='Un solo jugador' href='/OnePlayer' />
            <LinkToPage contain='Dos jugadores' href='/TwoPlayers' />
          </LayoutButton>

          {/* <div className={styles.linksContainer}>
            <Link href='/onePlayer' passHref>
              <div className={styles.anchorContainer}>
                <a className={styles.link}>Un solo jugador</a>
                <ArrowNarrowRight />
              </div>
            </Link>
            <Link href='/TwoPlayers' passHref>
              <div className={styles.anchorContainer}>
                <a className={styles.link}>Dos jugadores</a>
                <ArrowNarrowRight />
              </div>
            </Link>
          </div> */}
        </section>
      </Layout>
    </div>
  );
}
