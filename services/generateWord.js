import cohere from "cohere-ai";

cohere.init(process.env.COHERE_API_KEY);

const TOPIS = {
  Astronomy: ["Universe", "Solar system", "Andromeda", "Centaurus", "Mars", "Earth"],
};

export const generateWord = async ({ id, locale, topic, numberOfGenerations = 0 }) => {
  const MAX_GENERATIONS = 3; // Esto debido a la limitación de la API y para que no me cobren xD
  numberOfGenerations++;
  const prompt = `This is a hangman game where a player wants to guess a hidden word about ${topic}. You have to generate a ${id} word about astronomy so that the player has to guess it..
--\nWord: ${TOPIS[topic][0]}
--\nWord: ${TOPIS[topic][1]}
--\nWord: ${TOPIS[topic][2]}
--\nWord: ${TOPIS[topic][3]}
--\nWord: ${TOPIS[topic][4]}
--\nWord: ${TOPIS[topic][5]}
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

  if (numberOfGenerations > MAX_GENERATIONS) return word;

  if (word.length <= 4 && id === "easy") {
    return word;
  } else if (word.length >= 5 && word.length <= 7 && id === "medium") {
    return word;
  } else if (word.length >= 8 && id === "hard") {
    return word;
  } else {
    console.log("la palabra no cumple con los requisitos, se vuelve a generar: " + word);
    return generateWord({ id, locale, topic, numberOfGenerations });
  }
};
