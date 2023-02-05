import { generateClue } from "services/generateClue";

export default async function handler(req, res) {
  try {
    const { word, topic = "Astronomy" } = req.body;
    console.log("la palabra es: ");
    console.log(word, topic);
    const clue = await generateClue({ word, topic });

    res.status(200).json({ status: true, message: clue });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error });
  }
}
