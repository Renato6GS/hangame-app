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
    console.log(wordState);
    const lengt = word.length;
    const random = Math.floor(Math.random() * lengt);
    if (wordState[random] !== " ") return giveClue();
    const letter = word[random];
    const wordStateCopy = [...wordState];
    wordStateCopy[random] = letter;
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
