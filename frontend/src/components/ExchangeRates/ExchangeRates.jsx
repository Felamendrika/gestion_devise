import React, { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import currencies from "../../mocks/currencies";
import rates from "../../mocks/rates";
import ratesWithMargin from "../../mocks/ratesWithMargin";
import CurrencyDropdown from "../common/CurrencyDropdown";

const ExchangeRates = () => {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [trackedCurrencies, setTrackedCurrencies] = useState([]);
  const [showAddList, setShowAddList] = useState(false);
  const [search, setSearch] = useState("");
  const addListRef = useRef(null);

  // Obtenir le taux de change réel entre deux devises
  const getExchangeRate = (sourceId, targetId) => {
    const rate = rates.find(
      (r) => r.devise_source_id === sourceId && r.devise_cible_id === targetId
    );
    return rate ? rate.taux : null;
  };

  // Calcul de la fluctuation sur 24h pour une paire
  const getFluctuation = (sourceId, targetId) => {
    // On récupère tous les taux pour la paire, triés par date décroissante
    const pairRates = rates
      .filter(
        (r) => r.devise_source_id === sourceId && r.devise_cible_id === targetId
      )
      .sort((a, b) => new Date(b.date_maj) - new Date(a.date_maj));
    if (pairRates.length < 2) return null;
    const current = pairRates[0].taux;
    const previous = pairRates[1].taux;
    if (!previous || previous === 0) return null;
    const fluct = ((current - previous) / previous) * 100;
    return fluct;
  };

  // Ajouter une devise à suivre
  const handleAddCurrency = (currency) => {
    if (
      currency &&
      !trackedCurrencies.find((c) => c.id === currency.id) &&
      currency.id !== sourceCurrency?.id
    ) {
      setTrackedCurrencies([...trackedCurrencies, currency]);
      setShowAddList(false);
      setSearch("");
    }
  };

  // Suppression d'une devise suivie
  const handleDeleteCurrency = (currencyId) => {
    setTrackedCurrencies(trackedCurrencies.filter((c) => c.id !== currencyId));
  };

  // Liste des devises disponibles à ajouter (hors source et déjà suivies)
  const availableCurrencies = currencies.filter(
    (c) =>
      c.id !== sourceCurrency?.id &&
      !trackedCurrencies.find((tc) => tc.id === c.id)
  );

  // Filtrage par recherche
  const filteredCurrencies = availableCurrencies.filter(
    (c) =>
      c.codeISO.toLowerCase().includes(search.toLowerCase()) ||
      c.nom_complet.toLowerCase().includes(search.toLowerCase())
  );

  // Liste des paires populaires prédéfinies (exemple)
  const popularPairs = [
    { source: "USD", target: "EUR" },
    { source: "USD", target: "GBP" },
    { source: "EUR", target: "USD" },
    { source: "EUR", target: "GBP" },
    { source: "USD", target: "CAD" },
    { source: "EUR", target: "INR" },
  ];

  // Helper pour trouver l'objet devise par codeISO
  const getCurrencyByCode = (code) =>
    currencies.find((c) => c.codeISO === code);

  // Helper pour trouver le taux réel actuel pour une paire
  const getCurrentRate = (sourceId, targetId) => {
    const pairRates = rates
      .filter(
        (r) => r.devise_source_id === sourceId && r.devise_cible_id === targetId
      )
      .sort((a, b) => new Date(b.date_maj) - new Date(a.date_maj));
    return pairRates.length > 0 ? pairRates[0] : null;
  };

  // Helper pour trouver le taux avec marge pour une paire
  const getMarginRate = (sourceId, targetId) =>
    ratesWithMargin.find(
      (r) => r.devise_source_id === sourceId && r.devise_cible_id === targetId
    );

  // Fermer la liste si clic en dehors
  useEffect(() => {
    if (!showAddList) return;
    function handleClickOutside(event) {
      if (addListRef.current && !addListRef.current.contains(event.target)) {
        setShowAddList(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAddList]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full pt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Taux de change réels
          </h1>
          <p className="text-lg text-gray-600">
            Suivez en temps réel l'évolution des taux de change de vos devises
            préférées
          </p>
        </div>

        {/* Sélecteur de devise source */}
        <div className="mb-8 max-w-xs">
          <h2 className="inline-block text-xl font-semibold text-gray-900 mb-4">
            Sélectionnez votre devise de référence
          </h2>
          <CurrencyDropdown
            currencies={currencies}
            value={sourceCurrency}
            onChange={setSourceCurrency}
            placeholder="Choisir une devise"
          />
        </div>

        {/* Tableau de suivi des taux */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fluctuation (24h)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {/* Action */}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Première ligne : devise source */}
              <tr className="bg-gray-100 font-bold">
                <td className="px-6 py-4 whitespace-nowrap">
                  {sourceCurrency ? (
                    <div className="flex items-center">
                      <ReactCountryFlag
                        countryCode={sourceCurrency.countryCode}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "0.5em",
                          borderRadius: "100%",
                          overflow: "hidden",
                        }}
                      />
                      <span className="text-base font-semibold mr-2">
                        {sourceCurrency.codeISO}
                      </span>
                      <span className="text-gray-600">
                        {sourceCurrency.nom_complet}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      Sélectionnez une devise source
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg">
                  {sourceCurrency ? 1 : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">—</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              {/* Lignes suivantes : devises suivies */}
              {trackedCurrencies.map((currency) => {
                const fluct = sourceCurrency
                  ? getFluctuation(sourceCurrency.id, currency.id)
                  : null;
                return (
                  <tr key={currency.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ReactCountryFlag
                          countryCode={currency.countryCode}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginRight: "0.5em",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        />
                        <span className="text-base font-semibold mr-2">
                          {currency.codeISO}
                        </span>
                        <span className="text-gray-600">
                          {currency.nom_complet}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {sourceCurrency
                        ? getExchangeRate(sourceCurrency.id, currency.id) ?? "—"
                        : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {fluct === null ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span
                          className={
                            fluct >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {fluct >= 0 ? (
                            <span className="inline-block mr-1 align-middle">
                              ▲
                            </span>
                          ) : (
                            <span className="inline-block mr-1 align-middle">
                              ▼
                            </span>
                          )}
                          {Math.abs(fluct).toFixed(4)}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-red-600 hover:text-red-900 font-medium"
                        onClick={() => handleDeleteCurrency(currency.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Boutons d'action sous le tableau */}
        {sourceCurrency && (
          <div className="flex justify-between items-center mt-3">
            <div className="relative">
              <button
                className="group flex items-center text-blue-600 hover:text-blue-800 font-bold text-lg transition mb-2"
                onClick={() => setShowAddList((v) => !v)}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
                  <span className="text-xl">＋</span>
                </span>
                <span className="relative">Ajouter une devise à suivre</span>
              </button>

              {showAddList && (
                <div
                  ref={addListRef}
                  className="absolute top-full left-28 -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3"
                >
                  <input
                    type="text"
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Entrez une devise ou un pays"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCurrencies.length === 0 ? (
                      <div className="text-gray-400 text-center py-4">
                        Aucune devise trouvée
                      </div>
                    ) : (
                      filteredCurrencies.map((currency) => (
                        <div
                          key={currency.id}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleAddCurrency(currency)}
                        >
                          <ReactCountryFlag
                            countryCode={currency.countryCode}
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                              borderRadius: "50%",
                              overflow: "hidden",
                            }}
                          />
                          <span className="font-semibold">
                            {currency.codeISO}
                          </span>
                          <span className="text-gray-600">
                            {currency.nom_complet}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSourceCurrency(null);
                setTrackedCurrencies([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-gray-700 font-medium"
            >
              Annuler
            </button>
          </div>
        )}

        {/* Tableau des paires populaires prédéfinies */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Taux de change populaires
              </h2>
              <p className="text-gray-600">
                Les paires de devises les plus suivies sur le marché
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paire de devises
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux réel
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux de vente
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux d'achat
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière mise à jour
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {popularPairs.map((pair, idx) => {
                    const source = getCurrencyByCode(pair.source);
                    const target = getCurrencyByCode(pair.target);
                    const realRate =
                      source && target
                        ? getCurrentRate(source.id, target.id)
                        : null;
                    const marginRate =
                      source && target
                        ? getMarginRate(source.id, target.id)
                        : null;
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <ReactCountryFlag
                                countryCode={source?.countryCode}
                                svg
                                style={{
                                  width: "1.5em",
                                  height: "1.5em",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                }}
                                className="mr-2"
                              />
                              <span className="font-medium">
                                {source?.codeISO}
                              </span>
                            </div>
                            <span className="text-gray-400">/</span>
                            <div className="flex items-center">
                              <ReactCountryFlag
                                countryCode={target?.countryCode}
                                svg
                                style={{
                                  width: "1.5em",
                                  height: "1.5em",
                                  borderRadius: "100%",
                                  overflow: "hidden",
                                }}
                                className="mr-2"
                              />
                              <span className="font-medium">
                                {target?.codeISO}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-500">
                          {realRate ? realRate.taux : "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {marginRate ? marginRate.taux_vente : "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {marginRate ? marginRate.taux_achat : "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {realRate ? realRate.date_maj : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
