import React from "react";

import Layout from "components/Layout";
import { useI18N } from "context/i18n";
import HeadSEO from "components/HeadSEO";
import Title from "components/Title";
import CreateWordForm from "components/CreateWordForm";

export default function CreateWord() {
  const { t } = useI18N();

  return (
    <>
      <HeadSEO title={"SEO_TWO_PLAYERS"} description="Hangman game two players offline" />
      <Layout titleHeader={t("TWO_PLAYER_MAIN_MENU")} href="/TwoPlayers">
        <Title title="INSTRUCTIONS_MULTIPLAYER" />
        <CreateWordForm />
      </Layout>
    </>
  );
}
