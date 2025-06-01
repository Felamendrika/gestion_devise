import React from "react";
import ReactCountryFlag from "react-country-flag";

const PopularConversionsTable = ({
  from,
  to,
  rate,
  values,
  isReverse = false,
}) => (
  <div className="bg-white rounded-2xl shadow-xl p-0 w-full max-w-lg mx-auto overflow-hidden border border-blue-100">
    {/* Header */}
    <div className="flex items-center justify-around px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex items-center gap-4 justify-center">
        <ReactCountryFlag
          countryCode={from.code_pays}
          svg
          style={{
            width: "2em",
            height: "2em",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
        <div>
          <div className="font-bold text-gray-800">{from.code_iso}</div>
          <div className="text-xs text-gray-500">
            {from.nom_complet} ( {from.symbole} )
          </div>
        </div>
      </div>
      <span className="text-2xl font-bold text-blue-400 mx-4">⇄</span>
      <div className="flex items-center gap-2">
        <ReactCountryFlag
          countryCode={to.code_pays}
          svg
          style={{
            width: "2em",
            height: "2em",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
        <div>
          <div className="font-bold text-gray-800">{to.code_iso}</div>
          <div className="text-xs text-gray-500">
            {to.nom_complet} ( {to.symbole} )
          </div>
        </div>
      </div>
    </div>
    {/* Table */}
    <table className="w-full">
      <tbody>
        {values.map((v) => (
          <tr
            key={v}
            className="border-b border-gray-100 hover:bg-blue-50 transition"
          >
            <td className="py-3 px-5 text-center font-semibold text-blue-700 text-lg whitespace-nowrap">
              {v.toLocaleString()}
              {/* {isReverse ? to.symbole : from.symbole} */}
            </td>
            <td className="py-3 px-3 text-center font-medium text-gray-800 text-lg whitespace-nowrap">
              {isReverse
                ? (v * (1 / rate)).toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })
                : (v * rate).toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                  })}{" "}
              {/* {isReverse ? from.symbole : to.symbole} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PopularConversionsTable;
