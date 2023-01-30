import Layout from "components/Layout";
import React, { useContext, useRef, useState } from "react";
import Head from "next/head";
import ButtonContext from "context/buttonContext";

import styles from "./styles.module.css";
import ButtonLetter from "components/ButtonLetter";
import { ALPHABET } from "constants/alphabet";
import { localMultiplayerService } from "services/gameModesApi";
import { useI18N } from "context/i18n";
import Loader from "components/Loader";
import ClueButton from "components/ClueButton";
import { useErrorServer } from "hooks/useErrorServer";
import { useGame } from "hooks/useGame";

export default function Game({ word = [], title = "a", id, numberOfClues = 0 }) {
  useErrorServer({ word });
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const { t } = useI18N();
  const wordRef = useRef(word);
  const [loading, setLoading] = useState(false);
  const [renderAlphabet, setRenderAlphabet] = useState(false);
  useGame({ setLoading, wordRef, setWordState, setRenderAlphabet, setTries, id });

  return (
    <>
      <Head>
        <title>{t("SEO_GAME")}</title>
        <link rel="icon" href="/logo.ico" />
        <meta name="description" content="Hangman game two players online" />
      </Head>
      {loading && <Loader />}
      <Layout
        titleHeader={t(title === "TWO_PLAYER_MAIN_MENU" ? "TWO_PLAYER_MAIN_MENU" : "ONE_PLAYER_MAIN_MENU")}
        largeScreen={true}>
        <div>
          <h2 className={styles.title}>{t("GUESS_WORD")}</h2>
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

        {/* HIDDEN WORD */}
        <small>
          {t("NUMBER_OF_SYLLABLES")}
          <strong> {word.length}</strong>
        </small>
        <section className={styles.wordContainer}>
          {wordState.map((w, i) => {
            return (
              <div className={styles.line} key={i}>
                <p className={styles.wordLetter}>{w}</p>
              </div>
            );
          })}
        </section>

        {/* UTILS */}
        <div className={styles.containerUtils}>
          <span className={styles.titleTries}>Intentos: {tries + 1}</span>
          <ClueButton word={word} numberOfClues={numberOfClues} />
        </div>

        {/* KEYBOARD */}
        {!renderAlphabet ? null : (
          <div className={styles.containerLetters}>
            {ALPHABET.map((letter, index) => {
              return <ButtonLetter letter={letter} word={wordRef.current} key={index} />;
            })}
          </div>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, locale } = context;

  const { id, topic } = query;
  let wordArray = [];
  let title = "TWO_PLAYER_MAIN_MENU";

  // if (id.startsWith('O')) {
  //   wordArray = offlineService({ id });
  // } else if (id.startsWith('N')) {
  //   wordArray = ['it works'];
  // } else {
  //   wordArray = await localMultiplayerService({ id, locale });
  //   title = 'ONE_PLAYER_MAIN_MENU';
  // }

  const word = await localMultiplayerService({ difficult: id, locale, topic: topic || "Astronomy" });
  if (word === false) {
    return {
      props: { word: [], title, id },
    };
  }

  wordArray.push(...word.toUpperCase());
  const numberOfClues = id === "easy" ? 3 : id === "medium" ? 2 : 1;

  return {
    props: { word: wordArray, title, id, numberOfClues },
  };
}
