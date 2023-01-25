import { showModal } from "./modals";

const REG = /^[a-zA-ZÁáÉéÍíÓóÚúñÑ]+$/g;

export const validateCharacters = ({ keyword, title, message }) => {
  REG.lastIndex = 0;
  if (!REG.test(keyword)) {
    showModal({
      type: "error",
      title,
      message,
    });
    return true;
  }
  return false;
};

export const validateLeng = ({ keyword, title, message }) => {
  if (keyword.length <= 14) return false;
  showModal({
    type: "error",
    title,
    message,
  });
  return true;
};
