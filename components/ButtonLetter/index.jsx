import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import ButtonContext from "context/buttonContext";
import { useI18N } from "context/i18n";
import { showLoseModal, showWinModal } from "utils/modals";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 1300,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function ButtonLetter({ letter, word }) {
  const [deactivateButton, setDeactivateButton] = useState(false);
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const router = useRouter();
  const { t } = useI18N();

  useEffect(() => {
    if (wordState.join("").includes(letter)) {
      setDeactivateButton(true);
    }
  }, [wordState, letter]);

  const evaluateLetter = ({ value }) => {
    const wordString = wordState;
    let found = false;

    word.forEach((letter, index) => {
      if (letter === value) {
        found = true;
        wordString[index] = value;
      }
      if (letter.normalize("NFD").replace(/\p{Diacritic}/gu, "") === value) {
        found = true;
        wordString[index] = letter;
      }
    });

    if (found) {
      setWordState([...wordString]);
      Toast.fire({
        icon: "success",
        title: t("YOU_R_RIGHT"),
      });
    } else {
      setTries((tries) => tries - 1);
      Toast.fire({
        icon: "error",
        title: t("YOU_R_WRONG"),
      });
    }

    if (wordState.join("") === word.join("")) showWinModal(t, router, word);
    else if (tries === 0 && !found) showLoseModal(t, router, word);
  };

  const handleClick = (e) => {
    const { value } = e.target;
    evaluateLetter({ value });
    setDeactivateButton(true);
  };

  return (
    <button
      type="button"
      className={styles.letterContainer}
      onClick={handleClick}
      value={letter}
      disabled={deactivateButton}>
      {letter}
    </button>
  );
}
