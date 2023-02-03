import { useRouter } from "next/router";
import { useEffect } from "react";

export const useGame = ({ setLoading, wordRef, setWordState, setRenderAlphabet, setTries, id }) => {
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (id.startsWith("N")) {
      fetch(`/api/getAndDelete?q=${id}`)
        .then((res) => res.json())
        .then((wordArray) => {
          wordRef.current = wordArray;
          setWordState(wordArray.map(() => " "));
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
          router.push("/");
        });
    } else {
      setWordState(
        wordRef.current.map((w) => {
          if (w !== " ") return " ";
          return "_";
        })
      );
      setLoading(false);
      setRenderAlphabet(true);
    }
    setTries(5);
  }, []);
};
