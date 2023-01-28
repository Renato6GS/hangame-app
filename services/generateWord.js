import cohere from "cohere-ai";
import { TOPICS } from "constants/TOPICS";

cohere.init(process.env.COHERE_API_KEY);

export const generateWord = async ({ id, topic }) => {
  const prompt = `This is a hangman game where a player wants to guess a hidden word about ${topic}. You have to generate a ${id} word about astronomy so that the player has to guess it..
--\nWord: ${TOPICS[topic][0]}
--\nWord: ${TOPICS[topic][1]}
--\nWord: ${TOPICS[topic][2]}
--\nWord: ${TOPICS[topic][3]}
--\nWord: ${TOPICS[topic][4]}
--\nWord: ${TOPICS[topic][5]}
--\nWord:`;

  const response = await cohere.generate({
    model: "medium",
    prompt,
    max_tokens: 10,
    temperature: 2,
    k: 385,
    p: 0.75,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });

  // get the first 2 words:
  const word = response.body.generations[0].text
    .replaceAll("-", "")
    .replaceAll("\n", "")
    .split(" ")
    .slice(0, 2)
    .join(" ")
    .trim();

  return word;
};
