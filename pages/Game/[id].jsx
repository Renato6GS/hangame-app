import Layout from 'components/Layout';
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import ButtonContext from 'context/buttonContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';

import styles from './styles.module.css';
import ButtonLetter from 'components/ButtonLetter';
import { ALPHABET } from 'constants/alphabet';

export default function Game({ word = [], title }) {
  const router = useRouter();

  useEffect(function () {
    if (word.length === 0) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: 'error',
        title: 'Error de servidor...',
        text: 'No se ha podido recuperar la palabra del servidor. Intentelo más tarde...',
      }).then(() => {
        router.push('/');
      });
    }
  }, []);

  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  useEffect(function () {
    setWordState(word.map(() => ' '));
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

      <Layout titleHeader={title} href='/OnePlayer' largeScreen={true}>
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
  const API = process.env.API;
  const LANGUAGE = 'es';
  let title = 'Dos jugadores';

  if (id.startsWith('O')) {
    const word = id.slice(1);
    const decode = decodeURIComponent(word);
    const decryptedData = CryptoJS.AES.decrypt(decode, 'secret').toString(CryptoJS.enc.Utf8);
    const w = decryptedData.toUpperCase();
    wordArray.push(...w);
  } else if (id.startsWith('N')) {
    const getId = id.slice(1);
    try {
      const GET_AND_DELETE = process.env.GET_AND_DELETE;
      const response = await fetch(`${API}${GET_AND_DELETE}${getId}`, {
        method: 'DELETE',
      });
      let { word } = await response.json();
      word = word.toUpperCase();
      wordArray.push(...word);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const GET_WORD = process.env.GET_WORD;
      const response = await fetch(`${API}${GET_WORD}${id}_difficulty&${LANGUAGE}`);
      const { word } = await response.json();
      wordArray.push(...word);
      title = 'Un jugador';
    } catch (error) {
      console.error(error);
    }
  }

  console.log('word', wordArray);
  return {
    props: { word: wordArray, title },
  };
}
