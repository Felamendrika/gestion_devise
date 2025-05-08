import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full top-0 left-0 z-50 bg-white shadow-sm fixed">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Xchange
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            <Link
              to="/converter"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/converter")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Convertisseur
            </Link>
            <Link
              to="/exchange-rates"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/exchange-rates")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Taux de Change
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
