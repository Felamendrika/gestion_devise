import React from "react";
import { Link } from "react-router-dom";

import currency from "../../assets/Currency.png";

const LandingPage = () => {
  return (
    // Conteneur principal sans limite de largeur
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
      {/* Section héro modernisée */}
      {/* <div className="relative w-full h-screen"> */}
      <div className="relative w-full min-h-[80vh] flex items-center">
        {/* Contenu principal */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Colonne de texte */}
            <div className="max-w-2xl">
              <h1>
                <span className="block text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                  <span className="block text-gray-900 mb-2">
                    Convertissez vos devises
                  </span>
                  <span className="block text-blue-600">
                    en toute simplicité
                  </span>
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 leading-relaxed">
                Consultez l'ensemble des informations, des outils et des
                actualités sur les devises : Taux de change en temps réel,
                conversions instantanées et suivi des fluctuations pour une
                gestion optimale de vos opérations de change.
              </p>
              <div className="mt-10">
                <Link
                  to="/converter"
                  className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
                >
                  Commencer maintenant
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Colonne d'illustration */}
            <div className="hidden lg:flex lg:items-center lg:justify-end">
              <img
                src={currency}
                alt="Banking illustration"
                className="w-full max-w-3xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section des fonctionnalités */}
      <div className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
          {/* Fonctionnalité 1 */}
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Taux en temps réel</h3>
            <p className="text-gray-600">
              Accédez aux taux de change les plus récents et les plus précis
            </p>
          </div>

          {/* Fonctionnalité 2 */}
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Suivi des fluctuations
            </h3>
            <p className="text-gray-600">
              Visualisez l'évolution des taux sur différentes périodes
            </p>
          </div>

          {/* Fonctionnalité 3 */}
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Conversions instantanées
            </h3>
            <p className="text-gray-600">
              Obtenez vos résultats de conversion en quelques secondes
            </p>
          </div>
        </div>
      </div>

      {/* Section d'information : Comment convertir des devises étrangères */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-500 mb-4 tracking-tight">
            COMMENT CONVERTIR DES DEVISES ÉTRANGÈRES
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12">
            Suivez ces trois étapes simples pour obtenir instantanément le taux
            de change le plus précis et convertir vos devises en toute
            confiance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl hover:cursor-default transition duration-300">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Saisissez le montant
              </h3>
              <p className="text-gray-600 text-center">
                Indiquez simplement le montant que vous souhaitez convertir dans
                le champ prévu à cet effet.
              </p>
            </div>
            {/* Étape 2 */}
            <div className="bg-blue-50 rounded-3xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl hover:cursor-default transition duration-300">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Choisissez vos devises
              </h3>
              <p className="text-gray-600 text-center">
                Sélectionnez la devise source et la devise cible dans les listes
                déroulantes pour lancer la conversion.
              </p>
            </div>
            {/* Étape 3 */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl hover:cursor-pointer transition duration-300">
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                C'est tout
              </h3>
              <p className="text-gray-600 text-center">
                Obtenez instantanément le taux de change actuel et l'évolution
                récente pour prendre la meilleure décision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section CTA Call To Action*/}
      <div className="w-full bg-blue-500 py-12">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Commencez à convertir vos devises dès maintenant
          </h2>
          <Link
            to="/converter"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Accéder au convertisseur
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

/*
<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
      {/* Section héro 
      <div className="w-full px-4 py-12 sm:py-20">
        <div className="text-center max-w-4xl m-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Convertissez vos devises en toute simplicité
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Taux de change en temps réel, conversions instantanées et suivi des
            fluctuations
          </p>
        </div>
        </div>
*/
