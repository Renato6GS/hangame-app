import Layout from 'components/Layout';
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import ButtonContext from 'context/buttonContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';

import styles from './styles.module.css';
import ButtonLetter from 'components/ButtonLetter';
import { ALPHABET } from 'constants/alphabet';
import { offlineService, onlineService, localMultiplayerService } from 'services/callsApi';
import { useI18N } from 'context/i18n';

export default function Game({ word = [], title = 'a' }) {
  const router = useRouter();
  const { t } = useI18N();

  console.log(title);

  useEffect(function () {
    if (word.length === 0) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: 'error',
        title: t('SERVER_ERROR_MODAL'),
        text: t('TEXT_ERROR_MODAL'),
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
        <title>{t('SEO_GAME')}</title>
        <link rel='icon' href='/logo.ico' />
        <link rel='preload' href='/static/font/Roboto-Bold.ttf' as='font' crossOrigin='' />
        <link rel='preload' href='/static/font/Roboto-Regular.ttf' as='font' crossOrigin='' />
        <meta name='description' content='Hangman game two players online' />
      </Head>

      <Layout
        // titleHeader={t(title === 'ONE_PLAYER_MAIN_MENU' ? 'TWO_PLAYER_MAIN_MENU' : 'ONE_PLAYER_MAIN_MENU')}
        titleHeader={t(title === 'TWO_PLAYER_MAIN_MENU' ? 'TWO_PLAYER_MAIN_MENU' : 'ONE_PLAYER_MAIN_MENU')}
        largeScreen={true}>
        <div>
          <h2 className={styles.title}>{t('GUESS_WORD')}</h2>
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

export async function getServerSideProps(context) {
  const { params, locale } = context;
  const { id } = params;
  let wordArray = [];
  let title = 'TWO_PLAYER_MAIN_MENU';

  if (id.startsWith('O')) {
    wordArray = offlineService({ id });
  } else if (id.startsWith('N') && typeof window === 'undefined') {
    console.log('window: ', typeof window);
    wordArray = await onlineService({ id });
  } else {
    wordArray = await localMultiplayerService({ id, locale });
    title = 'ONE_PLAYER_MAIN_MENU';
  }

  return {
    props: { word: wordArray, title },
  };
}
