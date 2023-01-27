import Layout from "components/Layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import ButtonContext from "context/buttonContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import ButtonLetter from "components/ButtonLetter";
import { ALPHABET } from "constants/alphabet";
import { localMultiplayerService } from "services/callsApi";
import { useI18N } from "context/i18n";
import Loader from "components/Loader";

export default function Game({ word = [], title = "a", id }) {
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const router = useRouter();
  const { t } = useI18N();
  const wordRef = useRef(word);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    if (word.length === 0) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: t("SERVER_ERROR_MODAL"),
        text: t("TEXT_ERROR_MODAL"),
      }).then(() => {
        router.push("/");
      });
    }
  }, []);

  useEffect(function () {
    setLoading(true);
    if (id.startsWith("N")) {
      fetch(`/api/getAndDelete?q=${id}`)
        .then((res) => res.json())
        .then((wordArray) => {
          wordRef.current = wordArray;
          setWordState(wordArray.map(() => " "));
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
          router.push("/");
        });
    } else {
      setWordState(wordRef.current.map(() => " "));
      setLoading(false);
    }
    setTries(5);
  }, []);

  return (
    <>
      <Head>
        <title>{t("SEO_GAME")}</title>
        <link rel="icon" href="/logo.ico" />
        <link rel="preload" href="/font/Roboto-Bold.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/font/Roboto-Regular.ttf" as="font" crossOrigin="" />
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
            return <ButtonLetter letter={letter} word={wordRef.current} key={index} />;
          })}
        </div>
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

  const word = await localMultiplayerService({ id, locale, topic: topic || "Astronomy" });
  wordArray.push(...word.toUpperCase());

  return {
    props: { word: wordArray, title, id },
  };
}
