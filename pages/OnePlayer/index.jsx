import Layout from "components/Layout";
import LayoutButton from "components/LayoutButton";
import React, { useState } from "react";
import Head from "next/head";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";
import Button from "components/Button";
import { ArrowNarrowRightIcon } from "components/icons";
import { DIFFICULTIES } from "constants/DIFFICULTIES";
import { TOPICS_ARRAY } from "constants/TOPICS";
import { useRouter } from "next/router";

export default function OnePlayer() {
  const { t } = useI18N();
  const [steps, setSteps] = useState(0);
  const [gameOptions, setGameOptions] = useState({
    difficulty: "",
    topic: "",
  });
  const router = useRouter();

  const handleClickDifficulty = (e) => {
    console.log(e.target.value);
    setGameOptions((acc) => ({ ...acc, difficulty: e.target.value }));
    setSteps((acc) => acc + 1);
  };

  const handleClickTopic = (e) => {
    console.log(e.target.value);
    setGameOptions((acc) => ({ ...acc, topic: e.target.value }));
    setSteps((acc) => acc + 1);
    generateGame();
  };

  const generateGame = () => {
    router.push(`/Game/${gameOptions.difficulty}/${gameOptions.topic}`);
  };

  return (
    <>
      <Head>
        <title>{t("SEO_ONE_PLAYER")}</title>
        <meta name="description" content="Hangman game with one player" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Layout titleHeader={t("ONE_PLAYER_TITLE")} href="/">
        <LayoutButton>
          {steps === 0 ? (
            <>
              <h2 className={styles.title}>{t("SELECT_A_DIFFICULTY")}</h2>
              {DIFFICULTIES.map((difficulty) => (
                <Button key={difficulty} value={difficulty} onClick={handleClickDifficulty}>
                  {t(difficulty)}
                  <ArrowNarrowRightIcon />
                </Button>
              ))}
            </>
          ) : null}

          {steps === 1 ? (
            <>
              <h2 className={styles.title}>{t("SELECT_A_TOPIC")}</h2>
              {TOPICS_ARRAY.map((topic) => (
                <Button key={topic} value={topic} onClick={handleClickTopic}>
                  {t(topic)}
                  <ArrowNarrowRightIcon />
                </Button>
              ))}
            </>
          ) : null}

          {steps === 2 ? <p>Generando...</p> : null}
        </LayoutButton>
      </Layout>
    </>
  );
}
