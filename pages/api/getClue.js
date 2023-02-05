import { generateClue } from "services/generateClue";
import { translateSentence } from "services/translateSentence";

export default async function handler(req, res) {
  try {
    const { word, topic = "Astronomy", locale = "en" } = req.body;
    console.log("la palabra es: ");
    console.log(word, topic);
    let clue = await generateClue({ word, topic });

    if (locale === "en") {
      res.status(200).json({ status: true, message: clue });
      return;
    }

    clue = await translateSentence({ locale, sentence: clue });
    res.status(200).json({ status: true, message: clue });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error });
  }
}
