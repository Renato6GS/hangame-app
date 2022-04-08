import React from 'react';
import Layout from 'components/Layout';
import LinkToPage from 'components/LinkToPage';
import LayoutButton from 'components/LayoutButton';

import styles from './styles.module.css';

export default function TwoPlayers() {
  return (
    <Layout titleHeader='Dos jugadores' href='/'>
      <h2 className={styles.title}>Seleccione un tipo de juego</h2>

      <LayoutButton>
        <LinkToPage contain='Local' href='/TwoPlayers/Offline'></LinkToPage>
        <LinkToPage contain='En línea' href='/TwoPlayers/Online'></LinkToPage>
      </LayoutButton>
    </Layout>
  );
}
