const API_AZURE_TRANSLATE = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=";

export const translateSentence = async ({ locale, sentence }) => {
  if (locale === "en") return sentence;
  try {
    const response = await fetch(`${API_AZURE_TRANSLATE}${locale}`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_TRANSLATE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: sentence }]),
    });
    const data = await response.json();
    sentence = data[0].translations[0].text;
  } catch (error) {
    console.error(error);
  }
  return sentence;
};
