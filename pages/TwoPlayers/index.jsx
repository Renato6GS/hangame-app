import React from "react";
import Layout from "components/Layout";
import LinkToPage from "components/LinkToPage";
import LayoutButton from "components/LayoutButton";
import Head from "next/head";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";

export default function TwoPlayers() {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>{t("SEO_TWO_PLAYERS")}</title>
        <meta name="description" content="Hangman game two players offline and online" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Layout titleHeader={t("TWO_PLAYER_MAIN_MENU")} href="/">
        <h2 className={styles.title}>{t("SELECT_A_TYPE_OF_GAME")}</h2>

        <LayoutButton>
          <LinkToPage contain={t("OFFLINE")} href="/TwoPlayers/Offline"></LinkToPage>
          <LinkToPage contain={t("ONLINE")} href="/TwoPlayers/Online"></LinkToPage>
        </LayoutButton>
      </Layout>
    </>
  );
}
