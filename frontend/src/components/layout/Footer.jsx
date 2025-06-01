import React from "react";
import {
  FaChartLine,
  FaEnvelope,
  FaExchangeAlt,
  FaFacebook,
  FaInfoCircle,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Séparateur visuel du footer */}
      {/* <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-blue-100 to-blue-400"></div> */}

      <footer className="bg-gradient-to-b from-blue-50 to-white text-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Xchange
            </Link>
            <div className="flex space-x-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-500 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Liens Rapides
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/exchange-rates"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Taux de Change
                  </Link>
                </li>
                <li>
                  <Link
                    to="/converter"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Convertisseur
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2 text-blue-600" />{" "}
                  contact@xchange.com
                </li>
                <li className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-blue-600" /> +123 456 7890
                </li>
                <li className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" /> 123 Rue de
                  la Devise, Ville
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Services Bancaires
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <FaChartLine className="mr-2 text-blue-600" />
                  <span>Suivi des taux en temps réel</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <FaExchangeAlt className="mr-2 text-blue-600" />
                  <span>Conversion de devises instantanée</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <FaInfoCircle className="mr-2 text-blue-600" />
                  <span>Informations sur les marchés financiers</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-600 pt-8 border-t border-gray-200">
            <p>
              &copy; {new Date().getFullYear()} Xchange. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
