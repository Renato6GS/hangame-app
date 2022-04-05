import Layout from 'components/Layout';
import LayoutButton from 'components/LayoutButton';
import LinkToPage from 'components/LinkToPage';
import React from 'react';

import styles from './styles.module.css';

export default function OnePlayer() {
  return (
    <Layout titleHeader='Un jugador' href='/'>
      <h2 className={styles.title}>Seleccione una dificultad</h2>

      <LayoutButton>
        <LinkToPage contain='Fácil' href='/Game'></LinkToPage>
        <LinkToPage contain='Medio' href='/Game'></LinkToPage>
        <LinkToPage contain='Difícil' href='/Game'></LinkToPage>
      </LayoutButton>
    </Layout>
  );
}
