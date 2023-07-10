import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const Context = ({ children }) => {
  const [dados, setDados] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  return (
    <MyContext.Provider
      value={{ dados, setDados, modal, setModal, error, setError }}
    >
      {children}
    </MyContext.Provider>
  );
};
