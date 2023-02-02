import { showModal } from "./modals";

const REG = /^[a-zA-ZÁáÉéÍíÓóÚúñÑ ]+$/g;

export const validateCharacters = ({ keyword, title, message, modal = false }) => {
  if (keyword.length === 0) return false;
  REG.lastIndex = 0;
  if (!REG.test(keyword)) {
    if (modal) {
      showModal({
        type: "error",
        title,
        message,
      });
    }
    return true;
  }
  return false;
};

export const validateLeng = ({ keyword, title, message, modal = false }) => {
  if (keyword.length <= 30) return false;
  if (modal) {
    showModal({
      type: "error",
      title,
      message,
    });
  }
  return true;
};

export const validateEmptyString = ({ keyword, title, message, modal = false }) => {
  if (keyword.length > 0) return false;
  if (modal) {
    showModal({
      type: "error",
      title,
      message,
    });
  }
  return true;
};
