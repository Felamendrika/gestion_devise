import React, { useContext, useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import CurrencyDropdown from "../common/CurrencyDropdown";

// importation contexte
import { AppContext } from "../../context/AppContext";

// Ajout des styles pour les fluctuations
const getFluctuationStyle = (fluct) => {
  if (fluct === null || isNaN(fluct)) return "text-gray-400";
  return fluct >= 0
    ? "text-green-600 bg-green-50 px-2 py-1 rounded-full"
    : "text-red-600 bg-red-50 px-2 py-1 rounded-full";
};

// Composant pour l'animation de chargement
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
);

const ExchangeRates = () => {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [trackedCurrencies, setTrackedCurrencies] = useState([]);
  const [showAddList, setShowAddList] = useState(false);
  const [search, setSearch] = useState("");

  const [fluctuations, setFluctuations] = useState({});
  const [realRates, setRealRates] = useState({});
  const [montants, setMontants] = useState({});

  const addListRef = useRef(null);

  const {
    devises,
    pairesPopulaires,
    fetchTauxReel,
    fetchTauxAvecMarge,
    fetchFluctuation,
  } = useContext(AppContext);

  // MAJ des donnees a suivre quand source ou tracked change
  useEffect(() => {
    const fetchData = async () => {
      if (!sourceCurrency || trackedCurrencies.length === 0) return;

      for (const currency of trackedCurrencies) {
        const key = `${sourceCurrency.code_iso}_${currency.code_iso}`;
        try {
          //recup les taux pour l'affichage et calcul du montant d'1 unite de devise source
          const [tauxReel, tauxMarge, fluct] = await Promise.all([
            fetchTauxReel(sourceCurrency.code_iso, currency.code_iso),
            fetchTauxAvecMarge(sourceCurrency.code_iso, currency.code_iso),
            fetchFluctuation(sourceCurrency.code_iso, currency.code_iso),
          ]);

          //MAj des etats avec les valeurs calculee
          setRealRates((prev) => ({
            ...prev,
            [key]: tauxReel?.taux_actuel ?? "—",
          }));

          setMontants((prev) => ({
            ...prev,
            [key]: tauxMarge ? (1 * tauxMarge.taux_vente).toFixed(4) : "—",
          }));

          setFluctuations((prev) => ({
            ...prev,
            [key]: isNaN(fluct) ? null : fluct,
          }));
        } catch (err) {
          console.error("Erreur de récupération de données pour", key, err);

          setRealRates((prev) => ({ ...prev, [key]: "—" }));
          setMontants((prev) => ({ ...prev, [key]: "—" }));
          setFluctuations((prev) => ({ ...prev, [key]: null }));
        }
      }
    };
    fetchData();
  }, [
    sourceCurrency,
    trackedCurrencies,
    fetchTauxReel,
    fetchTauxAvecMarge,
    fetchFluctuation,
  ]);

  // Ajouter une devise à suivre
  const handleAddCurrency = (currency) => {
    if (
      currency &&
      !trackedCurrencies.find((c) => c.code_iso === currency.code_iso) &&
      currency.code_iso !== sourceCurrency?.code_iso
    ) {
      setTrackedCurrencies([...trackedCurrencies, currency]);
      setShowAddList(false);
      setSearch("");
    }
  };

  // Suppression d'une devise suivie
  const handleDeleteCurrency = (codeIso) => {
    setTrackedCurrencies(
      trackedCurrencies.filter((c) => c.code_iso !== codeIso)
    );
  };

  // Liste des devises disponibles à ajouter (hors source et déjà suivies)
  const availableCurrencies = devises.filter(
    (c) =>
      c.code_iso !== sourceCurrency?.code_iso &&
      !trackedCurrencies.find((tc) => tc.code_iso === c.code_iso)
  );

  // Filtrage par recherche
  const filteredCurrencies = availableCurrencies.filter(
    (c) =>
      c.code_iso.toLowerCase().includes(search.toLowerCase()) ||
      c.nom_complet.toLowerCase().includes(search.toLowerCase())
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
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Taux de change réels
          </h1>
          <p className="text-lg text-gray-600">
            Suivez en temps réel l'évolution des taux de change de vos devises
            préférées.Vous pouvez choisir votre propre liste de paire de devises
            favories
          </p>
        </div>

        {/* Sélecteur de devise source */}
        <div className="mb-8 max-w-xs">
          <h2 className="inline-block text-xl font-semibold text-gray-900 mb-4">
            Sélectionnez votre devise de référence
          </h2>
          <CurrencyDropdown
            currencies={devises}
            value={sourceCurrency}
            onChange={setSourceCurrency}
            placeholder="Choisir une devise"
          />
        </div>

        {/* Tableau de suivi des taux */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
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
                  Taux réel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fluctuation (24h)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
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
                        countryCode={sourceCurrency.code_pays}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "0.5em",
                          borderRadius: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <span className="text-base font-semibold mr-2">
                        {sourceCurrency.code_iso}
                      </span>
                      <span className="text-gray-600">
                        {sourceCurrency.nom_complet}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      Sélectionnez une devise cible
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg">
                  {sourceCurrency ? 1 : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">—</td>
                <td className="px-6 py-4 whitespace-nowrap">—</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              {/* Lignes suivantes : devises suivies */}
              {trackedCurrencies.map((currency) => {
                const key = `${sourceCurrency.code_iso}_${currency.code_iso}`;
                const taux = realRates[key];
                const montant = montants[key];
                const fluct = fluctuations[key];

                return (
                  <tr
                    key={currency.code_iso}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ReactCountryFlag
                          countryCode={currency.code_pays}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginRight: "0.5em",
                            borderRadius: "50%",
                          }}
                        />
                        <span className="text-base font-semibold mr-2">
                          {currency.code_iso}
                        </span>
                        <span className="text-gray-600">
                          {currency.nom_complet}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {montant ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {taux ?? "—"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {fluct === null || isNaN(fluct) ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span
                          className={`inline-flex items-center ${getFluctuationStyle(
                            fluct
                          )}`}
                        >
                          {fluct >= 0 ? (
                            <span className="mr-1">▲</span>
                          ) : (
                            <span className="mr-1">▼</span>
                          )}
                          {Math.abs(fluct).toFixed(4)}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteCurrency(currency.code_iso)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-1 rounded-full transition-colors duration-200"
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
                className="group flex items-center text-blue-600 hover:cursor-pointer hover:text-blue-800 font-bold text-lg transition mb-2"
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
                          key={currency.code_iso}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleAddCurrency(currency)}
                        >
                          <ReactCountryFlag
                            countryCode={currency.code_pays}
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <span className="font-semibold">
                            {currency.code_iso}
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
              className="px-4 py-2 border-2 border-gray-400 rounded-lg bg-transparent hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-gray-700 font-medium"
            >
              Annuler
            </button>
          </div>
        )}

        {/* Tableau des paires populaires prédéfinies */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-700 mb-2">
                Taux de change populaires
              </h2>
              <p className="text-gray-600">
                Le taux de change d'une devise est le cours de cette devise par
                rapport à une autre, appelé également parité d'une monnaie.
                Retrouvez ici les taux de change des paires de devises les plus
                suivies sur le marché
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
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
                  {pairesPopulaires.map((pair, idx) => {
                    // afaka asina appel fonction fetchDeviseByCode
                    /*const source = getCurrencyByCode(pair.source);
                    const target = getCurrencyByCode(pair.target); */

                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold">{pair.source}</span>
                          <span className="mx-2 text-gray-400">/</span>
                          <span className="font-semibold">{pair.cible}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-500">
                          {pair.taux_reel ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {pair.taux_vente ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {pair.taux_achat ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {pair.date_maj
                            ? new Date(pair.date_maj)
                                .toLocaleDateString("fr-FR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  // hour: "2-digit",
                                  // minute: "2-digit",
                                })
                                .replace(/\//g, "-")
                            : "—"}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {pair.date_maj
                            ? new Date(pair.date_maj).toLocaleDateString()
                            : "—"}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Section information sur les taux de change */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-500 mb-2 tracking-tight">
            Informations sur les taux de change
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* !ere info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-10 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Méfiez-vous des mauvais taux de change
              </h3>
              <p className="text-gray-600 mb-2">
                Les banques et les prestataires traditionnels ont souvent des
                coûts supplémentaires qu'ils cachent dans le taux qui vous est
                proposé. Notre technologie intelligente signifie que nous sommes
                plus efficaces et que vous obtenez un excellent taux. À chaque
                fois.
              </p>
            </div>

            {/* 2eme info */}
            <div className="bg-blue-50 rounded-2xl shadow-xl p-6 mt-10 flex flex-col items-center hover:shadow-2xl hover:cursor-default transition duration-300">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Convention et fiabilite sur les taux de change
              </h3>
              <p className="text-gray-600 ">
                Tous les chiffres sont des taux moyens du marché, qui ne sont
                pas disponibles pour les consommateurs et sont fournis à titre
                informatif uniquement.
              </p>
            </div>

            {/* 3eme info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-10 flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Variation du marché des taux de change
              </h3>
              <p className="text-gray-600">
                Les taux de change, cotés sur le marché des devises appelé
                "Forex", varient en permanence en fonction des échanges et de la
                place de cotation. Le taux de change est déterminé par l'offre
                et la demande de chacune des deux monnaies : si la demande de la
                première monnaie dépasse l'offre, son cours augmente par rapport
                à la seconde monnaie
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
