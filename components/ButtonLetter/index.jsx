import React, { useState, useContext } from 'react';

import styles from './styles.module.css';
import ButtonContext from 'context/buttonContext';

export default function ButtonLetter({ letter, word }) {
  const [deactivateButton, setDeactivateButton] = useState(false);
  const { wordState, setWordState, tries, setTries } = useContext(ButtonContext);

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
    setTries((tries) => tries - 1);

    console.log(found);
    console.log({ tries });
  };

  const showModal = () => {
    console.log('Has perdido chavalin');
  };

  const handleClick = (e) => {
    const { value } = e.target;
    evaluateLetter({ value });
    setDeactivateButton(true);
    if (tries === 0) showModal();
  };

  return (
    <button className={styles.letterContainer} onClick={handleClick} value={letter} disabled={deactivateButton}>
      {letter}
    </button>
  );
}
