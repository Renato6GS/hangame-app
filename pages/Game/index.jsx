import Layout from 'components/Layout';
import React from 'react';

import styles from './styles.module.css';

export default function Game() {
  return (
    <Layout titleHeader='Unjugador' href='/OnePlayer'>
      <div>
        <h2 className={styles.title}>Adivine la palabra</h2>
      </div>

      <section className={styles.mainGameContainer}>
        <div className={styles.mainGame}>
          <div className={styles.base}></div>
          <div className={styles.column}></div>
          <div className={styles.arm}></div>
          <div className={styles.rope}></div>

          <div className={styles.head}></div>
          <div className={styles.leftArm}></div>
          <div className={styles.rightArm}></div>
          <div className={styles.body}></div>
          <div className={styles.leftLeg}></div>
          <div className={styles.rightLeg}></div>
        </div>
      </section>

      <section className={styles.wordContainer}>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>M</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
        <div className={styles.line}>
          <p className={styles.wordLetter}>C</p>
        </div>
      </section>
    </Layout>
  );
}
