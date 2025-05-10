import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import currencies from "../../mocks/currencies";
import ratesWithMargin from "../../mocks/ratesWithMargin";
// import rates from "../../mocks/rates";

import CurrencyDropdown from "../common/CurrencyDropdown";
import PopularConversionsTable from "../common/PopularConversionsTable";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [rate, setRate] = useState(null);
  const [inverseRate, setInverseRate] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isFirstConversion, setIsFirstConversion] = useState(true);

  const navigate = useNavigate();

  // solona codeISO ny id sourceCurrency et targetCurrency
  const performConversion = useCallback(() => {
    if (
      amount > 0 &&
      sourceCurrency &&
      targetCurrency &&
      sourceCurrency.id !== targetCurrency.id
    ) {
      const taux = ratesWithMargin.find(
        (r) =>
          r.devise_source_id === sourceCurrency.id &&
          r.devise_cible_id === targetCurrency.id
      );

      if (taux) {
        setRate(taux.taux_vente);
        setInverseRate(1 / taux.taux_vente);
        setConvertedAmount((amount * taux.taux_vente).toFixed(4));
      } else {
        setRate(null);
        setInverseRate(null);
        setConvertedAmount("Taux de change non disponible");
      }
    } else {
      setConvertedAmount(null);
      setRate(null);
      setInverseRate(null);
    }
  }, [amount, sourceCurrency, targetCurrency]);

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

  const handleConversion = () => {
    setIsConverting(true);
    setTimeout(() => {
      performConversion();
      setIsConverting(false);
      setIsFirstConversion(false); // Marquer que la première conversion est faite
    }, 900);
  };

  // Réinitialiser isFirstConversion quand on change de devise
  const handleSwapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
    setIsFirstConversion(true);
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
    sourceCurrency.id === targetCurrency.id;

  const popularValues = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full pt-16">
      <div className="text-center max-3xl px-12 py-12 sm:py-20 mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Convertisseur de Devises
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 mb-8">
        {convertedAmount && (
          <h2 className="text-xl mb-6 font-bold text-gray-500 text-center">
            {amount} {sourceCurrency?.codeISO} en {targetCurrency?.codeISO} -
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
              className="w-full h-12 p-2 border rounded-md focus:ring-2 focus:ring-blue-100 focus:border-blue-100 focus:outline-none outline-none"
              placeholder="Entrez le montant"
              min={0}
            />
          </div>

          <div className="md:col-span-2">
            <CurrencyDropdown
              currencies={currencies}
              value={sourceCurrency}
              onChange={setSourceCurrency}
              label="Devise source"
              placeholder="Sélectionnez une devise"
            />
          </div>

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

          <div className="md:col-span-2">
            <CurrencyDropdown
              currencies={currencies}
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

        {convertedAmount && (
          <div className="mt-4 text-left">
            <div className="text-2xl font-bold text-gray-600">
              {amount} {sourceCurrency?.codeISO} = {convertedAmount}{" "}
              {targetCurrency?.codeISO}
            </div>
            {rate && (
              <div className="text-gray-600 mt-2">
                1 {sourceCurrency?.codeISO} = {rate} {targetCurrency?.codeISO}
                <br />1 {targetCurrency?.codeISO} ={" "}
                {inverseRate && inverseRate.toFixed(4)}{" "}
                {sourceCurrency?.codeISO}
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

      {convertedAmount && rate && sourceCurrency && targetCurrency && (
        <div className="max-w-6xl mx-auto mt-12 mb-8 flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-center text-gray-600 mb-2">
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
            <h3 className="text-lg font-bold text-center text-gray-600 mb-2">
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
