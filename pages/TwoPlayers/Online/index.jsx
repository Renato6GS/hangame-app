import { useState } from "react";

import styles from "./styles.module.css";
import { validateCharacters, validateLeng } from "utils/inputValidations";
import Layout from "components/Layout";
import Loader from "components/Loader";
import { useI18N } from "context/i18n";
import { useRouter } from "next/router";
import { ArrowNarrowRightIcon, CopyIcon } from "components/icons";
import HeadSEO from "components/HeadSEO";

export default function Online({ API, CREATE_ROOM }) {
  const [keyword, setKeyword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [generateLink, setGenerateLink] = useState("empy");
  const [showLink, setShowLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useI18N();
  const { locale } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateLeng({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_LENG_ERROR_MESSAGE") })) return;
    if (validateCharacters({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_CHAR_ERROR_MESSAGE") }))
      return;
    setLoading(true);

    try {
      const response = await fetch(`${API}${CREATE_ROOM}${keyword}`);
      const { id } = await response.json();

      setGenerateLink(`https://hangame-app.vercel.app/${locale}/Game/N${id}`);
      setShowLink(true);
    } catch (error) {
      console.log("Hubo el siguiente error creando la sala:");
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(generateLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <HeadSEO title={"SEO_TWO_PLAYERS"} description="Hangman game two players online" />

      {loading && <Loader />}
      <Layout titleHeader={t("TWO_PLAYER_MAIN_MENU")} href="/TwoPlayers" largeScreen={true}>
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
            <span className={styles.buttonContent}>{t("GENATE_LINK")}</span>
            <ArrowNarrowRightIcon />
          </button>
        </form>

        {showLink && (
          <section className={styles.linkContainer}>
            <h3 className={`${styles.title} ${styles.titleLink}`}>{t("SHARE_LINK")}</h3>
            <h4 className={styles.linkToShare}>{generateLink}</h4>
            <button className={`${styles.button} ${styles.buttonLink}`} onClick={handleCopyClick}>
              <span className={styles.copyLabel}>{isCopied ? t("COPIED") : t("COPY")}</span>
              <CopyIcon />
            </button>
          </section>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const API = process.env.API;
  const CREATE_ROOM = process.env.CREATE_ROOM;
  return {
    props: { API, CREATE_ROOM },
  };
}
