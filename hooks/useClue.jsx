import { useEffect, useState } from "react";

export const useClue = ({ isgenerateClue, topic, word, locale }) => {
  const [clue, setClue] = useState(false);
  const [clueLoading, setClueLoading] = useState(false);

  useEffect(() => {
    setClueLoading(true);
    async function fetchClue() {
      try {
        if (!isgenerateClue && !topic) return;
        const clueRes = await fetch("/api/getClue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: word.join(""), topic, locale }),
        });
        if (!clueRes.status) throw new Error("Error al generar la pista");
        const clueJson = await clueRes.json();
        const clue = await clueJson.message;
        setClueLoading(false);
        setClue(clue);
      } catch (error) {
        console.log("Error al generar la pista");
        console.log(error);
        setClueLoading(false);
      }
    }
    fetchClue();
  }, []);

  // Prueba de concepto para no quema la API
  // useEffect(() => {
  //   setClueLoading(true);
  //   async function fetchClue() {
  //     try {
  //       // wait 5 seconds to generate clue
  //       setTimeout(() => {
  //         setClue("lorem ipsum");
  //         setClueLoading(false);
  //         console.log("pista generada");
  //       }, 5000);
  //     } catch (error) {
  //       console.log("Error al generar la pista");
  //       console.log(error);
  //       setClueLoading(false);
  //     }
  //   }
  //   fetchClue();
  // }, []);

  return { clue, clueLoading };
};
