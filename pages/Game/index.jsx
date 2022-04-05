import Layout from 'components/Layout';
import React from 'react';
import Head from 'next/head';

import styles from './styles.module.css';

const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'Ñ',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export default function Game() {
  return (
    <>
      <Head>
        <title>Hangame - Game</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/static/font/Roboto-Bold.ttf' as='font' crossOrigin='' />
        <link rel='preload' href='/static/font/Roboto-Regular.ttf' as='font' crossOrigin='' />
      </Head>

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
        </section>

        <div className={styles.containerLetters}>
          {ALPHABET.map((letter, index) => {
            return (
              <button key={index} className={styles.letterContainer}>
                <p className={styles.letter}>{letter}</p>
              </button>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
