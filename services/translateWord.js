const API_AZURE_TRANSLATE = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=";

export const translateWord = async ({ locale, word }) => {
  if (locale === "en") return word;
  if (word.length > 25) return false;
  try {
    const response = await fetch(`${API_AZURE_TRANSLATE}${locale}`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_TRANSLATE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: word }]),
    });
    const data = await response.json();
    word = data[0].translations[0].text;
  } catch (error) {
    console.error(error);
  }
  return word;
};
