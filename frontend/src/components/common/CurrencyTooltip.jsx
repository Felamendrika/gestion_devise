import React from "react";
import ReactCountryFlag from "react-country-flag";

const CurrencyTooltip = ({ currency }) => {
  if (!currency) return null;

  return (
    <div className="absolute z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200 min-w-[180px] transform -translate-y-full -translate-x-1/2 left-1/2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="flex items-center gap-2 mb-1">
        <ReactCountryFlag
          countryCode={currency.code_pays}
          svg
          style={{
            width: "1.2em",
            height: "1.2em",
            borderRadius: "50%",
          }}
        />
        <span className="font-semibold text-gray-800 text-sm">
          {currency.code_iso}
        </span>
      </div>
      <div className="text-xs text-gray-600">
        <p className="mb-0.5">
          <span className="font-medium">Nom:</span> {currency.nom_complet}
        </p>
        <p className="mb-0.5">
          <span className="font-medium">Pays:</span> {currency.code_pays}
        </p>
        {currency.symbole && (
          <p>
            <span className="font-medium">Symbole:</span> {currency.symbole}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyTooltip;
