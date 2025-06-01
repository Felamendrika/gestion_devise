import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CurrencyDropdown from "../common/CurrencyDropdown";
import PopularConversionsTable from "../common/PopularConversionsTable";
import AvailableCurrenciesSection from "../common/AvailableCurrenciesSection";

// importation contexte
import { AppContext } from "../../context/AppContext";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [rate, setRate] = useState(null);
  // const [inverseRate, setInverseRate] = useState(null);
  const [uniteSource, setUniteSource] = useState("");
  const [uniteCible, setUniteCible] = useState("");

  const [isConverting, setIsConverting] = useState(false);
  const [isFirstConversion, setIsFirstConversion] = useState(true);
  const [error, setError] = useState(null); // gestion des erreurs

  const [sameCurrencyError, setSameCurrencyError] = useState(false);

  const navigate = useNavigate();

  // utilisation contexte
  const { devises, conversionDevise } = useContext(AppContext);

  // conversion principale appelee manuellement au auto
  const performConversion = useCallback(async () => {
    if (
      amount > 0 &&
      sourceCurrency &&
      targetCurrency &&
      sourceCurrency.code_iso !== targetCurrency.code_iso
    ) {
      try {
        setError(null); // nettoyage des erreurs precedent
        const result = await conversionDevise({
          montant: amount,
          source: sourceCurrency.code_iso,
          cible: targetCurrency.code_iso,
        });

        if (result) {
          setRate(parseFloat(result.taux_vente));
          // setInverseRate(1 / parseFloat(result.taux_vente));
          setConvertedAmount(parseFloat(result.resultat).toFixed(4));
          setUniteSource(result.unite_source);
          setUniteCible(result.unite_cible);
        } else {
          setRate(null);
          // setInverseRate(null);
          setConvertedAmount("Taux de change non disponible");
          throw new Error("Taux de conversion indisponible");
        }
      } catch (err) {
        console.error("Erreur conversion :", err);
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("La conversion a échoué. Veuillez réessayer plus tard.");
        }

        setConvertedAmount(null);
        setRate(null);
        // setInverseRate(null);
        setUniteSource("");
        setUniteCible("");
      }
    } else {
      setConvertedAmount(null);
      setRate(null);
      // setInverseRate(null);
      setUniteSource("");
      setUniteCible("");
    }
  }, [amount, sourceCurrency, targetCurrency, conversionDevise]);

  // Effet pour la conversion automatique (uniquement après la première conversion)
  useEffect(() => {
    if (!isFirstConversion && amount && sourceCurrency && targetCurrency) {
      setIsConverting(true);
      const timer = setTimeout(() => {
        performConversion();
        setIsConverting(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    amount,
    sourceCurrency,
    targetCurrency,
    performConversion,
    isFirstConversion,
  ]);

  // Mettre à jour l'état d'erreur quand les devises changent
  useEffect(() => {
    if (sourceCurrency && targetCurrency) {
      setSameCurrencyError(sourceCurrency.code_iso === targetCurrency.code_iso);
    } else {
      setSameCurrencyError(false);
    }
  }, [sourceCurrency, targetCurrency]);

  //conversion manuelle
  const handleConversion = () => {
    setIsConverting(true);
    setTimeout(() => {
      performConversion();
      setIsConverting(false);
      setIsFirstConversion(false); // Marquer que la première conversion est faite
    }, 900);
  };

  // inverser kes devises
  const handleSwapCurrencies = async () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);

    // reinitialiser les etat
    setConvertedAmount(null);
    setRate(null);
    // setInverseRate(null);
    setUniteCible("");
    setUniteSource("");
    setError(null);
    setIsFirstConversion(false);
    // relancer la conversion auto si il y a des chnagement
    setTimeout(() => {
      if (
        amount > 0 &&
        targetCurrency &&
        sourceCurrency &&
        targetCurrency.code_iso !== sourceCurrency.code_iso
      ) {
        performConversion();
        setIsFirstConversion(false);
      }
    }, 100);
    // relancer la cinversion si montant deja saisi
    if (amount > 0) {
      try {
        const result = await conversionDevise({
          montant: amount,
          source: sourceCurrency.code_iso,
          cible: targetCurrency.code_iso,
        });
        if (result) {
          setRate(parseFloat(result.taux_vente));
          setConvertedAmount(parseFloat(result.resultat).toFixed(4));
          setUniteSource(result.unite_source);
          setUniteCible(result.unite_cible);
        }
      } catch (error) {
        setError("Erreur lors de la conversion inverse");
        console.error("Erreur lors de l'inversion ", error);
      }
    }
  };

  // suivre les taux de change
  const handleTrackRates = () => {
    navigate("/exchange-rates");
  };

  const isDisabled =
    !amount ||
    isNaN(amount) ||
    Number(amount) <= 0 ||
    !sourceCurrency ||
    !targetCurrency ||
    sourceCurrency.code_iso === targetCurrency.code_iso;

  const popularValues = [
    1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000, 50000,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full pt-12">
      <div className="text-center max-3xl px-12 py-12 sm:py-20 mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Convertisseur de Devises
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 mb-8">
        {convertedAmount && (
          <h2 className="text-xl mb-6 font-bold text-gray-500 text-center">
            {amount} {sourceCurrency?.code_iso} en {targetCurrency?.code_iso} -
            Conversion de {sourceCurrency?.nom_complet} vers {}
            {targetCurrency?.nom_complet}
          </h2>
        )}
        {/* teto md:grid-col-3 */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full h-12 p-2 border rounded-md focus:ring-2 focus:ring-blue-100 focus:border-blue-100 focus:outline-none outline-none ${
                amount && (isNaN(amount) || Number(amount) <= 0)
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              placeholder="Entrez le montant"
              min={0}
            />
          </div>

          {/* Devise source */}
          <div className="md:col-span-2">
            <CurrencyDropdown
              currencies={devises}
              value={sourceCurrency}
              onChange={setSourceCurrency}
              label="Devise source"
              placeholder="Sélectionnez une devise"
            />
          </div>

          {/* Inversion */}
          <div className="flex items-center justify-center md:col-span-1">
            <button
              onClick={handleSwapCurrencies}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300"
              disabled={!sourceCurrency || !targetCurrency}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          {/* Devise cible */}
          <div className="md:col-span-2">
            <CurrencyDropdown
              currencies={devises}
              value={targetCurrency}
              onChange={setTargetCurrency}
              label="Devise cible"
              placeholder="Sélectionnez une devise"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <button
            onClick={handleConversion}
            className={`w-[25%] bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center font-semibold ${
              isDisabled ? "opacity-50" : "hover:bg-blue-700 hover:shadow-lg"
            }`}
            disabled={isDisabled || isConverting}
          >
            {isConverting ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : null}
            {isConverting ? "Conversion..." : "Convertir"}
          </button>

          <button
            onClick={handleTrackRates}
            className=" text-blue-600 hover:text-blue-800 font-medium"
            // className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold w-full md:w-auto"
          >
            Suivre les taux de change →
          </button>
        </div>

        {/* Message d'erreur pour les devises identiques */}
        {sameCurrencyError && (
          <div className="mt-4 text-red-500 font-medium text-center flex items-center justify-center">
            <FaExclamationTriangle className="mr-2" />
            <span>
              Veuillez sélectionner deux devises différentes pour effectuer une
              conversion
            </span>
          </div>
        )}

        {/* Message d'erreur si API echoue */}
        {error && (
          <div className="mt-4 text-red-500 font-medium text-center">
            {error}
          </div>
        )}

        {/* Resulatat conversion */}
        {convertedAmount && (
          <div className="mt-4 text-left">
            <div className="text-2xl font-bold text-gray-600">
              {amount} {sourceCurrency?.code_iso} = {convertedAmount}{" "}
              {targetCurrency?.code_iso}
            </div>
            {(uniteSource || uniteCible) && (
              <div className="text-gray-600 mt-2">
                {uniteSource && <div>{uniteSource}</div>}
                {uniteCible && <div>{uniteCible}</div>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div className="text-center max-w-4xl m-auto">
        <p className="text-sm text-gray-600 mb-8">
          Les taux de change utilisés dans les conversions sont basés sur les
          taux moyenne du marché mis a jour a 23h59.
        </p>
      </div> */}

      <div className="text-center max-w-4xl mx-auto mt-4">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-gray-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            Les taux de change utilisés dans les conversions sont basés sur les
            taux moyens du marché mis à jour à 23h59.
          </p>
        </div>
      </div>

      {/* TABLEAUX DE CONVERSION POPULAIRE */}
      {convertedAmount && rate && sourceCurrency && targetCurrency && (
        <div className="max-w-6xl mx-auto mt-12 mb-8 flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-center text-gray-500 mb-4">
              {`Conversions populaires de ${sourceCurrency.nom_complet} vers ${targetCurrency.nom_complet}`}
            </h3>
            <PopularConversionsTable
              from={sourceCurrency}
              to={targetCurrency}
              rate={rate}
              values={popularValues}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-center text-gray-500 mb-4">
              {`Conversions populaires de ${targetCurrency.nom_complet} vers ${sourceCurrency.nom_complet}`}
            </h3>
            <PopularConversionsTable
              from={targetCurrency}
              to={sourceCurrency}
              rate={rate}
              values={popularValues}
              isReverse={true}
            />
          </div>
        </div>
      )}

      {/* Section pour la liste de devises disponibles */}
      <div className="w-full bg-white py-16 mt-8">
        <AvailableCurrenciesSection currencies={devises} />
      </div>
    </div>
  );
};

export default CurrencyConverter;
/*
        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <button
            onClick={handleConversion}
            className={`bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 flex items-center justify-center font-semibold w-full md:w-auto ${
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : " hover:bg-blue-800 hover:shadow-2xl transition duration-300"
            }`}
            disabled={isDisabled || isConverting}
          >
            {isConverting ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : null}
            {isConverting ? "Conversion..." : "Convertir"}
          </button>

          <button
            onClick={handleTrackRates}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold w-full md:w-auto"
          >
            Suivre les taux de change
          </button>
        </div>
        */
