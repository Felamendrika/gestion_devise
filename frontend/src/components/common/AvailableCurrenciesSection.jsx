// import React, { useContext } from "react";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import CurrencyTooltip from "./CurrencyTooltip";

/**
 * Affiche la liste de toutes les devises disponibles sous forme de grille responsive.
 * @param {Array} currencies - Liste des devises (objet avec code_iso, nom_complet, flag_emoji ou flag_url).
 */
const AvailableCurrenciesSection = ({ currencies }) => {
  // const { devises } = useContext(AppContext);
  if (!currencies || currencies.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto mt-8 mb-12">
      <h2 className="text-2xl font-extrabold text-gray-500 mb-6 text-center">
        Devises disponibles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currencies.map((currency) => (
          <div
            key={currency.code_iso}
            className="group relative flex items-center gap-3 border-2 border-blue-300 bg-transparent rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:bg-blue-50 hover:border-blue-200 transition cursor-default"
          >
            <ReactCountryFlag
              countryCode={currency.code_pays}
              svg
              style={{
                width: "2em",
                height: "2em",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">
                {currency.nom_complet}
              </div>
              <div className="text-xs text-gray-500">{currency.code_iso}</div>
            </div>
            <CurrencyTooltip currency={currency} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableCurrenciesSection;
