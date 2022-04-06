import Layout from 'components/Layout';
import React, { useState, useContext } from 'react';
import Head from 'next/head';
import ButtonContext from 'context/buttonContext';

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

export default function Game({ word = [] }) {
  const [deactivateButton, setDeactivateButton] = useState(false);
  // const [wordState, setWordState] = useState(word.map((w) => ' '));
  const { wordState, setWordState } = useContext(ButtonContext);
  setWordState(word);

  const handleClick = (e) => {
    const wordString = wordState;
    const { value } = e.target;
    let found = false;

    word.forEach((letter, index) => {
      if (letter === value) {
        found = true;
        wordString[index] = value;
      }
      if (letter.normalize('NFD').replace(/\p{Diacritic}/gu, '') === value) {
        wordString[index] = letter;
        found = true;
      }
    });

    if (found) {
      setWordState([...wordString]);
    }
    setDeactivateButton(true);
    console.log(e);
  };

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
          {wordState.map((w, i) => {
            return (
              <div className={styles.line} key={i}>
                <p className={styles.wordLetter}>{w}</p>
              </div>
            );
          })}
        </section>

        <div className={styles.containerLetters}>
          {ALPHABET.map((letter, index) => {
            return (
              <button
                key={index}
                className={`${styles.letterContainer} ${deactivateButton && styles.desButton}`}
                onClick={handleClick}
                value={letter}>
                {letter}
              </button>
            );
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
