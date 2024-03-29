import CryptoJS from "crypto-js";
import { generateWord } from "./generateWord";
import { translateWord } from "./translateWord";

const API = process.env.API;

export const offlineService = ({ id }) => {
  const word = id.slice(1);
  const decode = decodeURIComponent(word);
  const decryptedData = CryptoJS.AES.decrypt(decode, "secret").toString(CryptoJS.enc.Utf8);
  const w = decryptedData.toUpperCase();
  return w;
};

export const onlineService = async ({ id }) => {
  const wordArray = [];
  const getId = id.slice(1);
  try {
    const GET_AND_DELETE = process.env.GET_AND_DELETE;
    const response = await fetch(`${API}${GET_AND_DELETE}${getId}`, {
      method: "DELETE",
    });
    let { word } = await response.json();
    word = word.toUpperCase();
    wordArray.push(...word);
  } catch (error) {
    console.error(error);
  }
  return wordArray;
};

export const localMultiplayerService = async ({ difficult, locale, topic }) => {
  let word = "";
  try {
    word = await generateWord({ difficult, topic });
    word = await translateWord({ locale, word });
    console.log("la word es: ");
    console.log(word);
  } catch (error) {
    console.error(error);
  }
  return word;
};
