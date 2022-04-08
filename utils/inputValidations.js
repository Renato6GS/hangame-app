import { showModal } from './modals';

const REG = /^[a-zA-ZÁáÉéÍíÓóÚúñÑ]+$/g;

export const validateCharacters = ({ keyword }) => {
  REG.lastIndex = 0;
  if (!REG.test(keyword)) {
    showModal({
      type: 'error',
      title: 'Palabra inválida',
      message: 'Por favor ingrese una palabra sin espacios, sin números y sin caracteres especiales.',
    });
    return true;
  }
  return false;
};

export const validateLeng = ({ keyword }) => {
  if (keyword.length <= 14) return false;
  showModal({
    type: 'error',
    title: 'Palabra muy larga',
    message: 'Por favor ingrese una palabra menor a 15 caracteres.',
  });
  return true;
};
