import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';

import styles from './styles.module.css';
import ButtonContext from 'context/buttonContext';
import { useI18N } from 'context/i18n';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export default function ButtonLetter({ letter, word }) {
  const [deactivateButton, setDeactivateButton] = useState(false);
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const router = useRouter();
  const { t } = useI18N();

  const evaluateLetter = ({ value }) => {
    const wordString = wordState;
    let found = false;

    word.forEach((letter, index) => {
      if (letter === value) {
        found = true;
        wordString[index] = value;
      }
      if (letter.normalize('NFD').replace(/\p{Diacritic}/gu, '') === value) {
        found = true;
        wordString[index] = letter;
      }
    });

    if (found) {
      setWordState([...wordString]);
      Toast.fire({
        icon: 'success',
        title: t('YOU_R_RIGHT'),
      });
    } else {
      setTries((tries) => tries - 1);
      Toast.fire({
        icon: 'error',
        title: t('YOU_R_WRONG'),
      });
    }

    if (wordState.join('') === word.join('')) showWinModal();
    else if (tries === 0 && !found) showLoseModal();
  };

  const showLoseModal = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'error',
      title: t('GAME_OVER'),
      text: t('BETTER_LUCK'),
      footer: `${t('ANSWER')}: ${word.join('')}`,
    }).then(() => {
      router.push('/');
    });
  };

  const showWinModal = () => {
    confetti();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: t('YOU_WON'),
      text: t('CONGRATULATIONS'),
    }).then(() => {
      router.push('/');
    });
  };

  const handleClick = (e) => {
    const { value } = e.target;
    evaluateLetter({ value });
    setDeactivateButton(true);
  };

  return (
    <button className={styles.letterContainer} onClick={handleClick} value={letter} disabled={deactivateButton}>
      {letter}
    </button>
  );
}
