import { useState } from "react";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";
import { validateCharacters, validateEmptyString, validateLeng } from "utils/inputValidations";
import { ArrowNarrowRightIcon, ShareIcon } from "components/icons";
import Button from "components/Button";

export default function CreateWordForm() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { t } = useI18N();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validateEmptyString({
        keyword,
        title: t("VALIDATE_EMPTY_ERROR"),
        message: t("VALIDATE_EMPTY_ERROR_MESSAGE"),
        modal: true,
      })
    ) {
      setError(t("VALIDATE_EMPTY_ERROR"));
      return;
    }
    if (
      validateLeng({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_LENG_ERROR_MESSAGE"), modal: true })
    )
      return;
    if (
      validateCharacters({
        keyword,
        title: t("VALIDATE_CHAR_ERROR"),
        message: t("VALIDATE_CHAR_ERROR_MESSAGE"),
        modal: true,
      })
    )
      return;

    const ciphertext = CryptoJS.AES.encrypt(keyword, "secret");
    const encodeWord = encodeURIComponent(ciphertext.toString());
    router.push(`/Game/C${encodeWord}`);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (validateLeng({ keyword: value, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_LENG_ERROR_MESSAGE") })) {
      setError(t("VALIDATE_LENG_ERROR_MESSAGE"));
      return;
    }
    if (
      validateCharacters({ keyword: value, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_CHAR_ERROR_MESSAGE") })
    ) {
      setError(t("VALIDATE_CHAR_ERROR_MESSAGE"));
      return;
    }

    setError("");
    setKeyword(value);
  };

  const handleShare = async () => {
    if (
      validateEmptyString({
        keyword,
        title: t("VALIDATE_EMPTY_ERROR"),
        message: t("VALIDATE_EMPTY_ERROR_MESSAGE"),
        modal: true,
      })
    ) {
      setError(t("VALIDATE_EMPTY_ERROR"));
      return;
    }
    if (
      validateLeng({ keyword, title: t("VALIDATE_CHAR_ERROR"), message: t("VALIDATE_LENG_ERROR_MESSAGE"), modal: true })
    )
      return;
    if (
      validateCharacters({
        keyword,
        title: t("VALIDATE_CHAR_ERROR"),
        message: t("VALIDATE_CHAR_ERROR_MESSAGE"),
        modal: true,
      })
    )
      return;

    const ciphertext = CryptoJS.AES.encrypt(keyword, "secret");
    const encodeWord = encodeURIComponent(ciphertext.toString());
    console.log(encodeWord);
    try {
      await navigator.share({
        title: "Adivina la palabra",
        text: "Juega adivina la palabra conmigo",
        // url: `https://adivinalapalabra.vercel.app/Game/C${encodeWord}`,
        url: `https://www.hangame.app/Game/C${encodeWord}`,
      });
    } catch (error) {
      console.log(error);
      setError("No se pudo compartir el link." + error);
    }
  };

  return (
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
        required
      />
      <span className={styles.error}>{error}</span>
      <div className={styles.buttonContainer}>
        <Button type="submit">
          <span className={styles.buttonContent}>{t("START")}</span>
          <ArrowNarrowRightIcon />
        </Button>
        <Button onClick={handleShare}>
          <span className={styles.buttonContent}>Compartir</span>
          <ShareIcon />
        </Button>
      </div>
    </form>
  );
}
