import { createContext, useState } from "react";

const ButtonContext = createContext();

export function ButtonContextProvider({ children }) {
  const [wordState, setWordState] = useState([]);
  const [tries, setTries] = useState(6);

  return (
    <ButtonContext.Provider
      value={{
        wordState,
        setWordState,
        tries,
        setTries,
      }}>
      {children}
    </ButtonContext.Provider>
  );
}

export default ButtonContext;
