import { createContext, useState } from 'react';

const ButtonContext = createContext();

export function ButtonContextProvider({ children }) {
  const [wordState, setWordState] = useState([]);

  return (
    <ButtonContext.Provider
      value={{
        wordState,
        setWordState,
      }}>
      {children}
    </ButtonContext.Provider>
  );
}

export default ButtonContext;
