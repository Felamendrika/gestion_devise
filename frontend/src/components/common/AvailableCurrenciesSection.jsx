// import React, { useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import { AppContext } from "../../context/AppContext";

/**
 * Affiche la liste de toutes les devises disponibles sous forme de grille responsive.
 * @param {Array} currencies - Liste des devises (objet avec code_iso, nom_complet, flag_emoji ou flag_url).
 */
const AvailableCurrenciesSection = ({ currencies }) => {
  // const { devises } = useContext(AppContext);
  if (!currencies || currencies.length === 0) return null;

  return (
    // <div className="w-full max-w-6xl mx-auto mt-8 mb-12">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-extrabold text-gray-500 mb-6 text-center tracking-tight">
        Devises disponibles pour la conversion
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currencies.map((currency) => (
          <div
            key={currency.code_iso}
            className="flex items-center gap-3 border-2 border-blue-300 bg-transparent rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 cursor-default transition"
          >
            {/* Affichage du drapeau (emoji ou url) */}
            <ReactCountryFlag
              countryCode={currency.code_pays}
              svg
              style={{
                width: "2em",
                height: "2em",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <div>
              <div className="font-semibold text-gray-900">
                {currency.nom_complet}
              </div>
              <div className="text-xs text-gray-500">{currency.code_iso}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCurrenciesSection;
