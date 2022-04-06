import Layout from 'components/Layout';
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import ButtonContext from 'context/buttonContext';

import styles from './styles.module.css';
import ButtonLetter from 'components/ButtonLetter';

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

export default function Game({ word = [] }) {
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);

  useEffect(function () {
    setWordState(word.map((w) => ' '));
    setTries(5);
    console.log(word);
  }, []);

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

        {/* PICTURE */}
        <section className={styles.mainGameContainer}>
          <div className={styles.mainGame}>
            <div className={styles.base}></div>
            <div className={styles.column}></div>
            <div className={styles.arm}></div>
            <div className={styles.rope}></div>

            <div className={`${styles.head} ${tries < 5 && styles.lostHead}`}></div>
            <div className={`${styles.leftArm} ${tries < 4 && styles.lostLeftArm}`}></div>
            <div className={`${styles.rightArm} ${tries < 3 && styles.lostRigthArm}`}></div>
            <div className={`${styles.body} ${tries < 2 && styles.lostBody}`}></div>
            <div className={`${styles.leftLeg} ${tries < 1 && styles.lostLeftLeg}`}></div>
            <div className={`${styles.rightLeg} ${tries < 0 && styles.lostRightLeg}`}></div>
          </div>
        </section>

        {/* WORD HIDDNE */}
        <section className={styles.wordContainer}>
          {wordState.map((w, i) => {
            return (
              <div className={styles.line} key={i}>
                <p className={styles.wordLetter}>{w}</p>
              </div>
            );
          })}
        </section>

        {/* KEYBOARD */}
        <div className={styles.containerLetters}>
          {ALPHABET.map((letter, index) => {
            return <ButtonLetter letter={letter} word={word} key={index} />;
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  let wordArray = [];
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_word/${id}_difficulty&es`);
    const { word } = await response.json();
    wordArray.push(...word);
  } catch (error) {
    console.error(error);
  }

  console.log('word', wordArray);
  return {
    props: { word: wordArray },
  };
}

// 1. Game que sea una ruta dinámica, en donde puede recibir la dificultad por url
// /game/facil, /game/medium/, /game/hard, y que con ese param consulta a la api y obtenga una palabra.

// 2. Si es que es para dos jugadores, el game debe incluir una id en la url online
// /game/3828381 y con esa ID se obtenga la palbra dentro de la base de datos

// 3. Si es offline, que la palabra se pase por prop y la url deberá de ser /game/offline
