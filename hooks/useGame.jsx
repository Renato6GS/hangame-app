import { useEffect } from "react";

export const useGame = ({
  setLoading,
  wordRef,
  setWordState,
  setRenderAlphabet,
  setTries,
  locale,
  showDenounceButton,
}) => {
  useEffect(() => {
    setLoading(true);
    setWordState(
      wordRef.current.map((w) => {
        if (w !== " ") return " ";
        return "_";
      })
    );
    setLoading(false);
    setRenderAlphabet(true);
    setTries(5);
    localStorage.setItem("localeSelected", locale);
    localStorage.setItem("showDenounceButton", showDenounceButton);
  }, []);
};
