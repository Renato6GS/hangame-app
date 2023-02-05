import Layout from "components/Layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import ButtonContext from "context/buttonContext";

import styles from "./styles.module.css";
import ButtonLetter from "components/ButtonLetter";
import { ALPHABET } from "constants/alphabet";
import { localMultiplayerService, offlineService } from "services/gameModesApi";
import { useI18N } from "context/i18n";
import Loader from "components/Loader";
import ClueButton from "components/ClueButton";
import { useErrorServer } from "hooks/useErrorServer";
import { useGame } from "hooks/useGame";
import HeadSEO from "components/HeadSEO";
import { generateClue } from "services/generateClue";
import Swal from "sweetalert2";

export default function Game({ word = [], title = "", id, numberOfClues = 0, topic = "" }) {
  useErrorServer({ word });

  const [clue, setClue] = useState(false);
  const [clueLoading, setClueLoading] = useState(false);

  // useEffect(() => {
  //   setClueLoading(true);
  //   async function fetchClue() {
  //     try {
  //       // wait 5 seconds to generate clue
  //       setTimeout(() => {
  //         setClue("lorem ipsum");
  //         setClueLoading(false);
  //         console.log("pista generada");
  //       }, 5000);
  //     } catch (error) {
  //       console.log("Error al generar la pista");
  //       console.log(error);
  //       setClueLoading(false);
  //     }
  //   }
  //   fetchClue();
  // }, []);

  useEffect(() => {
    setClueLoading(true);
    async function fetchClue() {
      try {
        const clueRes = await fetch("/api/getClue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: word.join(""), topic }),
        });
        if (!clueRes.status) throw new Error("Error al generar la pista");
        const clueJson = await clueRes.json();
        const clue = await clueJson.message;
        setClue(clue);
        setClueLoading(false);
      } catch (error) {
        console.log("Error al generar la pista");
        console.log(error);
        setClueLoading(false);
      }
    }
    fetchClue();
  }, []);

  const generateClue = async () => {
    Swal.fire({
      icon: "question",
      title: "Pista",
      text: `${clueLoading ? "La pista estará disponible pronto, vuelva en unos momentos" : clue}`,
    });
  };

  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const { t } = useI18N();
  const wordRef = useRef(word);
  const [loading, setLoading] = useState(false);
  const [renderAlphabet, setRenderAlphabet] = useState(false);
  useGame({ setLoading, wordRef, setWordState, setRenderAlphabet, setTries, id });

  return (
    <>
      <HeadSEO title={"SEO_GAME"} description="Jangman game two players online" />

      {loading && <Loader />}
      <Layout
        titleHeader={t(title === "CREATE_WORD_TITLE" ? "CREATE_WORD_TITLE" : "ONE_PLAYER_MAIN_MENU")}
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
          {wordState.some((s) => s === "_") ? (
            <>
              {t("NUMBER_OF_WORDS")}
              <strong> {wordState.filter((s) => s === "_").length + 1}</strong>
            </>
          ) : (
            <>
              {t("NUMBER_OF_SYLLABLES")}
              <strong> {word.length}</strong>
            </>
          )}
        </small>
        <section className={styles.wordContainer}>
          {wordState.map((w, i) => {
            return (
              <div className={styles.linesContainer} key={i}>
                {w === "_" ? (
                  <div className={styles.lineEmpty}></div>
                ) : (
                  <div className={styles.line}>
                    <p className={styles.wordLetter}>{w}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* UTILS */}
        <div className={styles.containerUtils}>
          <span className={styles.titleTries}>Intentos: {tries + 1}</span>
          <ClueButton word={word} numberOfClues={numberOfClues} />
          <button onClick={() => generateClue(clueLoading, clue)}>Generate clue</button>
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
  const { query, locale, params } = context;

  // const { id, topic } = query;
  const { id } = params;
  const { topic } = query;
  let wordArray = [];
  let title = "CREATE_WORD_TITLE";
  let word = "";

  if (id.startsWith("C")) {
    word = offlineService({ id });
  } else if (id !== "favicon.ico") {
    // HELP: this is a hack to avoid the favicon.ico request lol
    title = "ONE_PLAYER_MAIN_MENU";
    word = await localMultiplayerService({ difficult: id, locale, topic: topic || "Astronomy" });
    if (word === false) {
      return {
        props: { word: [], title, id },
      };
    }
  }

  wordArray.push(...word.toUpperCase());
  const numberOfClues = id === "easy" ? 3 : id === "medium" ? 2 : 1;

  console.log("el id en ssr es");
  console.log(id);

  console.log("el topic en ssr es");
  console.log(topic);

  return {
    props: { word: wordArray, title, id, numberOfClues, topic },
  };
}
