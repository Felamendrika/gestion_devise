import React, { useContext, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { AppContext } from "../../context/AppContext";

const CurrencyDropdown = ({
  value,
  onChange,
  placeholder = "Sélectionnez une devise",
  label = "Devise",
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // acces aux devises globales via le context
  const { devises } = useContext(AppContext);

  // Filtrage dynamique selon la recherche
  const filtered = Array.isArray(devises)
    ? devises.filter(
        (c) =>
          c.code_iso.toLowerCase().includes(search.toLowerCase()) ||
          c.code_pays.toLowerCase().includes(search.toLowerCase()) ||
          c.nom_complet.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div
        className="w-full p-3 border rounded-lg bg-white flex items-center cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {value ? (
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode={value.code_pays}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
            />
            <span>
              {value.code_iso} - {value.nom_complet}
            </span>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="ml-auto">&#9662;</span>
      </div>
      {open && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          <input
            type="text"
            className="w-[95%] ml-1 mt-1 p-2 border-gray-500 rounded-sm bg-transparent border-2 outline-none"
            placeholder="Entrez une devise/un pays"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filtered.length === 0 && (
            <div className="p-2 text-gray-400 text-center">
              Aucune devise trouvée
            </div>
          )}
          {filtered.map((c) => (
            <div
              key={c.code_iso}
              className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                onChange(c);
                setOpen(false);
                setSearch("");
              }}
            >
              <ReactCountryFlag
                countryCode={c.code_pays}
                svg
                style={{
                  width: "2em",
                  height: "2em",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <span className="font-semibold">{c.code_iso}</span>
              <span className="text-gray-500">{c.nom_complet}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
