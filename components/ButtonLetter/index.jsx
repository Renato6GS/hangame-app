import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';

import styles from './styles.module.css';
import ButtonContext from 'context/buttonContext';

const MySwal = withReactContent(Swal);

export default function ButtonLetter({ letter, word }) {
  const [deactivateButton, setDeactivateButton] = useState(false);
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);
  const router = useRouter();

  const evaluateLetter = ({ value }) => {
    const wordString = wordState;
    let found = false;

    word.forEach((letter, index) => {
      if (letter === value || letter.normalize('NFD').replace(/\p{Diacritic}/gu, '') === value) {
        found = true;
        wordString[index] = value;
      }
    });

    if (found) setWordState([...wordString]);
    else setTries((tries) => tries - 1);

    if (wordState.join('') === word.join('')) showWinModal();
  };

  const showLoseModal = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Has perdido...',
      text: '¡Más suerte a la próxima!',
    }).then(() => {
      router.push('/');
    });
  };

  const showWinModal = () => {
    confetti();
    MySwal.fire({
      icon: 'success',
      title: 'Has ganado',
      text: '¡¡¡Felicidades!!!',
    }).then(() => {
      router.push('/');
    });
  };

  const handleClick = (e) => {
    const { value } = e.target;
    evaluateLetter({ value });
    setDeactivateButton(true);
    if (tries === 0) showLoseModal();
  };

  return (
    <button className={styles.letterContainer} onClick={handleClick} value={letter} disabled={deactivateButton}>
      {letter}
    </button>
  );
}
