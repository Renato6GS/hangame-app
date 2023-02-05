/* eslint-disable indent */
import cohere from "cohere-ai";
import { CLUES } from "constants/CLUES";

cohere.init(process.env.COHERE_API_KEY);

export const generateClue = async ({ word, topic }) => {
  const prompt = `A player is playing the game of hangman. The player's duty is to guess the hidden word and thus be able to win. So I need you to generate a clue from the hidden word and the topic selected by the player, so the player can find out the hidden word.
${CLUES[topic]
  .map((clue) => `---\nword: ${clue.word}\ntopic: ${clue.topic}\nclue: ${clue.clue}\n`)
  .join("")}---\nword: ${word}\ntopic: ${topic}\nclue:`;

  console.log("el prompt es");
  console.log(prompt);

  const response = await cohere.generate({
    model: "command-xlarge-nightly",
    prompt,
    max_tokens: 100,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  });

  const clue = response.body.generations[0].text;

  return clue.split("---")[0];
};
