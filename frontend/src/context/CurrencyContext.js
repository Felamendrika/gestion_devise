import React, { createContext, useContext } from "react";
// import currencyService from "../services/currencyService";

// Création du context
const CurrencyContext = createContext();

// Actions

// État initial

// Reducer

// Provider Component
export const CurrencyProvider = ({ children }) => {
  // Actions

  const value = {};

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook personnalisé pour utiliser le context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export default CurrencyContext;
