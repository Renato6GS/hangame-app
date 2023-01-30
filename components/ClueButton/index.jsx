import Button from "components/Button";
import ButtonContext from "context/buttonContext";
import { useI18N } from "context/i18n";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { showWinModal } from "utils/modals";

export default function ClueButton({ word, numberOfClues }) {
  const [clues, setClues] = useState(numberOfClues);
  const { wordState, setWordState } = useContext(ButtonContext);
  const { t } = useI18N();
  const router = useRouter();

  const giveClue = () => {
    if (clues === 0) return;
    const length = word.length;
    const random = Math.floor(Math.random() * length);
    if (wordState[random] !== " ") return giveClue();
    const letter = word[random];
    const wordStateCopy = [...wordState].map((el, index) => {
      if (word[index] === letter) return letter;
      return el;
    });
    setWordState(wordStateCopy);
    if (wordStateCopy.join("") === word.join("")) {
      showWinModal(t, router, word);
    }
    setClues((clue) => clue - 1);
  };

  return (
    <Button onClick={giveClue} disabled={clues === 0} addBorder fitContent>
      Pistas: {clues}
    </Button>
  );
}
