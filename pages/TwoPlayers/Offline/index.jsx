import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import Layout from "components/Layout";
import { validateCharacters, validateLeng } from "utils/inputValidations";
import { useI18N } from "context/i18n";
import { ArrowNarrowRightIcon } from "components/icons";
import HeadSEO from "components/HeadSEO";

export default function Offline() {
  const [keyword, setKeyword] = useState("");
  const [crypto, setCrypto] = useState("");
  const router = useRouter();
  const { t } = useI18N();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateLeng({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_LENG_ERROR_MESSAGE") })) return;
    if (validateCharacters({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_CHAR_ERROR_MESSAGE") }))
      return;

    router.push(`/Game/O${crypto}`);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const ciphertext = CryptoJS.AES.encrypt(value, "secret");

    setKeyword(value);
    setCrypto(encodeURIComponent(ciphertext.toString()));
  };

  return (
    <>
      <HeadSEO title={"SEO_TWO_PLAYERS"} description="Hangman game two players offline" />

      <Layout titleHeader={t("TWO_PLAYER_MAIN_MENU")} href="/TwoPlayers">
        <h2 className={styles.title}>{t("INSTRUCTIONS_MULTIPLAYER")}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={handleChange}
            type="text"
            name="inputWord"
            id="inputWord"
            placeholder={t("EXAMPLE")}
            value={keyword}
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            <span className={styles.buttonContent}>{t("START")}</span>
            <ArrowNarrowRightIcon />
          </button>
        </form>
      </Layout>
    </>
  );
}
