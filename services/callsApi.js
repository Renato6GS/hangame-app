import CryptoJS from 'crypto-js';

const API = process.env.API;

export const offlineService = ({ id }) => {
  const wordArray = [];
  const word = id.slice(1);
  const decode = decodeURIComponent(word);
  const decryptedData = CryptoJS.AES.decrypt(decode, 'secret').toString(CryptoJS.enc.Utf8);
  const w = decryptedData.toUpperCase();
  wordArray.push(...w);
  return wordArray;
};

export const onlineService = async ({ id }) => {
  const wordArray = [];
  const getId = id.slice(1);
  try {
    const GET_AND_DELETE = process.env.GET_AND_DELETE;
    const response = await fetch(`${API}${GET_AND_DELETE}${getId}`, {
      method: 'DELETE',
    });
    let { word } = await response.json();
    word = word.toUpperCase();
    wordArray.push(...word);
  } catch (error) {
    console.error(error);
  }
  return wordArray;
};

export const localMultiplayerService = async ({ id, locale }) => {
  const wordArray = [];
  try {
    const GET_WORD = process.env.GET_WORD;
    const response = await fetch(`${API}${GET_WORD}${id}_difficulty&${locale}`);
    const { word } = await response.json();
    wordArray.push(...word);
  } catch (error) {
    console.error(error);
  }
  return wordArray;
};
